const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Worker = sequelize.define("Worker", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Worker;
