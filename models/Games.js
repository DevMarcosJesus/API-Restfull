const Sequelize = require('sequelize');
const db = require('../database/database');


Games = db.define('games',{
    title: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.INTEGER,
    },
    year: {
        type: Sequelize.INTEGER,
    },

});

//Games.sync({force: true}).then ( () => {
 //   console.log('Table create')
//});

module.exports = Games;