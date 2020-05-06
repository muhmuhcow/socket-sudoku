import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Board from "./Board";
const axios = require('axios').default;
const queryString = require('query-string');
const ENDPOINT = 'http://localhost:5000';
const chat = io.connect(`${ENDPOINT}/puzzle`);
const connectionSocket = io.connect(`${ENDPOINT}`);

const Chat = ({ location }) => {

    const [currentPuzzle,setCurrentPuzzle] = useState('');
    const [selectedSquare,setSelectedSquare] = useState('');
    const [otherSelectedSquare, setOtherSelectedSquare] = useState('');
    const [playerOne,setPlayerOne] = useState('');
    const [playerTwo,setPlayerTwo] = useState('');

    //catch other player's name
    connectionSocket.on('playerData', response =>{
      if(response.otherPlayer){
       console.log(response.otherPlayer);
       setPlayerTwo(response.otherPlayer);
      }
    });

    //handle name request
    chat.on('myNameRequest', response =>{
      console.log("YOOOOO");
      if(response==="namePls"){
        console.log(response);
        connectionSocket.emit('join',{name:`${playerOne}`});
      }
    });

    //catch board data
    chat.on('myData', response =>{
      if(response.data && 
         !(JSON.stringify(response.data) === JSON.stringify(currentPuzzle))){
        setCurrentPuzzle(response.data);
      }
    });

    //catch selected square
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

        //setPlayer1
        const {name} = queryString.parse(location.search);
        setPlayerOne(name);
        //send out your name
        connectionSocket.emit('join',({name}));    
        console.log(name)
        //request other player's name
        chat.emit('nameRequest',({nameRequest:"WOW ok"}), () => {});
    },[])

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <h1> Chat </h1>
            <div className="Players">{playerOne}</div>
            <div className="Players">{playerTwo}</div>
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