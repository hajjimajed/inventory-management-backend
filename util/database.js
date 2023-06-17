const Sequelize = require('sequelize');

const sequelize = new Sequelize('inventory-management', 'root', '0000', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;