const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Meeting_Requests = sequelize.define("Meeting_Requests", {
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    meeting_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    meeting_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
});

module.exports = Meeting_Requests;
