const { File, Folder } = require("../../models/init");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const GetFiles = async (req, res) => {
    try {
        // Fetch all files from DB
        const all_files = await File.findAll(); // 🔥 Fix: `await` added

        // Filter only files that exist on the server
        const only_existing_files = all_files.filter((file) =>
            fs.existsSync(path.join(__dirname, "Files", file.fileName))
        );

        // Fetch folders with their document-type files
        const folders = await Folder.findAll({
            include: [
                {
                    model: File,
                    required: false,
                },
            ],
        });

        // Fetch standalone files (files without a folder) that also exist
        const standaloneFiles = only_existing_files.filter(
            (file) => file.FolderId === null
        );

        return res.status(200).json({ folders, standaloneFiles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const get_file = async (req, res) => {
    try {
        const { fileName } = req.params;

        // Validate the fileName to prevent directory traversal attacks
        if (fileName.includes("..") || fileName.includes("/")) {
            return res.status(400).json({ message: "Invalid file name" });
        }

        // Construct the file path
        const filePath = path.join(__dirname, "Files", fileName); // Adjust the path as needed

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        // Get the file's MIME type dynamically
        const mimeType =
            {
                ".pdf": "application/pdf",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".txt": "text/plain",
            }[path.extname(fileName).toLowerCase()] ||
            "application/octet-stream";

        // Set the appropriate headers
        res.setHeader("Content-Type", mimeType);
        res.setHeader("Content-Disposition", `inline; filename="${fileName}"`); // Use "inline" to display in the browser

        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        // Handle stream errors
        fileStream.on("error", (err) => {
            console.error("Error streaming file:", err);
            res.status(500).json({ message: "Error streaming file" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = {
    GetFiles,
    get_file,
};
