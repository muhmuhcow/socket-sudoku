import React, { useState } from 'react';
import './project.css';

const Square = ({ rowNum, colNum, value, setSelectedSquare, selectedSquare, chat, otherSelectedSquare }) => {

    const [rowNumber] = useState(rowNum);
    const [colNumber] = useState(colNum);
    const [isSelected, setIsSelected] = useState(false);
    
    var mySquareId = rowNumber*10 + colNumber;

    var setBackgroundColor = (() => {
        if(mySquareId === otherSelectedSquare && mySquareId === selectedSquare){
            return '#98FB98';
        }
        if(mySquareId === selectedSquare){
            return '#87CEFA';
        }
        if(mySquareId === otherSelectedSquare){
            return '#FFB6C1';
        }
        return null;
      })
    
    var myBackgroundColor = setBackgroundColor(); 

    var handleClick = e => {  
        setSelectedSquare(mySquareId);
        chat.emit('selectedSquare',({squareId:mySquareId}), () => {      
        }); 
    }

    return (
            <div 
                className='Square' 
                onClick={handleClick}
                style={{backgroundColor:myBackgroundColor}}
            >
                    {value===0 ? null : value}
            </div>
    );
}
export default Square;