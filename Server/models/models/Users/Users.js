const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");
const Users = sequelize.define("Users", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    google_picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Users;
