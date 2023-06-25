const Inventory = require('../models/inventory');
const Category = require('../models/category');
const Product = require('../models/product');

exports.getCategory = (req, res, next) => {
    const { userId } = req;

    Inventory.findOne({ where: { UserId: userId } })
        .then(inventory => {
            return Category.findAll({ where: { InventoryId: inventory.id } })
        })
        .then(categories => {
            res.status(200).json({ categories: categories })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}


exports.createCategory = (req, res, next) => {
    const { name, description } = req.body;
    const { userId } = req; // Assuming userId is already available in the request

    Inventory.findOne({ where: { UserId: userId } })
        .then(inventory => {
            return Category.create({
                name: name,
                description: description,
                quantity: 0,
                InventoryId: inventory.id
            });
        })
        .then(category => {
            return Inventory.findByPk(category.InventoryId);
        })
        .then(inventory => {
            inventory.quantity += 1;
            return inventory.save();
        })
        .then(() => {
            res.status(201).json({ message: 'Category created and inventory quantity incremented' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};



exports.createProduct = (req, res, next) => {
    const { name, description, quantity, price, categoryId } = req.body;
    const { userId } = req;
    let image;

    if (req.file) {
        image = req.file.path;
    } else {
        image = '/images/product.png'
    }

    Inventory.findOne({ where: { UserId: userId } })
        .then(inventory => {
            return Category.findAll({ where: { InventoryId: inventory.id } });
        })
        .then(categories => {
            return Category.findOne({ where: { id: categoryId } })
        })
        .then(category => {
            return Product.create({
                name: name,
                description: description,
                productImg: image,
                quantity: quantity,
                price: price,
                CategoryId: category.id
            })
        })
        .then(product => {
            return Category.findByPk(product.CategoryId);
        })
        .then(category => {
            category.quantity += 1;
            return category.save();
        })
        .then(() => {
            res.status(201).json({ message: 'Product created and category quantity incremented' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

exports.getAllProducts = (req, res, next) => {
    const { userId } = req;

    Inventory.findOne({ where: { UserId: userId } })
        .then(inventory => {
            return Category.findAll({ where: { InventoryId: inventory.id } })
        })
        .then(categories => {
            const categoryIds = categories.map(category => category.id);
            return Product.findAll({ where: { CategoryId: categoryIds } });
        })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            // handle any errors that occur
            next(err);
        });
}

