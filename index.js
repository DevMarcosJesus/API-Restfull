const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/database');
const Games = require('./models/Games');    
const cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

database.authenticate().then(() => {
    console.log('Banco de dados conectado a API');
}).catch((err) => {
    console.log(`Sorry not connection: ${err}`)
})

var db = {
    games: [
        {
            id: 3,
            title:'Call of Duty',
            year: 2015,
            price: 60,
        },
        {
            id: 23,
            title: 'League of Legends',
            year:2010,
            price: 0
        },
        {
            id: 65,
            title: 'Sea of Thieves',
            year: 2017,
            price: 120
        }
    ]
}


app.get('/games', (req, res) => {
    res.statusCode = 200;
   /*
    Games.findAll({
        raw:true
    })
    */
   res.json(db.games);
});


app.get('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.statusCode = 400;


    }else{
        res.statusCode = 200;

        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);

            
        }else{
            res.sendStatus(404);


        }
    }
});


app.post('/game', (req,res) => {
   
    var {title, price, year} = req.body;
    /*
    Games.findAll({
        where:{
            id:id,
            title:title,
            price:price,
            year:year
        }
    })
    */

     if(title != undefined){
         title = title;
     }

     if(price != undefined){
         price = price;
     }

     if(year != year){
         year = year;
     }

    res.sendStatus(200);

});


app.delete('/game/:id', (req,res) => {

  if(isNaN(req.params.id)){
      res.sendStatus(400);


  }else{
      var id = parseInt(req.params.id);
      var index = db.games.findIndex(g => g.id == id);


      if(index == -1){
          res.sendStatus(404);


      }else{
          db.games.splice(index, 1);
          res.sendStatus(200);

          


      }
      
  }

});


app.put('/game/:id', (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);

    }else{
        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);


        var {title,price,year} = req.body;

        if(game != undefined){
            if(title != undefined){
                game.title = title;
            }
    
            if(price != undefined){
                game.price = price;
               
            }
    
            if(year != undefined){
                game.year = year;
            }
    
            res.sendStatus(200);

        }else{
            res.sendStatus(400);

        }
    }


});

app.listen(8000, () => {
    console.log('Api Rodando!');
});