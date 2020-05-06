import React from 'react';
import './project.css';
import HeartIcon from 'react-ionicons/lib/MdHeart'

const Player = ({ title, playerName }) => {

    return (
        <div style={{display:'flex',flexDirection:'column'}} >
            <div className="Player">
                    <div> {playerName} </div>
            </div>            
            <div style={{display:'flex',padding:'0px'}}> 
                {/* <HeartIcon color='#FF69B4'/> 
                <HeartIcon color='#FF69B4'/> 
                <HeartIcon color='#FF69B4'/>  */}
                <div 
                        className="PlayerIcon" 
                        style={{background:(title==="Player 1") ? '#87CEFA':'#98FB98',
                        }}
                ></div>
                <div 
                        className="PlayerIcon" 
                        style={{background:(title==="Player 1") ? '#87CEFA':'#98FB98',
                        }}
                ></div>
                <div 
                        className="PlayerIcon" 
                        style={{background:(title==="Player 1") ? '#87CEFA':'#98FB98',
                        }}
                ></div>
            </div>
        </div>
    );
}
export default Player;