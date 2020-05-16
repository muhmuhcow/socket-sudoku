const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');
var PuzzleSchema = require("./database/PuzzleSchema.js");
const moment = require('moment');
var solve = require("./solve.js");
var checkValid = require("./solve.js");

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
  var data = {
    board: [[1,0,3,0,0,0,0,8,4],
    [0,0,6,0,4,8,0,0,0],
    [0,4,0,0,0,0,0,0,0],
    [2,0,0,0,9,6,1,0,0],
    [0,9,0,8,0,1,0,4,0],
    [0,0,4,3,2,0,0,0,8],
    [0,0,0,0,0,0,0,7,0],
    [0,0,0,1,5,0,4,0,0],
    [0,6,0,0,0,0,2,0,3]]
          };
     var badData = [ [ 4, 9, 1, 9, 9, 9, 9, 9, 9 ],
     [ 2, 9, 9, 9, 9, 9, 9, 7, 0 ],
     [ 0, 7, 0, 0, 0, 0, 0, 0, 0 ],
     [ 1, 0, 0, 4, 0, 6, 0, 0, 7 ],
     [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
     [ 0, 0, 0, 0, 1, 2, 5, 4, 6 ],
     [ 3, 0, 2, 7, 6, 0, 9, 8, 0 ],
     [ 0, 6, 4, 9, 0, 3, 0, 0, 1 ],
     [ 9, 8, 0, 5, 2, 1, 0, 6, 0 ] ]  ;   
    const puzzleResponse = await axios.get('https://sugoku.herokuapp.com/board', {
      params: {
        difficulty: 'hard'
      }   
  });
        console.log(data.board);
        var result = solve(data.board);
        console.log(`result: ${result}`);
        // var validtest = checkValid(badData);
        // console.log(`validTest: ${validtest}`)
      // let now = moment();
      // var newPuzzle = new PuzzleSchema();
      //   newPuzzle.data = puzzleResponse.data.board
      //   newPuzzle.date = now.format();
      //   newPuzzle.solution = response.data.solution;
      // newPuzzle.save(function(err,data){
      //   if(err){console.log(err);}
      //   return data; 
      // }); 
}

module.exports = router;