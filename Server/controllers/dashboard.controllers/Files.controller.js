const { File, Folder } = require("../../models/init");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const GetFiles = async (req, res) => {
    try {
        // Fetch folders with their document-type files
        const folders = await Folder.findAll({
            include: [
                {
                    model: File,
                    required: false,
                },
            ],
        });

        // Fetch standalone files (files without a folder)
        const standaloneFiles = await File.findAll({
            where: {
                FolderId: null,
            },
        });

        return res.status(200).json({ folders, standaloneFiles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const get_file = async (req, res) => {
    try {
        const { fileName } = req.params;

        // Construct the file path
        const filePath = path.join(__dirname, "uploads", fileName); // Adjust the path as needed

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        // Read the file as a stream
        const fileStream = fs.createReadStream(filePath);

        // Set the appropriate headers
        res.setHeader("Content-Type", "application/pdf"); // Adjust the MIME type as needed
        res.setHeader("Content-Disposition", `inline; filename="${fileName}"`); // Use "inline" to display in the browser

        // Stream the file to the client
        fileStream.pipe(res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = {
    GetFiles,
    get_file,
};
