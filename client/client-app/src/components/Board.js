import React, { useState, useEffect } from 'react';
import Row from "./Row";

const Board = ({ data, selectSquare, setSquareValue, selectedSquare }) => {

    const buttonArray = [1,2,3,4,5,6,7,8,9];
    var rowNumber = 0;

    return (
        <div>
            <h1> Board </h1>
                 {//for each row   
                    Array.prototype.map.call(data, row => {
                        rowNumber=rowNumber+1;
                        return <Row selectSquare={selectSquare} data={row} key={rowNumber} rowNum={rowNumber}/>
                    })
                }

                {selectedSquare ? buttonArray.map( buttonValue => {
                    return(
                        <button key={buttonValue} onClick={setSquareValue}>
                            {buttonValue}
                        </button>
                    );
                }) : null}
        </div>
    );
}
export default Board;