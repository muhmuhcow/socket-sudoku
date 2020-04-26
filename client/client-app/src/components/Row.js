import React, { useState, useEffect } from 'react';
import Square from './Square';

const Row = ({ data, rowNum }) => {

    // const [rowNumber,setRowNumber] = useState(key);
    // //setRowNumber(key);
    var columnNumber=0;
    return (
        <div style={{display:'flex'}}>
                 {//for each square in row   
                    Array.prototype.map.call(data, square => {
                        columnNumber = columnNumber+1;
                        return <Square  key={rowNum*10+columnNumber} rowNum={rowNum} colNum={columnNumber} value={square} />; 
                    })
                }
        </div>
    );

}
export default Row;