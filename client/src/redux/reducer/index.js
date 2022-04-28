import { 
    GET_ALL_GAMES, 
    GET_GAME_DETAIL, 
    CREATE_GAME, 
    CLEAR_GAME_DETAIL, 
    GET_ALL_GENRES,
    SEARCH_GAMES,
    FILTER_GAMES } from "../actions/actiontype";

const initialState = {
    allGames: [],
    filterGames: [],
    gameDetail: {},
    allGenres: [],
    dataFilter: {
        filterStar: 0,
        filterAz: ''
    }
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload
            }
        case SEARCH_GAMES:
            return {
                ...state,
                allGames: action.payload
            }

        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.payload
            }

        case CREATE_GAME:
            return {
                ...state,
                allGames: state.allGames.concat(action.payload)
            }
        case CLEAR_GAME_DETAIL:
            return {
                ...state,
                gameDetail: {}
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                allGenres: action.payload              
            }
            
        case FILTER_GAMES:
            return {
                ...state,
                filterGames: action.payload.rating 
                                ? state.allGames.filter(game => game.rating >= parseInt(action.payload.rating) && game.id > 10)
                                : []
            }
        default:
            return state;
    };
};

export default rootReducer;