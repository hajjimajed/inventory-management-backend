const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Inventory = require('./inventory');

const User = sequelize.define('User', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profileImg: {
        type: Sequelize.STRING,
        allowNull: true
    },
    about: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

User.hasOne(Inventory, { onDelete: 'CASCADE' });

module.exports = User;