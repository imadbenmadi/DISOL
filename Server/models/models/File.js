const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");

const File = sequelize.define("File", {
    fileType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uploaded_in: {
        type: DataTypes.ENUM("local", "google_drive"),
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
    FolderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

const Folder = sequelize.define("Folder", {
    folderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// ✅ Define the relationship but allow files to be without folders
Folder.hasMany(File, { foreignKey: "FolderId" });
File.belongsTo(Folder, { foreignKey: "FolderId", allowNull: true });

module.exports = { File, Folder };
