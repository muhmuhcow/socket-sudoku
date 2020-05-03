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
    const [otherSelectedSquare, setOtherSelectedSquare] = useState('');

    chat.on('myData', response =>{
      if(response.data && 
         !(JSON.stringify(response.data) === JSON.stringify(currentPuzzle))){
        setCurrentPuzzle(response.data);
      }
    });

    chat.on('mySelectedSquare', response =>{
      if(response.squareId){
       setOtherSelectedSquare(response.squareId);
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

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <h1> Chat </h1>
              <Board 
                data={currentPuzzle} 
                setSelectedSquare={setSelectedSquare} 
                selectedSquare={selectedSquare}
                setCurrentPuzzle={setCurrentPuzzle}
                chat={chat}
                otherSelectedSquare={otherSelectedSquare}
             />
        </div>
    );
}
export default Chat;