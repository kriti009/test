var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    jwtDecode = require('jwt-decode');
var Game = require('./models/game');
var config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// mongoose.connect("mongodb://localhost:27017/Connect4",{ useNewUrlParser: true});
var mongoDB = 'mongodb://'+config.dbname+':'+config.dbpwd+'@ds145208.mlab.com:45208/connect4';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var newGame={
    board: [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
    ],
    result : "",
    gameEnded:false,
    movesPlayer1: [],
    movesPlayer2: []
};



app.get('/startGame',(req, res)=>{
    Game.create(newGame).then((result)=>{
        res.status(200).json({success:true, message:"READY", token:result._id});
    }).catch(()=>{
        res.status(400).json({success: false, message:"Try Again, could not start new game"})
    })
});
app.put('/makeMove',(req,res)=>{
    var player = req.body.player,
        col = req.body.col,
        gameID = req.body.token;
    if(!isValid(col)){
        res.status(202).json({success:false, message:"Invalid col: Col number must be between 0-6"});
    }
    var row = calculateRow(col);
    Game.findById(gameID).then((result)=>{
        if(isColFilled(col, result.board)){
            res.status(202).json({success:false, message:"Row Already Filled, choose another col"});
        }
        if(player==1){

        }
        if(player==2){

        }

    }).catch(()=>{
        res.status(404).json({success:false, message:"Token Incorrect, GameId not found"});
    })
});
app.listen( process.env.PORT || 8080  , () => {
    console.log("Server Connected");
});

function isValid(col){
    // var valid=false;
    if(col>=0 && col<=6)return true;
    return false;
}
// function isColFilled(col,board){
//     if(board[])
// }