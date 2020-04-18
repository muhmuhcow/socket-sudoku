import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Join = () => {

    const [name,setName] = useState('');

    return (
        <div>
            <p> Join </p>

            <div>
                <input 
                    placeholder="Name" 
                    className="joinInput" 
                    type="text" 
                    onChange={(event)=>setName(event.target.value)}
                    value={name}
                />
            </div>

            <div>
                <Link 
                to={`/chat?name=${name}`}
                onClick={event=>(!name) ? event.preventDefault() : null}>
                    <button 
                    value="Submit" 
                    className="joinButton" 
                    type="submit">
                        Submit
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Join;