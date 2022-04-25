import axios from 'axios';
export const GET_ALL_GAMES = 'GET_ALL_PRODUCTS';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const CREATE_GAME = 'CREATE_GAME';


// Get AllGames - API and DB
export const getAllGames = () => {
    return axios.get(`http://localhost:3001/videogame`)
                .then(games => dispatchEvent({ type: GET_ALL_GAMES, payload: games}))
                .catch(error => console.log(error))
};


// Get Game Detail - API and DB
export const getGameDetail = (idVideogame) => {
    return axios.get(`http://localhost:3001/videogame/${idVideogame}`)
                .then(game => dispatchEvent({ type: GET_GAME_DETAIL, payload: game}))
                .catch(error => console.log(error))
};


// Create Game
export const createGame = (payload) => {
    return {
        type: CREATE_GAME,
        payload,
    }
};