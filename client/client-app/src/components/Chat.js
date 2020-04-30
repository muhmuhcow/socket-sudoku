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

    chat.on('myData', response=>{
      if(response.serverMessage){
        console.log(response);
      }
      if(response.data && 
         !(JSON.stringify(response.data) === JSON.stringify(currentPuzzle))){
        //console.log(response.data);
        setCurrentPuzzle(response.data);
      }
        
    });

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

        // const {name} = queryString.parse(location.search);
        // var socket = io(ENDPOINT);
        // setName(name);
        // socket.emit('join',({name}));
        
    },[])

    // useEffect (() => {
    //   chat.emit('puzzle',({data:currentPuzzle}));
    // },[currentPuzzle]);

    return (
        <div>
            <h1> Chat </h1>
              <Board 
                data={currentPuzzle} 
                setSelectedSquare={setSelectedSquare} 
                selectedSquare={selectedSquare}
                setCurrentPuzzle={setCurrentPuzzle}
                chat={chat}
             />
        </div>
    );
}
export default Chat;