import React, { useState } from 'react';
import './project.css';

const Square = ({ rowNum, colNum, value, setSelectedSquare, selectedSquare }) => {

    const [rowNumber] = useState(rowNum);
    const [colNumber] = useState(colNum);
    const [isSelected, setIsSelected] = useState(false);
    
    var squareId = rowNumber*10 + colNumber;

    var handleClick = e => {  
        setSelectedSquare(squareId);
    }

    return (
            <div 
                className='Square' 
                onClick={handleClick}
                style={(squareId === selectedSquare) ? {backgroundColor:"#87CEFA"} : null}>
                    {value===0 ? null : value}
            </div>
    );
}
export default Square;