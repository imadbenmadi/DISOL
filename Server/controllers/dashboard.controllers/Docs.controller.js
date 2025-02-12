const { File } = require("../../models/init");
const { Op } = require("sequelize");

const GetDocs = async (req, res) => {
    try {
        const docs = await File.findAll({
            where: {
                fileType: "document",
            },
        });

        return res.status(200).json({ docs });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const AddDoc = async (req, res) => {
    try {
        const { fileType, fileSize } = req.fields;
        
        const newDoc = await File.create({
            fileType,
            fileSize: fileSize || null,
            file_Link: file_Link || null,
        });
        return res.status(200).json({ newDoc });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const DeleteDoc = async (req, res) => {
    try {
        const doc = await File.findOne({
            where: {
                id: req.params.id,
                fileType: "document",
            },
        });
        if (!doc) {
            return res.status(404).json({ message: "Doc Not Found" });
        }
        await doc.destroy();
        return res.status(200).json({ message: "Doc Deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = {
    GetDocs,
    AddDoc,
    DeleteDoc,
};
