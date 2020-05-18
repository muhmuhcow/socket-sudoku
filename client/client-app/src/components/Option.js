import React,{useState} from 'react';
import './project.css';
import Img from 'react-image';

const Option = ({ value, 
                  setCurrentPuzzle, 
                  selectedSquare, 
                  data, 
                  chat,
                  notesMode,
                  setNotes,
                  notes 
                }) => {

    const [isPressed,setIsPressed] = useState(false);
    

    var handleClick = e => { 
        if(!selectedSquare){
            return;
        }
        if(notesMode){
            const notesId = selectedSquare-(((selectedSquare-(selectedSquare%10))/10)+9)-1;
            var newNotes = notes.slice();
            if(notes[notesId].find(notesValue => {return notesValue===value})){
                newNotes[notesId] = newNotes[notesId].filter(noteValue => noteValue !== value);
            }
            else{
                newNotes[notesId].push(value);
            } 
            setNotes(newNotes);
        }
        else{
            var newBoardData = data.slice();
            var colNum = selectedSquare % 10;
            var rowNum = (selectedSquare - colNum) / 10;
            newBoardData[rowNum-1][colNum-1] =  value;
            setCurrentPuzzle(newBoardData);
            chat.emit('puzzle',({data:newBoardData}), () => {      
            }); 
        }
    }

    var toggleButtonPress = e => {
        var newState = !isPressed;
        setIsPressed(newState);
    }

    return (
                <div className="Option" onClick={handleClick}
                    onMouseDown={toggleButtonPress} 
                    onMouseUp={toggleButtonPress}
                    onTouchStart={toggleButtonPress} 
                    onTouchEnd={toggleButtonPress}
                    style={{backgroundColor:isPressed?"grey":"white"}}
                >
                    {value===0 ? <Img src={require('./../assets/icons8-eraser-24.png')}
                         /> : value}
                </div>
    );
}
export default Option;