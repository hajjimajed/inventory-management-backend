const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./util/database');
const bodyparser = require('body-parser')

app.use(bodyparser.json());

const userRoutes = require('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next()
})

app.use('/users', userRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Connection successfull');
    })
    .catch((err) => {
        console.error('Connection failed : ', err);
    })

app.listen(port, () => {
    console.log('server is running');
})