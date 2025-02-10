const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensures uniqueness
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
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["email"], // Creates an index on email
            },
        ],
    }
);

module.exports = User;
