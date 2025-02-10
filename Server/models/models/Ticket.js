const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");

const Ticket = sequelize.define("Ticket", {
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
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    init_payment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    final_payment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    init_payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    final_payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    init_payment_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    init_payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    init_payment_Image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
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
});
const Ticket_Meeting = sequelize.define("Ticket_Meeting", {
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
module.exports = Ticket;
