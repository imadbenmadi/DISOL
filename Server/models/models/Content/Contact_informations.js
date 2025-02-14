const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Contact_informations = sequelize.define("Contact_informations", {
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
});
module.exports =  Contact_informations ;
