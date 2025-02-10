const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Review = sequelize.define("Review", {
    user_image_link: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Projectid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Review };
