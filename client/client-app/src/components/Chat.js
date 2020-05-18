import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Board from "./Board";
import Player from "./Player";
import './project.css';
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
    const [notesMode,setNotesMode] = useState('');
    const [notes,setNotes] = useState('');

    //catch other player's name
    connectionSocket.on('playerData', response =>{
      if(response.otherPlayer){
       setPlayerTwo(response.otherPlayer);
      }
    });

    //handle name request
    chat.on('myNameRequest', response =>{
      if(response==="namePls"){
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

    //called on component mount
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
        //initialise notes array
        var myNotes = [];
        for (var i=0;i<81;i++){
          myNotes.push([0]);
        }
        setNotes(myNotes);
        //setPlayer1
        const {name} = queryString.parse(location.search);
        setPlayerOne(name);
        //send out your name
        connectionSocket.emit('join',({name}));    
        //request other player's name
        chat.emit('nameRequest',({nameRequest:"WOW ok"}), () => {});
    },[])

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <h1> {notesMode?'NOTES MODE ON':'NOTES MODE OFF'} </h1>
            <div className="PlayerContainer"> 
              <Player title={"Player 1"} playerName={playerOne}/> 
              <Player title={"Player 2"} playerName={playerTwo}/> 
            </div>
            
              <Board 
                data={currentPuzzle} 
                setSelectedSquare={setSelectedSquare} 
                selectedSquare={selectedSquare}
                setCurrentPuzzle={setCurrentPuzzle}
                chat={chat}
                otherSelectedSquare={otherSelectedSquare}
                setNotesMode={setNotesMode}
                setNotes={setNotes}
                notesMode={notesMode}
                notes={notes}
             />
        </div>
    );
}
export default Chat;