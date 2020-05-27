import React,{useState} from 'react';
import './project.css';
import Img from 'react-image';

const ResetButton = ({       
                }) => {

    var handleClick = e => { 
        //reset current puzzle to initial puzzle
        

    }
    return (
                <div className="Reset" onClick={handleClick}
                >
                    <Img src={require('./../assets/icons8-reset-64.png')}/>
                </div>
    );
}
export default ResetButton;