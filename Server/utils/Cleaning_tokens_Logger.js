const fs = require("fs");
const path = require("path");

const logger = {
    logDir: path.join(__dirname, "../logs"),
    logFile: path.join(__dirname, "../logs/token_cleanup.log"),

    // Initialize the logger
    init() {
        try {
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
            }
        } catch (err) {
            console.error(
                "[LOGGER ERROR] Failed to create log directory:",
                err
            );
        }
    },

    // Log info level messages
    info(message) {
        this.writeLog("INFO", message);
    },

    // Log error level messages
    error(message, error = null) {
        const errorMsg = error
            ? `${message}: ${error.message}\n${error.stack}`
            : message;
        this.writeLog("ERROR", errorMsg);
    },

    // Write to log file safely
    writeLog(level, message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${level}] ${message}\n`;

        // Use append mode to avoid overwriting logs
        fs.appendFile(this.logFile, logEntry, (err) => {
            if (err) console.error("[LOGGER ERROR] Failed to write log:", err);
        });
    },
};

module.exports = logger;
