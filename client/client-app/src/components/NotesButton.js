import React,{useState} from 'react';
import './project.css';
import Img from 'react-image';

const NotesButton = ({ value, 
                  setCurrentPuzzle, 
                  selectedSquare, 
                  data, 
                  chat 
                }) => {

    const [isPressed,setIsPressed] = useState(false);
    

    var handleClick = e => { 
        //setIsPressed(true);

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
                    {value===0 ? <Img src={require('./../assets/icons8-pencil-24.png')}
                         /> : value}
                </div>
    );
}
export default NotesButton;