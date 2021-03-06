import React, { useState, useEffect } from 'react';
import './project.css';

const Square = ({ boardData,
                  rowNum, 
                  colNum, 
                  value, 
                  setSelectedSquare, 
                  selectedSquare, 
                  chat, 
                  otherSelectedSquare, 
                  notes,
                  errorStack,
                  initialPuzzle
                 }) => {

    const [rowNumber] = useState(rowNum);
    const [colNumber] = useState(colNum);
    const [isImmutable,setIsImmutable] = useState(false);
    var mySquareId = rowNumber*10 + colNumber;
    const notesId = mySquareId-(((mySquareId-(mySquareId%10))/10)+9)-1;
    var notesArray = [1,2,3,4,5,6,7,8,9];
    //check if number is immutable
    useEffect(()=>{
        if( value===initialPuzzle[rowNum-1][colNum-1] && value!==0){
            setIsImmutable(true);
        }
    },[])

    var setBackgroundColor = (() => {
        if(mySquareId === otherSelectedSquare && mySquareId === selectedSquare){
            return '#FFB6C1';
        }
        if(mySquareId === selectedSquare){
            return '#87CEFA';
        }
        if(mySquareId === otherSelectedSquare){ 
            return '#98FB98';
        }
        return null;
      })
    
    var myBackgroundColor = setBackgroundColor(); 

    var handleClick = e => {  
        if(isImmutable===true){
            return;
        }
        setSelectedSquare(mySquareId);
        chat.emit('selectedSquare',({squareId:mySquareId}), () => {      
        });
    }

    return (
            <div 
                className='Square' 
                onClick={handleClick}
                style={{backgroundColor:myBackgroundColor,
                        color:isImmutable?"black"
                        :(errorStack.find(errorId => {return errorId===mySquareId})? "red" : "rgb(0, 0, 205)")
                      }}
            >               
                    {value===0 ?
                    <div className="NotesContainer">
                        {Array.prototype.map.call(notesArray, value => {
                            return (<div className="Notes" key={value}> 
                                        {notes[notesId].find(notesValue => {return notesValue===value})?value:null} </div>)
                        })}
                    </div>:value}
            </div>
    );
}
export default Square;