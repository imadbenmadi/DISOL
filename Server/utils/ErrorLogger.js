const fs = require("fs");
const path = require("path");

const errorLogger = {
    logDir: path.join(__dirname, "../logs"), // Logs directory
    logFile: "error_log.log", // Error log file name

    // Initialize the logger
    init() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true }); // Create directory if it doesn't exist
        }
    },

    // Log error details to the error log file
    logError(errorType, errorDetails) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [ERROR] [${errorType}] ${errorDetails}\n`;

        fs.appendFile(path.join(this.logDir, this.logFile), logEntry, (err) => {
            if (err) {
                console.error("Failed to write to error log file:", err);
            }
        });
    },

    // Enhanced error logging for detailed information
    logDetailedError(errorType, error) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [ERROR] [${errorType}] ${error.message}\nStack Trace: ${error.stack}\n`;

        fs.appendFile(path.join(this.logDir, this.logFile), logEntry, (err) => {
            if (err) {
                console.error("Failed to write to error log file:", err);
            }
        });

        // Optionally, you can also log the error to the console for immediate visibility
        console.error(
            `[ERROR] [${errorType}] ${error.message}\nStack Trace: ${error.stack}`
        );
    },
};

module.exports = errorLogger;
