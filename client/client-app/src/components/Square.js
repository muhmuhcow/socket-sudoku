import React, { useState, useEffect } from 'react';
import './project.css';

const Square = ({ boardData, rowNum, colNum, value, setSelectedSquare, selectedSquare, chat, otherSelectedSquare }) => {

    const [rowNumber] = useState(rowNum);
    const [colNumber] = useState(colNum);
    const [isImmutable,setIsImmutable] = useState(false);
    
    //check if number is immutable
    useEffect(()=>{
        if(boardData[rowNum-1][colNum-1] === value && value!==0){
            setIsImmutable(true);
        }
    },[])

    var mySquareId = rowNumber*10 + colNumber;

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
                style={{backgroundColor:myBackgroundColor,color:isImmutable?"black":"rgb(0, 0, 205)"}}
            >
                    {value===0 ? null : value}
                    {/* {<div className="NotesContainer">
                        <div className='Notes'> 1 </div>
                        <div className='Notes'> 2 </div>
                        <div className='Notes'> 3 </div>
                        <div className='Notes'> 4 </div>
                        <div className='Notes'> 5 </div>
                        <div className='Notes'> 6 </div>
                        <div className='Notes'> 7 </div>
                        <div className='Notes'> 8 </div>
                        <div className='Notes'> 9 </div>
                    </div>} */}
            </div>
    );
}
export default Square;