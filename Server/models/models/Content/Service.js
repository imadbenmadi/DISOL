const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Service = sequelize.define("Service", {
    Title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
const Services_type = sequelize.define("Services_type", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
Service.belongsTo(Services_type, {
    foreignKey: "serviceId",
    onDelete: "CASCADE",
});
module.exports = { Service };
