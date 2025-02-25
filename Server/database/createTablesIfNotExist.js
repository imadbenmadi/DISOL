const sequelize = require("./Mysql.database");
const init_models = require("../models/init");
const createTablesIfNotExist = async () => {
    const queryInterface = sequelize.getQueryInterface();

    for (const modelName in init_models) {
        if (init_models[modelName].getTableName) {
            // Check if it’s a valid model
            const tableName = init_models[modelName].getTableName();

            // Generate the create table SQL
            const createTableSQL = await queryInterface
                .createTable(tableName, init_models[modelName].rawAttributes)
                .catch((err) =>
                    console.log(`Error creating table ${tableName}:`, err)
                );

            console.log(`Table checked/created: ${tableName}`);
        }
    }
};
module.exports = { createTablesIfNotExist };
