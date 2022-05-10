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
    ORDER_BY_STAR} from "../actions/actiontype";

const initialState = {
    allGames: [],
    filterGames: [],
    gameDetail: {},
    allGenres: []
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
                filterGames: [],
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
        case FILTER_BY_GENRE:
            return {
                ...state,
                filterByGenre: action.payload
            }
        case ORDER_BY_NAME:
            switch(action.payload){
                case 'NONE': 
                    return {
                        ...state,
                    }
                case 'ASC': 
                    return {
                        ...state,
                        filterGames: state.allGames.sort((a, b) => {
                                            const nameA = a.name.toLowerCase();
                                            const nameB = b.name.toLowerCase();
                                            if(nameA < nameB) {
                                                return -1;
                                            }
                                            if(nameA > nameB) {
                                                return 1;
                                            }
                                            return 0; 
                                        })                                
                    }
                case 'DEC': 
                    return {
                        ...state,
                        filterGames: state.allGames.sort((a, b) => {
                                            const nameA = a.name.toLowerCase();
                                            const nameB = b.name.toLowerCase();
                                            if(nameA < nameB) {
                                                return 1;
                                            }
                                            if(nameA > nameB) {
                                                return -1;
                                            }
                                            return 0; 
                                        })                                
                    }
                default:
                    return state;    

            } 
        case CLEAR_FILTER_GAME:
            return {
                ...state,
                filterGames: []
            }
        case FILTER_GAMES_DB_API:
            switch(action.payload){
                case 'ALL': 
                    return {
                        ...state,
                    }
                case 'DB': 
                    return {
                        ...state,
                        filterGames: state.filterGames.length === 0
                                        ? state.allGames.filter((game) => typeof(game.id) === 'string' )
                                        : state.filterGames.filter((game) => typeof(game.id) === 'string' )
                    }
                case 'API':
                    return {
                        ...state,
                        filterGames: state.filterGames.length === 0
                                        ? state.allGames.filter((game) => typeof(game.id) === 'number' )
                                        : state.filterGames.filter((game) => typeof(game.id) === 'number' )
                    }
                default:
                    return state;                   

            }
        case ORDER_BY_STAR:
            switch(action.payload){
                case 'NONE': 
                    return {
                        ...state,
                    }
                case 'WORST': 
                    return {
                        ...state,
                        filterGames: state.filterGames.length === 0
                                        ? state.allGames.sort((a, b) => {
                                            if(a.rating < b.rating) {
                                                return -1;
                                            }
                                            if(a.rating > b.rating) {
                                                return 1;
                                            }
                                            return 0; 
                                        })
                                        : state.filterGames.sort((a, b) => {
                                            if(a.rating < b.rating) {
                                                return -1;
                                            }
                                            if(a.rating > b.rating) {
                                                return 1;
                                            }
                                            return 0; 
                                        })                             
                    }
                case 'BEST': 
                    return {
                        ...state,
                        filterGames: state.filterGames.length === 0
                            ? state.allGames.sort((a, b) => {
                                if(a.rating < b.rating) {
                                    return 1;
                                }
                                if(a.rating > b.rating) {
                                    return -1;
                                }
                                return 0; 
                            })
                            : state.filterGames.sort((a, b) => {
                                if(a.rating < b.rating) {
                                    return 1;
                                }
                                if(a.rating > b.rating) {
                                    return -1;
                                }
                                return 0; 
                            })                             
    }
                default:
                    return state;    
    
                } 

        default:
            return state;
    };
};

export default rootReducer;