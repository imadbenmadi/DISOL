require("dotenv").config();
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:5173" // Your React app redirect URL
);

// Load tokens (for development, manually set this)
oAuth2Client.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN, // You need to generate this
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oAuth2Client });

module.exports = drive;
