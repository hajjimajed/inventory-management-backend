const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = require('./product');

const Category = sequelize.define('Category', {
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

Category.hasMany(Product, { onDelete: 'CASCADE' });

module.exports = Category;