import React from 'react';
import { connect } from 'react-redux';
import { createGame, getAllGenres } from '../../redux/actions';
import './CreateGame.css'

export function CreateGame(props) {
    React.useEffect(() =>{   
        props.getAllGenres();
    });

    const [ game, setGame ] = React.useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        platforms: '',
        genres: ''
    });

    function handleChange(e){
        e.preventDefault();
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
    };

    function handleOnSubmit(e){
        console.log(game)
        e.preventDefault();
        props.createGame(game)
        setGame({
            name: '',
            description: '',
            released: '',
            rating: 0,
            platforms: '',
            genres: ''
        })
    }


    return (
        <div>
            <h2>Create Game</h2>
           <form onSubmit={e => handleOnSubmit(e)}> 
               <label>
                   Name: <input type='text' name='name' onChange={handleChange}></input>
               </label>
               <label>
                   Description: <input type='text' name='description' onChange={handleChange}></input>
               </label>
               <label>
                    Date Released: <input type='date' name='released' onChange={handleChange}></input>
               </label>
               <label>
                    Rating: <input type='number' name='rating' onChange={handleChange}></input>
               </label>
               <label>
                    Platforms: <input type='text' name='platforms' onChange={handleChange}></input>
               </label>
               <label>
                    Genres: <input type='text' name='genres' onChange={handleChange}></input>
               </label>
               <div>
                    <button type='submit'>Create Game</button> 
               </div>
           </form>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return {
        createGame: (game) => dispatch(createGame(game)),
        getAllGenres: () => dispatch(getAllGenres())
    }
};

export default connect(null, mapDispatchToProps)(CreateGame)