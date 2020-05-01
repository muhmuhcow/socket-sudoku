import React, { useEffect } from 'react';
import './project.css';

const Option = ({ value, setCurrentPuzzle, selectedSquare, data, chat }) => {

    var handleClick = e => { 
        var newBoardData = data.slice();
        var colNum = selectedSquare % 10;
        var rowNum = (selectedSquare - colNum) / 10;
        newBoardData[rowNum-1][colNum-1] =  value;
        setCurrentPuzzle(newBoardData);
        chat.emit('puzzle',({data:newBoardData}), () => {      
        }); 
    }

    return (
            <button onClick={handleClick}>
                    {value===0 ? null : value}
            </button>
    );
}
export default Option;