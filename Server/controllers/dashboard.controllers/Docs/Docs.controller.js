const { File, Folder } = require("../../../models/init");
const { Op } = require("sequelize");
const drive = require("../../../middleware/googleAuth");
const formidable = require("formidable");

const GetDocs = async (req, res) => {
    try {
        const response = await drive.files.list({
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
const AddDoc = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err)
                return res.status(400).json({ message: "File upload error" });

            const { fileType, fileSize } = fields;
            const file = files.file;

            if (!file)
                return res.status(400).json({ message: "No file uploaded" });

            // Upload to Google Drive
            const response = await drive.files.create({
                requestBody: {
                    name: file.originalFilename,
                    mimeType: file.mimetype,
                },
                media: {
                    mimeType: file.mimetype,
                    body: fs.createReadStream(file.filepath),
                },
            });

            const fileId = response.data.id;

            // Make file publicly accessible
            await drive.permissions.create({
                fileId,
                requestBody: { role: "reader", type: "anyone" },
            });

            const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

            return res.status(200).json({ fileUrl, fileType, fileSize });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const DeleteDoc = async (req, res) => {
    try {
        const { fileId } = req.params;

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
