const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");

const Description_page = sequelize.define("Description_page", {
    Title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    image_link1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image_link2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = { Description_page };
