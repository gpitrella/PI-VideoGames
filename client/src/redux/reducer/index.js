import { GET_ALL_GAMES, GET_GAME_DETAIL, CREATE_GAME } from "../actions/index.js";

const initialState = {
    allGames: [],
    gameDetail: []
}

const rootReducer = (state = initialState, action) => {
    switch(action){
        case GET_ALL_GAMES:
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
    };
};

export default rootReducer;