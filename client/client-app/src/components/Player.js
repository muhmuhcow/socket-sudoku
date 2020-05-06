import React from 'react';
import './project.css';

const Player = ({ title, playerName }) => {

    return (
        <div className="Player" >
               <div> {playerName} </div>
               <div className="PlayerIcon" style={{background:(title==="Player 1") ? '#87CEFA':'#98FB98',width:'22px',height:'22px'}}></div>
        </div>
    );
}
export default Player;