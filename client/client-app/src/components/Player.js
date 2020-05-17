import React from 'react';
import './project.css';

const Player = ({ title, playerName }) => {

    return (
        <div style={{display:'flex',flexDirection:'column'}} >
            <div className="Player">
                    <div> {playerName} </div>
                    <div 
                        className="PlayerIcon" 
                        style={{background:(title==="Player 1") ? '#87CEFA':'#98FB98',
                        }}
                    ></div>
            </div>            
            <div style={{display:'flex',padding:'0px'}}> 
            </div>
        </div>
    );
}
export default Player;