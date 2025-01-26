const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Phrase_Contact = sequelize.define("Phrase_Contact", {
    Text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    button: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { Phrase_Contact };
