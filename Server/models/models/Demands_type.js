const { DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");

const Demands_types = sequelize.define("Demands_types", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports =  Demands_types ;
