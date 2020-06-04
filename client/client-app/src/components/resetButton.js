import React from 'react';
import './project.css';
import Img from 'react-image';

const ResetButton = ({  
                    setCurrentPuzzle,
                    chat,
                    initialPuzzle     
                }) => {

    var handleClick = e => { 
        var actualInitialPuzzle = initialPuzzle;
        setCurrentPuzzle(actualInitialPuzzle);
        chat.emit('puzzle',({data:actualInitialPuzzle}), () => {      
        });

    }
    return (
                <div className="Reset" onClick={handleClick}
                >
                    <Img src={require('./../assets/icons8-reset-64.png')}/>
                </div>
    );
}
export default ResetButton;