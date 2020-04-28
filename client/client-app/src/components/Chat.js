import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Board from "./Board";
const axios = require('axios').default;
// const queryString = require('query-string');
const ENDPOINT = 'http://localhost:5000';
const chat = io.connect(`${ENDPOINT}/puzzle`);

const Chat = ({ location }) => {
    //initialze name state
    //const [name,setName] = useState('');
    const [currentPuzzle,setCurrentPuzzle] = useState('');
    const [selectedSquare,setSelectedSquare] = useState('');

    //called for change on ENDPOINT or url params
    useEffect (() => {

        //get data from server and store to the state
        var getPuzzle = async () => {
            const response = await axios.get(`${ENDPOINT}/getPuzzle`, {
                params: {
                  difficulty: 'easy'
                }
              }); 
            setCurrentPuzzle(response.data[0].data);
        }   
        getPuzzle();

       
        // chat.on('message', response=>{
        //     console.log(response);
        //   })  

        // const {name} = queryString.parse(location.search);
        // var socket = io(ENDPOINT);
        // setName(name);
        // socket.emit('join',({name}));
        
    },[])

    //always called
    useEffect (() => {
      console.log("BEEEEP");
      chat.on('message', response=>{
            console.log(response);
          });

      chat.emit('message',({data:currentPuzzle}));
    },[currentPuzzle]);

    //send updated puzzle to database
    // useEffect (() => {
    //   //var socket = io(ENDPOINT);
    //   socket.emit('message',({currentPuzzle}));

    // },[currentPuzzle]);

    return (
        <div>
            <h1> Chat </h1>
              <Board 
                data={currentPuzzle} 
                setSelectedSquare={setSelectedSquare} 
                selectedSquare={selectedSquare}
                setCurrentPuzzle={setCurrentPuzzle}
             />
        </div>
    );
}
export default Chat;