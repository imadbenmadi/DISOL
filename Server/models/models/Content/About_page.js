const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const About_page = sequelize.define("About_page", {
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
    button: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { About_page };
