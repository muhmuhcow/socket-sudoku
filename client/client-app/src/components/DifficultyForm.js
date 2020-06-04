import React,{useState} from 'react';
import './project.css';

const axios = require('axios').default;

const DifficultyForm = ({    
                    setCurrentPuzzle,
                    setInitialPuzzle,
                    chat   
                }) => {
    
    const [difficulty,setDifficulty] = useState('');                

    var handleChange = e => { 
        setDifficulty(e.target.value);
    }

    var handleSubmit = (e) => {
        e.preventDefault();
        var getPuzzle = async () => {
            
              var actualDifficulty = difficulty;
              const puzzleResponse = await axios.get('https://sugoku.herokuapp.com/board', {
                    params: {
                    difficulty: actualDifficulty
                    }   
                });
            setInitialPuzzle(puzzleResponse.data.board); 
            setCurrentPuzzle(puzzleResponse.data.board);
            chat.emit('puzzle',({data:puzzleResponse.data.board}), () => {      
            });
            chat.emit('resetInitial',({data:puzzleResponse.data.board}), () => {      
            });
        }   
        getPuzzle(); 
        // var changePuzzle = async () => {
        // var actualDifficulty = difficulty ? difficulty : 'easy';
        // var payload = {difficulty:actualDifficulty};
        // console.log(payload);
        //     const response = await axios.post(`${ENDPOINT}/changePuzzle`,
        //             payload
        //         ,{
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //       })
        //       .then(function (response) {
        //         var getPuzzle = async () => {
        //             const response = await axios.get(`${ENDPOINT}/getPuzzle`, {
        //                 params: {
        //                   difficulty: 'easy'
        //                 }
        //               });
        //             setInitialPuzzle(response.data[0].initialPuzzle); 
        //             setCurrentPuzzle(response.data[0].currentPuzzle);
        //         }   
        //         getPuzzle(); 
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
            
        // }   
        // changePuzzle(); 
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