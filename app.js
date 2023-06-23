const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./util/database');
const path = require('path');
const multer = require('multer');

const userRoutes = require('./routes/user');
const inventoryRoutes = require('./routes/inventory');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.originalname.split('.').slice(0, -1).join('.');
        const extension = file.originalname.split('.').pop();
        cb(null, `${filename}-${uniqueSuffix}.${extension}`);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(express.json());

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next()
})

app.use('/users', userRoutes);
app.use('/inventory', inventoryRoutes);

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