const sequelize = require("./Mysql.database");
const { Sequelize } = require("sequelize");

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
        if (process.env.NODE_ENV === "development") {
            // Create the database if it doesn't exist
            await tempSequelize.query("CREATE DATABASE IF NOT EXISTS DISOL", {
                raw: true,
            });
            console.log("Database created successfully");

            // Close the temporary connection
            await tempSequelize.close();
        }
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
module.exports = initializeDatabase;
