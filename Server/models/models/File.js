const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");

const File = sequelize.define("File", {
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

module.exports = { File };
