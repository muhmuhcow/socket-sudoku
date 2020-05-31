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
var cors = require('cors');
var PuzzleSchema = require("./database/PuzzleSchema.js");
var mongo = require('mongodb');
var myObjectID = new mongo.ObjectID("5ed394f7633d0c136afc52a8");


app.use(cors());
app.use(router);

var lastSavedPuzzle;

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('join', ({name})=>{
      socket.broadcast.emit('playerData',{otherPlayer:name});
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
  });

io.of('/puzzle')
  .on('connection', (socket) => {
    socket.emit('message',{serverMessage:"you just a little more"});

    socket.on('puzzle', ({data})=>{
      lastSavedPuzzle = data;
      socket.broadcast.emit('myData',{data:data});
    });

    socket.on('selectedSquare', ({squareId})=>{
      socket.broadcast.emit('mySelectedSquare',{squareId:squareId});
    });

    socket.on('nameRequest', ({nameRequest})=>{
      socket.broadcast.emit('myNameRequest',"namePls");
    });
    socket.on('disconnect',()=>{
      console.log('user disconnected')
      //modify database entry to most recently saved puzzle
      PuzzleSchema.updateOne({'_id':myObjectID},{ $set: {currentPuzzle: lastSavedPuzzle} },
        function(err){
          if (err) throw err;
          console.log("1 document updated");
        })
      });
  });

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));