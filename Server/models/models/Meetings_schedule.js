const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");
const Meetings_schedule = sequelize.define("Meetings_schedule", {
    meeting_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    meeting_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    meeting_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    admin_message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});
module.exports = Meetings_schedule;
