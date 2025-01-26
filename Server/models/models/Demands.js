const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Demands = sequelize.define("Demands", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = { Demands };
