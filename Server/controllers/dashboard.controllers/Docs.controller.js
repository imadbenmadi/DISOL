const { Document } = require("../../models/init");
const { Op } = require("sequelize");

const GetDocs = async (req, res) => {
    try {
        const docs = await Document.findAll({
            where: {
                userId: req.user.id,
            },
        });
        if (!docs) {
            return res.status(404).json({ message: "No Docs Found" });
        }
        return res.status(200).json({ docs });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const AddDoc = async (req, res) => {
    try {
        const { qst, sol } = req.body;
        const newDoc = await Document.create({
            qst,
            sol,
            userId: req.user.id,
        });
        return res.status(200).json({ newDoc });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const DeleteDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await Document.findOne({
            where: {
                id,
                userId: req.user.id,
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
