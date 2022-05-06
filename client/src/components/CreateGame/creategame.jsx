import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createGame, getAllGenres } from '../../redux/actions';
import './CreateGame.css'
import GameDetail from '../GameDetail/GameDetail';

export function CreateGame(props) {
    const [ game, setGame ] = useState({
        name: null,
        description: null,
        released: null,
        image: null,
        rating: 0,
        platforms: [],
        genres: []
    });
    const [ dataErrors, setDataErrors] = useState({});
    const [ created, setCreated ] = useState({game: false})
    let errors = {};
    

    // Name Control
    function handleChangeName(e){
        e.preventDefault();
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
    };

    // Description Control
    function handleChangeDescription(e) {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
    };

     // Image Control
     function handleChangeImage(e) {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
    };

    // Date Released Control
       function handleChangeReleased(e) {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
            
    };

    // Rating Control
    function handleChangeRating(e) {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
    };

    // Platforms Control
    function handleChangePlatforms(e) {
       
        const currentPlatforms = game.platforms.includes(e.target.value)
        console.log(currentPlatforms)
        if(!currentPlatforms){
            setGame({
                ...game,
                platforms: [...game.platforms, e.target.value ]
            })
        }
        
    };

    // Clear Platfrom
    function clearPlatform(e){
        const editPlatforms = game.platforms.filter((p) => p !== e.target.value)
        setGame({
            ...game,
            platforms: editPlatforms
        })
    };

    // Genre Control
     function handleChangeGenre(e) {
        const currentGenre = game.genres.includes(e.target.value)
        if(!currentGenre){
            setGame({
                ...game,
                [e.target.name]: [...game.genres, e.target.value ]
            })
        }
    };

     // Clear Genre
     function clearGenre(e){
        const editGenres = game.genres.filter((g) => g !== e.target.value)
        setGame({
            ...game,
            platforms: editGenres
        })
    };

      
    // Function Validator
    function validate (game){
        const gamesErrors = {}
        if(game.name === '' || game.name === null){
            gamesErrors.name = 'Is necessary include a name.'
        }
        if(game.description === '' || game.description === null){
            gamesErrors.description = 'Is necessary include the description.'
        }
        // if(game.image === '' || game.image === null){
        //     gamesErrors.image = 'Is necessary include an image.'
        // }
        if(!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/.test(game.released)){
            gamesErrors.released = 'Invalid date form.'
        }
        if(![1, 2, 3, 4, 5].includes(parseInt(game.rating))){
            gamesErrors.rating = 'Invalid rating, this will be a number from 1 to 5'
        }
        if(game.platforms.length === 0){
            gamesErrors.platforms = 'Is necessary include a platforms.'
        }
        if(game.genres.length === 0){
            gamesErrors.genres = 'Is necessary include a genre.'
        }
        const isEmptyErrors = isEmptyObject(gamesErrors)
        if(!isEmptyErrors){
            gamesErrors.withErrors = true;
        }
        errors = gamesErrors;
    }
    
    // Validate empty errors
      function isEmptyObject(obj) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                return false;
            }
        }     
        return true;
    };

    // Submit Game 
    function handleOnSubmit(e){
        e.preventDefault();
        validate(game)
        const isEmptyErrors = isEmptyObject(errors)
        if(isEmptyErrors){
            props.createGame(game)          
            setCreated({ game: true})
            // alert('Game Created')
        } else {
            setDataErrors(errors)
        }
    }
    if(!created.game){
        return (
            <div className='createGame'>
            <div className='createGameHtml'>
            <div className='createGameTitle' >
            <h2 className='title'>Create Game</h2>
            <form onSubmit={e => handleOnSubmit(e)}> 
                <label className='labelInput'> Game' Name: </label>{dataErrors.name && (<span className='danger'>{dataErrors.name}</span>)}
                    <input className='inputCreate' type='text' name='name' onChange={(e) => handleChangeName(e)}></input>                   
                
                <br></br>
                <label className='labelInput'> Description: </label>{dataErrors.description && (<span className='danger'>{dataErrors.description}</span>)}
                    <input className={errors.description ? 'danger' : 'inputDescription'} type='text' name='description' onChange={(e) => handleChangeDescription(e)}></input>
                
                <br></br>
                <label className='labelInput'> Image: </label> {dataErrors.image && (<span className='danger'>{dataErrors.image}</span>)}
                    <input className={errors.image ? 'danger' : 'inputCreate'} type='text' name='image' onChange={(e) => handleChangeImage(e)}></input>
                <div className='labelmiddle'>
                    <div className='labelmiddleReleased'>
                        <label className='labelInput'> Date Released: </label> {dataErrors.released && (<span className='danger'>{dataErrors.released}</span>)}
                        <br></br>
                            <input className='inputRealased' type='text' placeholder='MM/DD/YY' name='released' onChange={(e) => handleChangeReleased(e)}></input>

                    </div>
                    <div>
                    <label className='labelInput'> Rating: </label>{dataErrors.rating && (<span className='danger'>{dataErrors.rating}</span>)}
                    <br></br>
                        <input className='inputRealased' type='number' name='rating' onChange={(e) => handleChangeRating(e)}></input>
                    </div>
                </div>
                <br></br>
                <label className='labelInput'> Platforms: </label> {dataErrors.platforms && (<span className='danger'>{dataErrors.platforms}</span>)}
                        <select className='labelInput' type='text'name='platforms' onChange={(e) => handleChangePlatforms(e)}>
                            <option value="Xbox One">Xbox One</option>
                            <option value="Xbox Series S/X">Xbox Series S/X</option>
                            <option value="Xbox 360">Xbox 360</option>
                            <option value="PlayStation 3">PlayStation 3</option>
                            <option value="PlayStation 4">PlayStation 4</option>
                            <option value="PlayStation 5">PlayStation 5</option>
                            <option value="PC">PC</option>
                            <option value="Nintendo Switch">Nintendo Switch</option>
                            <option value="Linux">Linux</option>
                            <option value="macOS">macOS</option>
                            <option value="iOS">iOS</option>
                            <option value="Android">Android</option>
                            <option value="Nintendo 3DS">Nintendo 3DS</option>
                            <option value="Nintendo DS">Nintendo DS</option>
                            <option value="Nintendo DSi">Nintendo DSi</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PlayStation 3">PlayStation 3</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="PS Vita">PS Vita</option>
                            <option value="PSP">PSP</option>
                            <option value="Wii U">Wii U</option>
                            <option value="Wii">Wii</option>
                            <option value="GameCube">GameCube</option>
                            <option value="Nintendo 64">Nintendo 64</option>
                            <option value="Game Boy Advance">Game Boy Advance</option>
                            <option value="Game Boy Color">Game Boy Color</option>
                            <option value="Game Boy">Game Boy</option>
                            <option value="SNES">SNES</option>
                            <option value="NES">NES</option>
                            <option value="Classic Macintosh">Classic Macintosh</option>
                            <option value="Apple II">Apple II</option>
                            <option value="Commodore / Amiga">Commodore / Amiga</option>                     
                        </select>
                        <ul>
                            {game.platforms && game.platforms.map((element)=>(
                                
                                    <button key={game.platforms.indexOf(element)} value={element} onClick={(e) => clearPlatform(e)}>{element} X </button>
                                
                            ))}
                        </ul>                       
                <br></br>
                <label className='labelInput'> Genres: </label> {dataErrors.genre && (<span className='danger'>{dataErrors.genre}</span>)}             
                <br></br>
                    <select className='labelInput' type='text'name='genres' onChange={(e) => handleChangeGenre(e)}>
                        {props.allGenres && props.allGenres.map((g)=>(
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}                     
                    </select>
                        <ul>
                            {game.genres && game.genres.map((element)=>(
                                
                                    <button key={game.genres.indexOf(element) + Math.floor(Math.random() * 10000)/3*4} value={element} onClick={(e) => clearGenre(e)}>{element} X </button>
                                
                            ))}
                        </ul>
                        
                <br></br>
                <div>
                <button type='submit'>Create Game</button>{dataErrors.withErrors && (<span className='danger'>Please check all Errors, before to submit.</span>)}
                        {created.game && (<p>Game created successfully, Greate.!!!</p>)}
                </div>
            </form>
            </div>
        </div>
        </div>
        )
    } else {
        return (
            <div>
                <GameDetail game={game}/>
            </div>
        )
    }
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