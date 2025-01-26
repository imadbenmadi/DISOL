const Sequelize = require("sequelize");
const dbConfig = require("../config/db.conf");

const sequelize = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.DB_USER,
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
    }
);

module.exports = sequelize;
