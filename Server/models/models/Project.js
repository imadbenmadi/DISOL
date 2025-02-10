const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/Mysql.database");
const { Meetings_schedule } = require("./Meetings_schedule");
const Project = sequelize.define("Project", {
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
});
const project_payment = sequelize.define("project_payment", {
    projectId: {
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_version: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
const project_payment_images = sequelize.define("project_payment_images", {
    project_payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
Project.hasMany(project_payment_images, {
    foreignKey: "projectId",
    onDelete: "CASCADE",
});
Project.hasMany(project_payment, {
    foreignKey: "projectId",
    onDelete: "CASCADE",
});
Project.hasMany(Meetings_schedule, {
    foreignKey: "projectId",
    onDelete: "CASCADE",
});
Meetings_schedule.belongsTo(Project, {
    foreignKey: "projectId",
});
project_payment_images.belongsTo(project_payment, {
    foreignKey: "project_payment_id",
});
project_payment.belongsTo(Project, {
    foreignKey: "projectId",
});

module.exports = Project;
