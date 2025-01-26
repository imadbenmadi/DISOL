const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");

const Contact_Messages = sequelize.define("Contact_Messages", {
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
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
module.exports = Contact_Messages ;
