import React,{useState} from 'react';
import './project.css';
import Img from 'react-image';

const axios = require('axios').default;
const qs = require('querystring');
const ENDPOINT = 'http://localhost:5000';

const DifficultyForm = ({       
                }) => {
    
    const [difficulty,setDifficulty] = useState('');                

    var handleChange = e => { 
        setDifficulty(e.target.value);
    }

    var handleSubmit = (e) => {
        e.preventDefault();
        var getPuzzle = async () => {
        //     // const response = await axios.get(`${ENDPOINT}/getPuzzle`, {
        //     //     params: {
        //     //       difficulty: {difficulty}
        //     //     }
        //     //   });
        var actualDifficulty = difficulty;
        var payload = {difficulty:actualDifficulty};
        console.log(payload);
            const response = await axios.post(`${ENDPOINT}/changePuzzle`,
                    payload
                ,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        //     //setInitialPuzzle(response.data[0].initialPuzzle); 
        //     //setCurrentPuzzle(response.data[0].currentPuzzle);
            
        }   
        getPuzzle(); 
        console.log(difficulty)
        // fetch(`${ENDPOINT}/changePuzzle`, {
        //     method: 'post',
        //     body: difficulty
        // }).then(function(response) {
        //     console.log(response.data);
        // });

      }
   
    return (
            <form onSubmit={handleSubmit}>
            <select value={difficulty} onChange={handleChange}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
            <input type="submit" value="Submit" />
        </form>
    );
}
export default DifficultyForm;