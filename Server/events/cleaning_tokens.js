const cron = require("node-cron");
const { Refresh_tokens } = require("../models/init");
const jwt = require("jsonwebtoken");

const cleaning_tokens = async () => {
    try {
        const refresh_tokens = await Refresh_tokens.findAll();
        const now = Date.now();
        refresh_tokens.forEach(async (token) => {
            if (token.expires_at < now) {
                // Ensure `expires_at` is the correct field
                await Refresh_tokens.destroy({
                    where: {
                        token: token.token,
                    },
                });
            }
        });
        console.log("Token cleanup completed at:", new Date().toISOString());
    } catch (error) {
        console.error("Error during token cleanup:", error);
    }
};

// Schedule the task to run every hour
cron.schedule("0 * * * *", cleaning_tokens); // Runs at the start of every hour

module.exports = { cleaning_tokens };
