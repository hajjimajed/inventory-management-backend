const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./util/database');

app.use(express.json());

const userRoutes = require('./routes/user');

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