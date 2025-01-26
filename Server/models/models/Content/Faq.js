const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");
const Faq = sequelize.define("Faq", {
    qst: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sol: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
module.exports = { Faq };
