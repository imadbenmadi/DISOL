const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Doc = sequelize.define("Doc", {
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileSize: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file_Link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { Doc };
