import React, { useState } from 'react';
import './project.css';

const Square = ({ rowNum, colNum, value, setSelectedSquare }) => {

    const [rowNumber] = useState(rowNum);
    const [colNumber] = useState(colNum);
    
    var handleClick = e => {
        var squareId = rowNumber*10 + colNumber;
        setSelectedSquare(squareId);
    }

    return (
            <div className='Square' onClick={handleClick}>
                    {value===0 ? null : value}
            </div>
    );
}
export default Square;