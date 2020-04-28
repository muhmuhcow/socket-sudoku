import React, { useState, useEffect } from 'react';
import './project.css';

const Option = ({ value, setCurrentPuzzle, selectedSquare, data }) => {

    var handleClick = e => {
        var colNum = selectedSquare % 10;
        var rowNum = (selectedSquare - colNum) / 10;
        var newBoardData = data.slice();
        newBoardData[rowNum-1][colNum-1] =  value;
        setCurrentPuzzle(newBoardData);
    }

    return (
            <button onClick={handleClick}>
                    {value===0 ? null : value}
            </button>
    );
}
export default Option;