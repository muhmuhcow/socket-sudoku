const express = require('express');
const router = express.Router();
const axios = require('axios');
var easyPuzzleSchema = require("./database/easyPuzzleSchema.js");
const moment = require('moment');

router.get('/',(req,res) => {
    res.send("hello world")
})

router.get('/getStuff',(req,res) => {
    res.json({ text: 'yoyo wuddup' })
})

//get puzzle from database
router.get('/getPuzzle',(req,res) => {
  var mySort = { date: -1 }; 
  easyPuzzleSchema.find({}).sort(mySort).exec(function(err, docs) { 
      console.log(docs);
      res.send(docs)
  });
})

//get puzzle from database
router.get('/savePuzzle',(req,res) => {
  savePuzzle( dbResponse => {
    res.send(dbResponse);
  })
})

//gets puzzles by api call and saves them in database
const savePuzzle = async () => {
  const response = await axios.get('https://sugoku.herokuapp.com/board', {
      params: {
        difficulty: 'easy'
      }   
  });
  let now = moment();
  var newPuzzle = new easyPuzzleSchema();
      newPuzzle.data = response.data
      newPuzzle.date = now.format();
  newPuzzle.save(function(err,data){
    if(err){console.log(err);}
    return data; 
  });   
};

module.exports = router;