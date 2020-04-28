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

        // const {name} = queryString.parse(location.search);
        // var socket = io(ENDPOINT);
        // setName(name);
        // socket.emit('join',({name}));
        
    },[])

    useEffect (() => {
      chat.on('message', response=>{
            if(response.serverMessage){
              console.log(response);
            }
            
            if(response.data){
              setCurrentPuzzle(response.data)
            }
          });
      
      chat.emit('puzzle',({data:currentPuzzle}));
    },[currentPuzzle]);

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