const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");

const Project = sequelize.define("Project", {
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
});
module.exports = Project;
