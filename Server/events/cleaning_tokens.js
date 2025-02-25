const cron = require("node-cron");
const { Op } = require("sequelize"); // Import Sequelize operators
const { Refresh_tokens } = require("../models/init");

const cleaning_tokens = async () => {
    try {
        const now = new Date(); // Get the current timestamp

        // Delete expired tokens using Sequelize's Op.lt operator
        const deletedCount = await Refresh_tokens.destroy({
            where: {
                expires_at: { [Op.lt]: now }, // Fix the operator usage
            },
        });

        console.log(
            `Token cleanup completed. Deleted ${deletedCount} expired tokens at:`,
            new Date().toISOString()
        );
    } catch (error) {
        console.error("Error during token cleanup:", error);
    }
};

// Schedule the task to run every minute for testing
const startTokenCleanup = () => {
    console.log("Starting token cleanup job...");
    cron.schedule("*/10 * * * * *", cleaning_tokens); // ✅ Runs every 10 seconds
};

module.exports = startTokenCleanup;
