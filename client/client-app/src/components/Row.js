import React from 'react';
import Square from './Square';

const Row = ({ rowData, rowNum, setSelectedSquare, selectedSquare, chat, otherSelectedSquare, boardData }) => {

    var columnNumber=0;
    return (
        <div className="Row" >
                 {
                    Array.prototype.map.call(rowData, square => {
                        columnNumber = columnNumber+1;
                        return <Square 
                                    //data={data}
                                    setSelectedSquare={setSelectedSquare} 
                                    key={rowNum*10+columnNumber} 
                                    rowNum={rowNum} 
                                    colNum={columnNumber} 
                                    value={square} 
                                    selectedSquare={selectedSquare}
                                    chat={chat}
                                    otherSelectedSquare={otherSelectedSquare}
                                    boardData={boardData}
                                />; 
                    })
                }
        </div>
    );
}
export default Row;