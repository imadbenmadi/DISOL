const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const initialize_Middleware = require("./middleware/init");
const appRoutes = require("./routes/App.routes");
const { initializeDirectories } = require("./helpers/Directory.helper");
const initializeDatabase = require("./database/init"); // Import the sequelize instance for DISOL database

dotenv.config();


// Initialize the database
initializeDatabase();

// Initialize directories and middleware
initializeDirectories();
initialize_Middleware(app);

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
