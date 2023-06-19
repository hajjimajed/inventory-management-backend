const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('Product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productImg: {
        type: Sequelize.STRING,
        allowNull: true
    },
    barCode: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
})

module.exports = Product;