var mongoose = require("mongoose");
const { stringify } = require("querystring");
var Schema = mongoose.Schema;
var gameSchema = new mongoose.Schema({
    result: {type :String},
    gameEnded: {type: Boolean}, //true-gameEnded, false-gameOn
    movesPlayer1:{type : Array}, //red
    movesPlayer2:{type : Array}, //blue
    board: {type :Array},
    // jwt:{type: String}
});

module.exports = mongoose.model("Game", gameSchema);