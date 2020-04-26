import React, { useState, useEffect } from 'react';
import Row from "./Row";

const Board = ({ data }) => {

    console.log(data);
    var rowNum = 0;

    return (
        <div>
            <h1> Board </h1>
                 {//for each row      
                    Array.prototype.map.call(data, row => {
                        rowNum=rowNum+1;
                        return <Row data={row} key={rowNum}/>
                    })
                }
        </div>
    );

}
export default Board;