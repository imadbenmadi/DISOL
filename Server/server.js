const express = require("express");
const app = express();
const path = require("path");
const initialize_Middleware = require("./middleware/init");
const appRoutes = require("./routes/App.routes");
const { initializeDirectories } = require("./helpers/Directory.helper");
const initializeDatabase = require("./database/init"); // Import the sequelize instance for DISOL database
const dotenv = require("dotenv");
dotenv.config();
const { createTablesIfNotExist } = require("./database/createTablesIfNotExist");
const { init_models } = require("./models/init");
const TokenCleanup = require("./events/cleaning_tokens");
// Initialize the database
initializeDatabase();
// createTablesIfNotExist();

// Cleaning Event
TokenCleanup();
// Initialize directories and middleware
initializeDirectories();
initialize_Middleware(app);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// app.get("/files/:id", (req, res) => {
//     const file_path = req.params.id;
//     const filePath = path.join(__dirname, "Files", file_path); // Adjust the folder
//     const filePath = path.join(__dirname, file_path); // Adjust the folder
//     res.sendFile(filePath, (err) => {
//         if (err) {
//             res.status(404).send("File not found");
//         }
//     });
// });
// Use application routes
app.use(appRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
