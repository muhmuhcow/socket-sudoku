
var db = require('mongodb').MongoClient;
//mongodb psmith3958 gmail account
db.connect("mongodb+srv://psmith:eggs1998@cluster0-h5eg7.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    db.close();
  });

 module.exports = db;