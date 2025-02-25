const { File, Folder } = require("../../models/init");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const errorLogger = require("../../utils/ErrorLogger");

const GetFiles = async (req, res) => {
    try {
        // Fetch all files from DB
        const all_files = await File.findAll();

        // Filter only files that exist on the server
        const only_existing_files = all_files.filter((file) => {
            if (
                fs.existsSync(
                    path.join(__dirname, "../../Files", file.fileName)
                )
            ) {
                return file;
            }
        });

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
        errorLogger.logDetailedError("GET_FILES_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const Get_unused_files = async (req, res) => {
    try {
        // Fetch all files from DB
        const all_files = await File.findAll();

        const indb_but_not_in_server = all_files
            .filter((file) => {
                if (
                    !fs.existsSync(
                        path.join(__dirname, "../../Files", file.fileName)
                    )
                ) {
                    return file;
                }
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const in_server_but_not_db = fs
            .readdirSync(path.join(__dirname, "../../Files"))
            .filter((file) => !all_files.find((f) => f.fileName === file)) // Correctly filters files
            .map((file) => ({
                fileName: file,
                fullPath: "http://localhost:3000/" + path.join("Files", file), // Make it a valid URL
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // sorted by date
        const unused_files = {
            indb_but_not_in_server,
            in_server_but_not_db,
        };

        return res.status(200).json({ unused_files });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("GET_UNUSED_FILES_ERROR", error);
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
            errorLogger.logDetailedError("STREAM_FILE_ERROR", err);
            res.status(500).json({ message: "Error streaming file" });
        });
    } catch (error) {
        errorLogger.logDetailedError("GET_FILE_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = {
    GetFiles,
    get_file,
    Get_unused_files,
};
