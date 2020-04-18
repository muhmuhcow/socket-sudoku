const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/',(req,res) => {
    res.send("hello world")
})

router.get('/getStuff',(req,res) => {
    res.json({ text: 'yoyo wuddup' })
})

router.get('/getPuzzle',(req,res) => {
    axios.get('https://sugoku.herokuapp.com/board', {
        params: {
          difficulty: 'easy'
        }
      })
      .then(function (response) {
        console.log(response.data);
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
})

const getPuzzle = async () => {
    const response = await axios.get('https://sugoku.herokuapp.com/board', {
        params: {
          difficulty: 'easy'
        }   
      });
    //console.log(response.data)  
    return response.data;  
    }

module.exports = router;