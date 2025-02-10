const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");

const Package = sequelize.define("Package", {
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

// Create a separate model for features
const PackageFeature = sequelize.define("PackageFeature", {
    feature: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Define the relationship (One Package has Many Features)
Package.hasMany(PackageFeature, {
    foreignKey: "packageId",
    onDelete: "CASCADE",
});
PackageFeature.belongsTo(Package, { foreignKey: "packageId" });

module.exports = { Package, PackageFeature };
