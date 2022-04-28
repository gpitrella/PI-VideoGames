import axios from 'axios';
import { 
    GET_ALL_GAMES, 
    GET_GAME_DETAIL, 
    CREATE_GAME, 
    CLEAR_GAME_DETAIL, 
    GET_ALL_GENRES,
    SEARCH_GAMES,
    FILTER_GAMES } from "./actiontype";

// Get AllGames - API and DB
export function getAllGames(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogame`)
                    .then(games => dispatch({ type: GET_ALL_GAMES, payload: games.data}))
                    .catch(error => console.log(error))
    }
};

// Search Games - API and DB
export function searchGames(nameGame){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogame?name=${nameGame}`)
                    .then(games => dispatch({ type: SEARCH_GAMES, payload: games.data}))
                    .catch(error => console.log(error))
    }
};


// Get Game Detail - API and DB
export function getGameDetail(idVideogame){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogame/${idVideogame}`)
                    .then(game => dispatch(
                        game.data.name
                            ?  { type: GET_GAME_DETAIL, payload: game.data} // DB
                            :  { type: GET_GAME_DETAIL, payload: game.data[0]} // API
                        ))             
                        
                    .catch(error => console.log(error))
    }
};


// Create Game
export function createGame(payload){
    return function(dispatch){
        return axios.post(`http://localhost:3001/videogame`, payload)
        .then(game => dispatch({ type: CREATE_GAME, payload: game.data}))
        .catch(error => console.log(error))
    }
};

// Clear Game Detail
export function clearGameDetail(){
    return {
      type: CLEAR_GAME_DETAIL
    }
}

// Get allGenres
export function getAllGenres(){
    return async function(dispatch){
        return await axios.get(`http://localhost:3001/genres`)
                    .then(genres => dispatch({ type: GET_ALL_GENRES, payload: genres.data})) 
                    .catch(error => console.log(error))
    }
};

// Filter Games
export function filterGames(payload){
    return {
        type: FILTER_GAMES,
        payload: payload
    }
}
