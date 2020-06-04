const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');
const path = require('path'); 
var PuzzleSchema = require("./database/PuzzleSchema.js");
const moment = require('moment');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
//router.use(bodyParser.json({ type: 'application/*+json' }))
router.use(bodyParser.json())

router.use(express.static(path.join(__dirname, 'build')));


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// router.get('/',(req,res) => {
//     res.send("hello world")
// })

//get puzzle from database
router.get('/getPuzzle',(req,res) => {
  var mySort = { date: -1 }; 
  PuzzleSchema.find({}).sort(mySort).exec(function(err, docs) { 
      res.send(docs)
  });
})

//change puzzle in the database
router.post('/changePuzzle',(req,res) => {
  console.log(req.body.difficulty);
  //make api request
  changePuzzle(difficulty);
  res.send(req.body);
})

//get puzzle from database
router.get('/savePuzzle',(req,res) => {
  savePuzzle( dbResponse => {
    res.send(dbResponse);
  })
})

//gets puzzles by api call and saves them in database
const savePuzzle = async difficulty => {
    if(!difficulty){
      difficulty = 'easy'
    }
    const puzzleResponse = await axios.get('https://sugoku.herokuapp.com/board', {
      params: {
        difficulty: difficulty
      }   
  });
      let now = moment();
      var newPuzzle = new PuzzleSchema();
        newPuzzle.currentPuzzle = puzzleResponse.data.board
        newPuzzle.date = now.format();
        newPuzzle.initialPuzzle = puzzleResponse.data.board;
        newPuzzle.save(function(err,data){
          if(err){console.log(err);}
          return data; 
        }); 
}

//gets puzzles by api call and saves them in database
const changePuzzle = async difficulty => {
  if(!difficulty){
    difficulty = 'easy'
  }
  const puzzleResponse = await axios.get('https://sugoku.herokuapp.com/board', {
    params: {
      difficulty: difficulty
    }   
});
  //update existing database document to new puzzle
    let now = moment();
      if(puzzleResponse.data.board){
        PuzzleSchema.updateOne({'_id':myObjectID},{ 
          $set: {
            currentPuzzle: puzzleResponse.data.board,
            initialPuzzle: puzzleResponse.data.board,
            date: now.format()
          } },
        function(err){
          if (err) throw err;
          console.log("1 document updated");
          return
        })
      }
}

module.exports = router;