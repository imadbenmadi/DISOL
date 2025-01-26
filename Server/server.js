const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const initializeMiddleware = require("./middleware/init");
const appRoutes = require("./routes/App.routes");
const { initializeDirectories } = require("./helpers/Directory.helper");
const { Sequelize } = require("sequelize"); // Import Sequelize class
const sequelize = require("./database/Mysql.database"); // Import the sequelize instance for DISOL database

dotenv.config();

if (!sequelize) {
    console.error("Sequelize is undefined. Check your Mysql.database.js file.");
    process.exit(1); // Exit the process if sequelize is undefined
}

// Function to create the database and reconnect
const initializeDatabase = async () => {
    try {
        // Create a new Sequelize instance for the initial connection (without specifying a database)
        const tempSequelize = new Sequelize({
            username: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "root",
            host: process.env.DB_HOST || "localhost",
            dialect: "mysql",
            logging: false,
        });

        // Create the database if it doesn't exist
        await tempSequelize.query("CREATE DATABASE IF NOT EXISTS DISOL", {
            raw: true,
        });
        console.log("Database created successfully");

        // Close the temporary connection
        await tempSequelize.close();

        // Synchronize the database models using the original sequelize instance (connected to DISOL)
        await sequelize
            .sync({ force: false })
            .then(() => {
                console.log("Database synchronized");
            })
            .catch((error) => {
                console.error("Failed to synchronize database:", error);
            });
    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
};

// Initialize the database
initializeDatabase();

// Initialize directories and middleware
initializeDirectories();
initializeMiddleware(app);

// Serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Use application routes
app.use(appRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Hello from DISOL");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
