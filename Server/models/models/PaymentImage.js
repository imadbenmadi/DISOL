const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../database/Mysql.database");
const Payment = require("./Payment");
const PaymentImage = sequelize.define("PaymentImage", {
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Payments", key: "id" },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Payment.hasMany(PaymentImage, {
    foreignKey: "payment_id",
    onDelete: "CASCADE",
});
PaymentImage.belongsTo(Payment, { foreignKey: "payment_id" });

module.exports = PaymentImage;
