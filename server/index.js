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
var cors = require('cors')

app.use(cors());
app.use(router);

io.on('connection', function(socket){
    console.log('a user connected');
    var newName;
    socket.on('join', ({name})=>{
      newName=name;
      socket.broadcast.emit('message',`${newName} is here!`)
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
  });

const puzzle = io
  .of('/puzzle')
  .on('connection', (socket) => {

    socket.emit('message',{serverMessage:"you just a little more"});

    socket.on('message', ({data})=>{
      console.log(data);
    });
  });

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));