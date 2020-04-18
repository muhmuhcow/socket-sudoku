const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router')
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', function(socket){
    console.log('a user connected');
    var newName;
    socket.on('join', ({name})=>{
      console.log('okeeeeey');
      newName=name;
      socket.broadcast.emit('message',`${newName} is here!`)
    })

    

    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
  });

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));