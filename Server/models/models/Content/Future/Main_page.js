const { DataTypes } = require("sequelize");
const sequelize = require("../../../../database/Mysql.database");

const Main_page = sequelize.define("Main_page", {
    Title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    button: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { Main_page };
