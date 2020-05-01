import React from 'react';
import Square from './Square';

const Row = ({ data, rowNum, setSelectedSquare, selectedSquare }) => {

    var columnNumber=0;
    return (
        <div className="Row" >
                 {
                    Array.prototype.map.call(data, square => {
                        columnNumber = columnNumber+1;
                        return <Square 
                                    setSelectedSquare={setSelectedSquare} 
                                    key={rowNum*10+columnNumber} 
                                    rowNum={rowNum} 
                                    colNum={columnNumber} 
                                    value={square} 
                                    selectedSquare={selectedSquare}
                                />; 
                    })
                }
        </div>
    );
}
export default Row;