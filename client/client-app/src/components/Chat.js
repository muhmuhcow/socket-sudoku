import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Board from "./Board";
import Player from "./Player";
import checkValid from "./checkValid";
import ResetButton from "./ResetButton";
import Img from 'react-image';
import Timer from 'react-compound-timer'
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
    const [errorStack,setErrorStack] = useState([]);
    const [winState,setWinState] = useState(false);
    var timerStop;
    var timerReset;
    const myData = [ [ 0, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
    [ 2, 1, 4, 3, 6, 5, 8, 9, 7 ],
    [ 3, 6, 5, 8, 9, 7, 2, 1, 4 ],
    [ 8, 9, 7, 2, 1, 4, 3, 6, 5 ],
    [ 5, 3, 1, 6, 4, 2, 9, 7, 8 ],
    [ 6, 4, 2, 9, 7, 8, 5, 3, 1 ],
    [ 9, 7, 8, 5, 3, 1, 6, 4, 2 ] ];

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
            setCurrentPuzzle(response.data[0].currentPuzzle);
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

    //check for puzzle error and update error stack
    useEffect (() => {
      if(currentPuzzle){
        var myErrorStack = checkValid(currentPuzzle);
        setErrorStack(myErrorStack);
        //for every row in puzzle
        var unfilledCount = 0;
        Array.prototype.map.call(currentPuzzle, row => {
          //check for 0 (unfilled squares)
          Array.prototype.map.call(row, square =>{
            if(square===0){
              unfilledCount+=1;
            }
          })
      })
      if(unfilledCount===0 && myErrorStack.length === 0){
        setWinState(true);
        timerStop();
      }
      else{
        setWinState(false);
      }
      }
  },[currentPuzzle])

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <h1> {notesMode?'NOTES MODE ON':'NOTES MODE OFF'} </h1>
            <div className="PlayerContainer"> 
              <Player title={"Player 1"} playerName={playerOne}/> 
              <Player title={"Player 2"} playerName={playerTwo}/> 
            </div>
            
            <div style={{color:'green'}}>
              
              <Timer initialTime={0} lastUnit="m" >
                {
                  ({ start, resume, pause, stop, reset }) => {
                    timerStop = stop;
                    timerReset = reset;
                    return(
                      <React.Fragment>
                      <Timer.Minutes />m  
                      <Timer.Seconds />s
                      </React.Fragment>
                    )
                  }
                }
              </Timer>
              {winState===true ? 
              <Img src={require('./../assets/icons8-tick-box-48.png')}/>
              : null}
              <ResetButton chat={chat} setCurrentPuzzle={setCurrentPuzzle} />
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
                errorStack={errorStack}
             />
        </div>
    );
}
export default Chat;