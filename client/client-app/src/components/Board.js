import React, { useState, useEffect } from 'react';
import Row from "./Row";

const Board = ({ data }) => {

    console.log(data);
    var rowNumber = 0;

    return (
        <div>
            <h1> Board </h1>
                 {//for each row      
                    Array.prototype.map.call(data, row => {
                        rowNumber=rowNumber+1;
                        return <Row data={row} key={rowNumber} rowNum={rowNumber}/>
                    })
                }
        </div>
    );
}
export default Board;