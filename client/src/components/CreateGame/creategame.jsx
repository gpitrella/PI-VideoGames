import React from 'react';
import { connect } from 'react-redux';
import { createGame, getAllGenres } from '../../redux/actions';
import './CreateGame.css'

export function CreateGame(props) {
    
    React.useEffect(() =>{  
        if(props.allGenres.length === 0) props.getAllGenres();        
    }, [props]);
    
      

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
                   Description: <input type='text' name='description' onChange={(e) => handleChange(e)}></input>
               </label>
               <label>
                    Date Released: <input type='date' name='released' onChange={(e) => handleChange(e)}></input>
               </label>
               <label>
                    Rating: <input type='number' name='rating' onChange={(e) => handleChange(e)}></input>
               </label>
               <label>
                    Platforms: <input type='text' name='platforms' onChange={(e) => handleChange(e)}></input>
               </label>
               <label> Genres: </label>
               
                     {/* <input type='text' name='genres' onChange={handleChange}></input> */}
                    <select type='text'name='genres' onChange={(e) => handleChange(e)} multiple={true}>
                    
                        {props.allGenres && props.allGenres.map((g)=>(
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}                     
                                           
                    </select>
               
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

function mapStatetoProps(state){
    return {
        allGenres: state.allGenres
    }
}

export default connect( mapStatetoProps, mapDispatchToProps)(CreateGame)