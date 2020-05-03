import React from 'react';
import Row from "./Row";
import Option from "./Option";

const Board = ({ data, setSelectedSquare, selectedSquare, setCurrentPuzzle, chat, otherSelectedSquare }) => {

    const buttonArray = [1,2,3,4,5,6,7,8,9];
    var rowNumber = 0;

    return (
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',textAlign:'center'}}>
            <h1> Board </h1>
                <div className='Board'>
                    {//for each row   
                        Array.prototype.map.call(data, row => {
                            rowNumber=rowNumber+1;
                            return (<Row 
                                    setSelectedSquare={setSelectedSquare} 
                                    data={row} key={rowNumber} 
                                    rowNum={rowNumber}
                                    selectedSquare={selectedSquare}
                                    chat={chat}
                                    otherSelectedSquare={otherSelectedSquare}
                                    />)
                        })
                    }
                </div>
                {selectedSquare ? buttonArray.map( buttonValue => {
                    return(
                        <Option 
                            key={buttonValue} 
                            value={buttonValue} 
                            data={data} 
                            setCurrentPuzzle={setCurrentPuzzle}
                            selectedSquare={selectedSquare}
                            chat={chat}
                        >
                            {buttonValue}
                        </Option>
                    );
                }) : null}
        </div>
    );
}
export default Board;