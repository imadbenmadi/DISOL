const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");
const { Faq } = require("./Faq");
const { Package } = require("./Package");
const { Project } = require("./Project");
const { Review } = require("./Review");
const { Service } = require("./Service");
const Content = sequelize.define("Content", {
    web_status: {
        type: DataTypes.ENUM("active", "maintenance", "down"),
        allowNull: false,
    },

    phone: {
        
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
Content.hasMany(Faq);
Content.hasMany(Package);
Content.hasMany(Project);
Content.hasMany(Review);
Content.hasMany(Service);
module.exports = { Content };
