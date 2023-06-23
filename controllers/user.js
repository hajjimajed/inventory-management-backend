const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Inventory = require('../models/inventory');

exports.signUp = (req, res, next) => {
    const { email, name, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            return User.create({
                email: email,
                name: name,
                password: hashedPassword,
                profileImg: '/images/avatar.jpg',
                Inventory: {
                    name: 'Default Inventory',
                    description: 'Default inventory for the user',
                    quantity: 0
                }
            }, { include: [Inventory] }); // Include the associated Inventory model
        })
        .then(result => {
            res.status(201).json({ message: 'user created', userId: result._id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.signIn = (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                const error = new Error('user not exist');
                error.statusCode = 401;
                throw error;
            }

            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('wrong password');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id
                },
                'mysecuritystring',
                { expiresIn: '24h' }
            )

            res.status(201).json({ token: token, user: loadedUser, userId: loadedUser.id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.editUser = (req, res, next) => {
    const { userId } = req;
    const { email, name, about, address } = req.body;

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                const error = new Error('user not found');
                error.statusCode = 404;
                throw error;
            }

            user.email = email || user.email;
            user.name = name || user.name;
            user.about = about || user.about;
            user.address = address || user.address;

            if (req.file) {
                user.profileImg = req.file.path;
            }

            return user.save();
        })
        .then(updatedUser => {
            res.status(200).json({ message: 'user data updated', user: updatedUser });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};



