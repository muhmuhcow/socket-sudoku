import React, { useState, useEffect } from 'react';
import './project.css';

const Square = ({ rowNum, colNum, value, selectSquare }) => {

    const [rowNumber,setRowNumber] = useState(rowNum);
    const [colNumber,setcolNumber] = useState(colNum);
    
    var handleClick = e => {
        var squareId = rowNumber*10+colNumber;
        selectSquare(squareId);
    }

    return (
            <div className='Square' onClick={handleClick}>
                    {value===0 ? null : value}
            </div>
    );
}
export default Square;