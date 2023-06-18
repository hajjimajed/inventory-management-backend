const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const { email, name, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                name: name,
                password: hashedPassword
            })
            return user.save();
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

            res.status(201).json({ token: token, message: loadedUser.email, userId: loadedUser.id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getUserData = (req, res, next) => {
    const userId = req.userId;

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'user data received', user: user })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}