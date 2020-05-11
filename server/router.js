const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');
var PuzzleSchema = require("./database/PuzzleSchema.js");
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
  PuzzleSchema.find({}).sort(mySort).exec(function(err, docs) { 
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
  const data = {board:[[0,0,0,0,0,0,8,0,0],[0,0,4,0,0,8,0,0,9],[0,7,0,0,0,0,0,0,5],[0,1,0,0,7,5,0,0,8],[0,5,6,0,9,1,3,0,0],[7,8,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,0,0,9,3,0,0,1,0],[0,0,5,7,0,0,4,0,3]]}
  const puzzleResponse = await axios.get('https://sugoku.herokuapp.com/board', {
      params: {
        difficulty: 'hard'
      }   
  });
  axios.post('https://sugoku.herokuapp.com/solve', {  
        body: (data)
      }   
  ).then(function (response) {
        console.log(puzzleResponse.data.board);
        console.log(response.data.solution);
      // let now = moment();
      // var newPuzzle = new PuzzleSchema();
      //   newPuzzle.data = puzzleResponse.data.board
      //   newPuzzle.date = now.format();
      //   newPuzzle.solution = response.data.solution;
      // newPuzzle.save(function(err,data){
      //   if(err){console.log(err);}
      //   return data; 
      // }); 
  })
.catch(function (error) {
  console.log(error);
})  
};

module.exports = router;