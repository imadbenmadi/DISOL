const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");
const { Meetings_schedule } = require("./Meetings_schedule");
const Ticket = sequelize.define("Ticket", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
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
    service_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    init_payment_amount: {
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
});
const init_payment = sequelize.define("init_payment", {
    payment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    payment_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_Image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

Ticket.HasMany(Meetings_schedule);
Meetings_schedule.belongsTo(Ticket);
Ticket.HasMany(init_payment);
init_payment.belongsTo(Ticket);
module.exports = { Ticket, Meetings_schedule };
