const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");
const Meetings_schedule = require("./Meetings_schedule");
const Meeting_Requests = require("./Meeting_Requests");
const Project = sequelize.define(
    "Project",
    {
        service_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ticket_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        workerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        final_payment_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
    },
    {
        indexes: [
            {
                fields: ["userId"],
            },
        ],
    }
);

Meetings_schedule.belongsTo(Project, {
    foreignKey: "projectId",
});
Project.hasMany(Meetings_schedule, {
    foreignKey: "projectId",
    onDelete: "CASCADE",
});
Meeting_Requests.belongsTo(Project, {
    foreignKey: "projectId",
});
Project.hasMany(Meeting_Requests, {
    foreignKey: "projectId",
    onDelete: "CASCADE",
});

module.exports = Project;
