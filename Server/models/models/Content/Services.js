const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

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
