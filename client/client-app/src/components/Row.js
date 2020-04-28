import React, { useState, useEffect } from 'react';
import Square from './Square';

const Row = ({ data, rowNum, setSelectedSquare }) => {

    var columnNumber=0;
    return (
        <div style={{display:'flex'}}>
                 {
                    Array.prototype.map.call(data, square => {
                        columnNumber = columnNumber+1;
                        return <Square setSelectedSquare={setSelectedSquare} key={rowNum*10+columnNumber} rowNum={rowNum} colNum={columnNumber} value={square} />; 
                    })
                }
        </div>
    );
}
export default Row;