const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");

const Services = sequelize.define("Services", {
    Title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Services };
