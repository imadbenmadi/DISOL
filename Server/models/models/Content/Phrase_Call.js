const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db_connection");

const Phrase_Call = sequelize.define("Phrase_Call", {
    Text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    button: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = { Phrase_Call };
