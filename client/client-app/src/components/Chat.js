import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Board from "./Board";
const axios = require('axios').default;
const queryString = require('query-string');
const ENDPOINT = 'http://localhost:5000';

const Chat = ({ location }) => {
    //initialze name state
    const [name,setName] = useState('');
    const [currentPuzzle,setCurrentPuzzle] = useState('');
    
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

        
        const chat = io.connect(`${ENDPOINT}/puzzle`);
        chat.on('message', response=>{
            console.log(response);
          })  

        const {name} = queryString.parse(location.search);
        var socket = io(ENDPOINT);
        setName(name);
        socket.emit('join',({name}));
        
    },[ENDPOINT],location.search,currentPuzzle)

    //always called
    useEffect (() => {
        var socket = io.connect(ENDPOINT);
        console.log('yes im running')
        socket.on('message', response=>{
            console.log(response);
          })
    });

    return (
        <div>
            <h1> Chat </h1>
            <Board data={currentPuzzle} />
        </div>
    );

}
export default Chat;