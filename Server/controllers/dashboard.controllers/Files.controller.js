const { File, Folder } = require("../../models/init");
const { Op } = require("sequelize");

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

module.exports = {
    GetFiles,
};
