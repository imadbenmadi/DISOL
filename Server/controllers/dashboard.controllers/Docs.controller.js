const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const errorLogger = require("../../utils/ErrorLogger");
dotenv.config();
// Load Service Account JSON
const serviceAuth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../../Google_Services/Google_drive.json"), // Replace with your JSON key file
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth: serviceAuth });

// Folder ID where files will be uploaded
const FOLDER_ID = process.env.DRIVE_FOLDER_ID; // Replace with the shared folder ID

// Get List of Files
const GetDocs = async (req, res) => {
    try {
        const response = await drive.files.list({
            q: `'${FOLDER_ID}' in parents`, // Get only files from the shared folder
            fields: "files(id, name, mimeType, webViewLink, webContentLink)",
        });

        const files = response.data.files.map((file) => ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            webViewLink: file.webViewLink,
            webContentLink:
                file.webContentLink ||
                `https://drive.google.com/uc?id=${file.id}`,
        }));

        return res.status(200).json({ files });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("GET_DOCS_ERROR", error);
        return res.status(500).json({ message: "Error fetching files" });
    }
};

module.exports = {
    GetDocs,
};
