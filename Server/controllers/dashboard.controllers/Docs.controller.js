const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// Load Service Account JSON
const serviceAuth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../../Google_Services/Service_google.json"), // Replace with your JSON key file
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth: serviceAuth });

// Folder ID where files will be uploaded
const FOLDER_ID = "1euwDiYqfHIW-cbUvlorDDSmZRFFYYNUf"; // Replace with the shared folder ID

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
        return res.status(500).json({ message: "Error fetching files" });
    }
};

// Upload a File
const AddDoc = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err)
                return res.status(400).json({ message: "File upload error" });

            const file = files.file;
            if (!file)
                return res.status(400).json({ message: "No file uploaded" });

            const fileStream = fs.createReadStream(file.filepath);
            const fileMetadata = {
                name: file.newFilename || "uploaded_file",
                mimeType: file.mimetype || "application/octet-stream",
                parents: [FOLDER_ID],
            };

            // Upload to Google Drive
            const response = await drive.files.create({
                requestBody: fileMetadata,
                media: { mimeType: fileMetadata.mimeType, body: fileStream },
            });

            const fileId = response.data.id;

            // Make file publicly accessible
            await drive.permissions.create({
                fileId,
                requestBody: { role: "reader", type: "anyone" },
            });

            const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

            return res.status(200).json({ fileUrl });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const DeleteDoc = async (req, res) => {
    try {
        const fileId = req.params.fileId; // Correctly extract fileId
        console.log(fileId);
        if (!fileId)
            return res.status(400).json({ message: "File ID not provided" });
        await drive.files.delete({ fileId });

        return res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting file" });
    }
};

module.exports = {
    GetDocs,
    AddDoc,
    DeleteDoc,
};
