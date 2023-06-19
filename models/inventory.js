const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Inventory = sequelize.define('Inventory', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
})

module.exports = Inventory;