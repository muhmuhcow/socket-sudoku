import React from 'react';
import Row from "./Row";
import Option from "./Option";
import NotesButton from "./NotesButton";
import './project.css';

const Board = ({ data, 
                 setSelectedSquare, 
                 selectedSquare, 
                 setCurrentPuzzle, 
                 chat, 
                 otherSelectedSquare,
                 setNotesMode,
                 setNotes,
                 notesMode,
                 notes,
                 errorStack,
                 initialPuzzle 
                }) => {

    const buttonArray = [1,2,3,4,5,6,7,8,9];
    var rowNumber = 0;                 
    return (
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',textAlign:'center'}}>
            {/* <h1> Board </h1> */}
                <div className='Board'>
                    {//for each row  
                        data ? 
                        Array.prototype.map.call(data, row => {
                            rowNumber=rowNumber+1;
                            return (<Row 
                                    setSelectedSquare={setSelectedSquare} 
                                    rowData={row} key={rowNumber} 
                                    rowNum={rowNumber}
                                    selectedSquare={selectedSquare}
                                    chat={chat}
                                    otherSelectedSquare={otherSelectedSquare}
                                    boardData={data}
                                    notes={notes}
                                    errorStack={errorStack}
                                    initialPuzzle={initialPuzzle}
                                    />)
                        }) : null
                    }
                </div>
                <div className="OptionsContainer">
                    {buttonArray.map( buttonValue => {
                        return(
                            <Option 
                                key={buttonValue} 
                                value={buttonValue} 
                                data={data} 
                                setCurrentPuzzle={setCurrentPuzzle}
                                selectedSquare={selectedSquare}
                                chat={chat}
                                notesMode={notesMode}
                                setNotes={setNotes}
                                notes={notes}
                            >
                                {buttonValue}
                            </Option>
                        );
                    })}
                </div>
                <div className="MoreOptions">
                    <Option 
                        key={0} 
                        value={0}
                        data={data} 
                        setCurrentPuzzle={setCurrentPuzzle}
                        selectedSquare={selectedSquare}
                        chat={chat}
                        notesMode={notesMode}
                        setNotes={setNotes}
                    >
                        {0}
                    </Option>
                    <NotesButton 
                        key={99} 
                        setNotesMode={setNotesMode}
                        notesMode={notesMode}
                    >
                        {0}
                    </NotesButton>
                </div>
        </div>
    );
}
export default Board;