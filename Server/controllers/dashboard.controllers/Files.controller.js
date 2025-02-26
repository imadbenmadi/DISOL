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

const GetFolders = async (req, res) => {
    try {
        // Fetch all files from DB
        const all_Folders = await Folder.findAll();

        // Filter only Folders that exist on the server
        const only_existing_Folders = all_Folders.filter((file) => {
            if (
                file.fileName &&
                fs.existsSync(
                    path.join(__dirname, "../../Files", file.fileName)
                )
            ) {
                return file;
            }
        });

        // Fetch folders with their document-type Folders
        const folders = only_existing_Folders.map((folder) => {
            return {
                ...folder.dataValues,
                // files: folder.files.filter((file) =>
                //     fs.existsSync(
                //         path.join(__dirname, "../../Files", file.fileName)
                //     )
                // ),
                files: (folder.files || []).filter((file) =>
                    fs.existsSync(
                        path.join(__dirname, "../../Files", file.fileName)
                    )
                ),
            };
        });

        return res.status(200).json({ folders });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("GET_FILES_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetFolder = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the folder from the database
        const folder = await Folder.findByPk(id, {
            include: [
                {
                    model: File,
                    required: false,
                },
            ],
        });

        // Check if the folder exists
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // Filter only files that exist on the server

        const only_existing_files = (folder.files || []).filter((file) => {
            fs.existsSync(path.join(__dirname, file.file_Link));
        });

        return res.status(200).json({
            folder: { ...folder.dataValues, files: only_existing_files },
        });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("GET_FOLDER_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const Create_folder = async (req, res) => {
    console.log("test");
    try {
        const { folderName } = req.fields; // ✅ Fix: Use `req.fields` instead of `req.body`

        if (
            !folderName ||
            folderName.includes("..") ||
            folderName.includes("/")
        ) {
            return res.status(400).json({ message: "Invalid folder name" });
        }

        const folderPath = path.join(__dirname, "../../Files", folderName);

        if (
            fs.existsSync(folderPath) ||
            folderName === "Folders" ||
            folderName === "Files" ||
            Folder.findOne({ where: { folderName } })
        ) {
            return res.status(409).json({ message: "Folder already exists" });
        }

        fs.mkdirSync(folderPath, { recursive: true });

        const newFolder = await Folder.create({ folderName });

        return res.status(201).json({
            message: "Folder created successfully",
            folder: newFolder,
        });
    } catch (error) {
        console.error("CREATE_FOLDER_ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const Create_File = async (req, res) => {
    try {
        const { fileType, fileName, uploaded_in, fileSize, folderId } =
            req.fields;

        if (!fileName || fileName.includes("..") || fileName.includes("/")) {
            return res.status(400).json({ message: "Invalid file name" });
        }

        const existingFile = await File.findOne({ where: { fileName } });
        if (existingFile) {
            return res
                .status(409)
                .json({ message: "File already exists in the Database" });
        }

        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploadedFile = req.files.file; // formidable stores file details here
        let filePath;
        let destinationFolder;

        if (folderId) {
            const folder = await Folder.findByPk(folderId);
            if (
                !folder ||
                !fs.existsSync(
                    path.join(__dirname, "../../Files", folder.folderName)
                )
            ) {
                destinationFolder = path.join(__dirname, "../../Files");
                filePath = path.join(destinationFolder, fileName);
            } else {
                destinationFolder = path.join(
                    __dirname,
                    "../../Files",
                    folder.folderName
                );
                filePath = path.join(destinationFolder, fileName);
            }
        } else {
            destinationFolder = path.join(__dirname, "../../Files");
            filePath = path.join(destinationFolder, fileName);
        }

        // Move file from temp location to the final folder
        fs.renameSync(uploadedFile.path, filePath); // Faster and works on shared hosting
        const file_Link =
            "http://localhost:3000/" + path.join(destinationFolder); // Make it a valid URL
        // Create file record in DB
        const newFile = await File.create({
            fileType,
            fileName,
            uploaded_in,
            fileSize,
            file_Link,
            FolderId: folderId || null,
        });

        return res.status(201).json({
            message: "File created successfully",
            file: newFile,
        });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("CREATE_FILE_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const Delete_folder = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the folder from the database
        const folder = await Folder.findByPk(id, {
            include: [
                {
                    model: File,
                    required: false,
                },
            ],
        });

        // Check if the folder exists
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // Delete the files in the folder from the server
        folder.files.forEach((file) => {
            const filePath = path.join(__dirname, "../../Files", file.fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        // Delete the folder from the server
        const folderPath = path.join(
            __dirname,
            "../../Files",
            folder.folderName
        );
        if (fs.existsSync(folderPath)) {
            fs.rmdirSync(folderPath, { recursive: true });
        }
        // Delete the files in the folder from the database
        await File.destroy({
            where: {
                FolderId: folder.id,
            },
        });
        // Delete the folder from the database
        await folder.destroy();
        return res.status(200).json({ message: "Folder deleted successfully" });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("DELETE_FOLDER_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const Delete_File = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the file from the database
        const file = await File.findByPk(id);

        // Check if the file exists
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Delete the file from the server
        const filePath = path.join(__dirname, "../../Files", file.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        // Delete the file from the database
        await file.destroy();
        return res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("DELETE_FILE_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const update_folder_name = async (req, res) => {
    try {
        const { id } = req.params;
        const { folderName } = req.body;

        // Validate the folderName to prevent directory traversal attacks
        if (
            !folderName ||
            folderName.includes("..") ||
            folderName.includes("/")
        ) {
            return res.status(400).json({ message: "Invalid folder name" });
        }

        // Fetch the folder from the database
        const folder = await Folder.findByPk(id);

        // Check if the folder exists
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // Check if the folder name is already taken
        const existingFolder = await Folder.findOne({
            where: {
                folderName,
                id: {
                    [Op.ne]: id,
                },
            },
        });
        if (existingFolder) {
            return res
                .status(409)
                .json({ message: "Folder name already exists" });
        }

        // Rename the folder on the server
        const oldFolderPath = path.join(
            __dirname,
            "../../Files",
            folder.folderName
        );
        const newFolderPath = path.join(__dirname, "../../Files", folderName);
        if (fs.existsSync(oldFolderPath)) {
            fs.renameSync(oldFolderPath, newFolderPath);
        }

        // Update the folder in the database
        folder.folderName = folderName;
        await folder.save();

        return res.status(200).json({ message: "Folder updated successfully" });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("UPDATE_FOLDER_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const move_file = async (req, res) => {
    try {
        const { id } = req.params;
        const { folderId, toRoot } = req.body;

        // Fetch the file from the database
        const file = await File.findByPk(id);

        // Check if the file exists
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        if (toRoot) {
            file.FolderId = null;
            // Move the file to the root in the server
            const oldFilePath = path.join(
                __dirname,
                "../../Files",
                file.fileName
            );
            const newFilePath = path.join(
                __dirname,
                "../../Files",
                file.fileName
            );
            if (fs.existsSync(oldFilePath)) {
                fs.renameSync(oldFilePath, newFilePath);
            }
            await file.save();

            return res.status(200).json({ message: "File moved successfully" });
        } else {
            // Check if the folder exists
            const folder = await Folder.findByPk(folderId);
            if (!folder) {
                return res.status(404).json({ message: "Folder not found" });
            }

            // Move the file to the folder
            file.FolderId = folderId;
            // Move the file to the folder in the server
            const oldFilePath = path.join(
                __dirname,
                "../../Files",
                file.fileName
            );
            const newFilePath = path.join(
                __dirname,
                "../../Files",
                folder.folderName,
                file.fileName
            );
            if (fs.existsSync(oldFilePath)) {
                fs.renameSync(oldFilePath, newFilePath);
            }

            await file.save();
        }

        return res.status(200).json({ message: "File moved successfully" });
    } catch (error) {
        console.error(error);
        errorLogger.logDetailedError("MOVE_FILE_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = {
    GetFiles,
    Get_unused_files,
    GetFolders,
    GetFolder,
    Create_folder,
    Create_File,
    Delete_folder,
    Delete_File,
    update_folder_name,
    move_file,
};
