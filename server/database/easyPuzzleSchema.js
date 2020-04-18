var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 mongoose.connect("mongodb+srv://psmith:eggs1998@cluster0-h5eg7.mongodb.net/test?retryWrites=true&w=majority");

 var easyPuzzleSchema = new Schema({
      "data": Array,
      "date": Date
    });

  var easyPuzzleModel = mongoose.model("easyPuzzleModel",easyPuzzleSchema);

  module.exports = easyPuzzleModel;