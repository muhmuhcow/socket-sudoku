var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 mongoose.connect("mongodb+srv://psmith:eggs1998@cluster0-h5eg7.mongodb.net/test?retryWrites=true&w=majority");

 var PuzzleSchema = new Schema({
      "data": Array,
      "date": Date,
      "solution": Array
    });

  var PuzzleModel = mongoose.model("PuzzleModel",PuzzleSchema);

  module.exports = PuzzleModel;