const Sequelize = require('sequelize');
const database = new Sequelize('api', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'

});

module.exports = database;