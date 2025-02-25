const cron = require("node-cron");
const { Op } = require("sequelize");
const { Refresh_tokens } = require("../models/init");
const logger = require("../utils/Cleaning_tokens_Logger");

const cleaning_tokens = async () => {
    try {
        logger.info("Starting token cleanup process...");
        const now = new Date();

        // Get count before deletion for reporting
        const expiredCount = await Refresh_tokens.count({
            where: { expires_at: { [Op.lt]: now } },
        });

        // Delete expired tokens
        const deletedCount = await Refresh_tokens.destroy({
            where: { expires_at: { [Op.lt]: now } },
        });

        logger.info(
            `Token cleanup completed. Found ${expiredCount} expired tokens, deleted ${deletedCount}`
        );

        if (expiredCount !== deletedCount) {
            logger.error(
                `Token deletion discrepancy: Found ${expiredCount}, but deleted only ${deletedCount}`
            );
        }
    } catch (error) {
        logger.error("Error during token cleanup", error);
    }
};

// ✅ Schedule the task to run every 10 seconds (for testing)
const startTokenCleanup = () => {
    logger.init(); // ✅ Ensure the logger is ready
    logger.info("Token cleanup job initialized.");

    cron.schedule("*/10 * * * * *", async () => {
        logger.info("Running scheduled token cleanup job...");
        await cleaning_tokens();
    });

    logger.info("Token cleanup job scheduled to run every 10 seconds.");
};

module.exports = startTokenCleanup;
