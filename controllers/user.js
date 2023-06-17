const User = require('../models/user');

exports.signUp = (req, res, next) => {
    const { email, name, password } = req.body;

    User.create({ email, name, password })
        .then((user) => {
            console.log('User created:', user);
            res.status(201).json(user);
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}