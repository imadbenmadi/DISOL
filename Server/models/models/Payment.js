const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");
const { Ticket } = require("./Ticket");
const { Project } = require("./Project");

const Payment = sequelize.define(
    "Payment",
    {
        entity_type: {
            type: DataTypes.ENUM("ticket", "project"),
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ticket_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        project_version: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "paid", "failed"),
            allowNull: false,
            defaultValue: "pending",
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        indexes: [
            {
                fields: ["entity_id", "entity_type", "status"],
            },
        ],
    }
);

Ticket.hasMany(Payment, {
    foreignKey: "entity_id",
    scope: { entity_type: "ticket" },
    onDelete: "CASCADE",
});
Payment.belongsTo(Ticket, {
    foreignKey: "entity_id",
    scope: { entity_type: "ticket" },
});

Project.hasMany(Payment, {
    foreignKey: "entity_id",
    scope: { entity_type: "project" },
    onDelete: "CASCADE",
});
Payment.belongsTo(Project, {
    foreignKey: "entity_id",
    scope: { entity_type: "project" },
});

module.exports = Payment;
