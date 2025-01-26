const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

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
