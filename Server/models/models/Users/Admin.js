const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Admin = sequelize.define("Admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures uniquenesss
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM("admin", "superadmin"),
        allowNull: false,
    },
});

module.exports = Admin;
