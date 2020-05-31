import React from 'react';
import './project.css';
import Img from 'react-image';
const axios = require('axios').default;
const ENDPOINT = 'http://localhost:5000';

const ResetButton = ({  
                    setCurrentPuzzle,
                    chat     
                }) => {

    var handleClick = e => { 
        var getPuzzle = async () => {
            const response = await axios.get(`${ENDPOINT}/getPuzzle`, {
                params: {
                  difficulty: 'easy'
                }
              }); 
            setCurrentPuzzle(response.data[0].data);
            chat.emit('puzzle',({data:response.data[0].data}), () => {      
            });
        }   
        getPuzzle(); 

    }
    return (
                <div className="Reset" onClick={handleClick}
                >
                    <Img src={require('./../assets/icons8-reset-64.png')}/>
                </div>
    );
}
export default ResetButton;