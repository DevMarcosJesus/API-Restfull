const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


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
    res.json(db.games);
});

app.get('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.statusCode = 400;
    }else{
        res.statusCode = 200;

        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);

        if(game !== undefined){
            res.statusCode = 200;
            res.json(game);
            
        }else{
            res.sendStatus(404);
        }
    }
})





app.listen(8000, () => {
    console.log('Api Rodando!');
});