const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Category = require('./category');

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
}, {
    timestamps: true // Enable automatic createdAt and updatedAt fields
})

Inventory.hasMany(Category, { onDelete: 'CASCADE' });

module.exports = Inventory;