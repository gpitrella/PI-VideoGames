import axios from 'axios';
import { 
    GET_ALL_GAMES, 
    GET_GAME_DETAIL, 
    CREATE_GAME, 
    CLEAR_GAME_DETAIL, 
    GET_ALL_GENRES,
    SEARCH_GAMES,
    ORDER_BY_NAME,
    FILTER_BY_GENRE,
    CLEAR_FILTER_GAME,
    FILTER_GAMES_DB_API,
    ORDER_BY_STAR } from "./actiontype";

// Get AllGames - API and DB
export function getAllGames(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogame`)
                    .then(games => dispatch({ type: GET_ALL_GAMES, payload: games.data}))
                    .catch(error => console.log(error))
    }
};

// Search Games - API and DB
export function searchGames(name, rating, genre){
    return function(dispatch){
        return axios.get('http://localhost:3001/videogame?name=' + name + '&rating=' + rating + '&genre=' + genre)
                        .then(games => {
                            console.log('PRIMERO: TENGO LA DATA')
                            dispatch({ type: SEARCH_GAMES, payload: games.data})
                        })
                        
                        .catch(error => console.log(error))
    }
};

// OTRA FORMA DE HACERLO CON ASYNC - AWAIT
// export function searchGames(nameGame, genre){
//     return async function(dispatch){
//         var json = await axios.get('http://localhost:3001/videogame?name=' + nameGame + '&order=' + genre)
//     return dispatch({ type: SEARCH_GAMES, payload: json.data});                       
//     };
// }

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

// Filter Games Origen DB or API
export function filterGamesDbApi(payload){
    return {
        type: FILTER_GAMES_DB_API, 
        payload: payload       
    }
};

// Order by Name
export function orderByName(payload){
    console.log(payload)
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
}

// Filter by Genre
export function filterByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload: payload
    }
};

// Clear filterGames
export function clearFilterGames(){
    return {
        type: CLEAR_FILTER_GAME,        
    }
};

// Order by Star:
export function orderByStar(payload){
    return {
        type: ORDER_BY_STAR,
        payload: payload
    }
}