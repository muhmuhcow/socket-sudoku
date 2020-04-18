const express = require('express');
const socketio = require('socket.io');
const axios = require('axios');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const db = require('./database/db.js');
var easyPuzzleSchema = require("./database/easyPuzzleSchema.js");

app.use(router);

io.on('connection', function(socket){
    getPuzzle()
    console.log('a user connected');
    var newName;
    socket.on('join', ({name})=>{
      newName=name;
      socket.broadcast.emit('message',`${newName} is here!`)
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
  });

const puzzle = io
.of('/puzzle')
.on('connection', (socket) => {
  
  socket.emit('message',{serverMessage:"you just a little more"});
});

//gets puzzles by api call
const getPuzzle = async () => {
  const response = await axios.get('https://sugoku.herokuapp.com/board', {
      params: {
        difficulty: 'easy'
      }   
    });
  //console.log(response.data)
  var newPuzzle = new easyPuzzleSchema();
      newPuzzle.data.board = response.data
  
  newPuzzle.save(function(err,data){
    if(err){console.log(err);}
    //return response.data; 
});   

   
  }




server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
