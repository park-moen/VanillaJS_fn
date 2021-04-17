const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Product = require('./product');
const UserItem = require('./userItem');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Product = Product;
db.UserItem = UserItem;

Product.init(sequelize);
UserItem.init(sequelize);

module.exports = db;
