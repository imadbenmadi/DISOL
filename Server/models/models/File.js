const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const File = sequelize.define("File", {
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

File.hasMany(Meetings_schedule);
Meetings_schedule.belongsTo(File);

module.exports = { File };
