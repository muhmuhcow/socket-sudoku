import React,{useState} from 'react';
import './project.css';
import Img from 'react-image';

const NotesButton = ({ notesMode,
                       setNotesMode      
                }) => {
    const [isPressed,setIsPressed] = useState(false);
    var handleClick = e => { 
        setNotesMode(!notesMode);

    }
    var toggleButtonPress = e => {
        if (e.type === "mousedown" || e.type==="touchstart") {
        var newState = !isPressed;
        setIsPressed(newState);
        }
    }
    return (
                <div className="Option" onClick={handleClick}
                    onMouseDown={toggleButtonPress} 
                    //onMouseUp={toggleButtonPress}
                    onTouchStart={toggleButtonPress} 
                    //onTouchEnd={toggleButtonPress}
                    style={{backgroundColor:isPressed?"grey":"white"}}
                >
                    <Img src={require('./../assets/icons8-pencil-24.png')}/>
                </div>
    );
}
export default NotesButton;