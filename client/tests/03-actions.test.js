import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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
    ORDER_BY_STAR } from "../src/redux/actions/actiontype";

import axios from 'axios';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import { getAllGames } from '../src/redux/actions';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Actions', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
        allGames: [],
        filterGames: [],
        gameDetail: {},
        allGenres: []
    });
    global.fetch = nodeFetch
    beforeEach(() => {
        store.clearActions();

        // Se Mockea las request a las api
        const apiMock = nock('http://localhost:3000').persist();

        //"/videogame" => Retorna la propiedad videogame del archivo data.json
        apiMock.get('/videogame').reply(200, games.data);

    });

    afterEach(() => {
        nock.cleanAll();
    });

    describe('getAllGames', () => {
        it('Should do a dispatch with all property type "GET_ALL_GAMES" and the payload should be the result link fetch', async () =>{
            return store
                .dispatch(getAllGames())
                .then(() => {
                    const actions = store.getActions();
                    expect(actions[0].payload).toBe('object');
                    expect(actions[0].toEqual({
                        type: GET_ALL_GAMES,
                        payload: games.data
                    }))
                })
                .catch((err) => {
                    console.error(err);
                    expect(err).toBeUndefined();
                });
        });
    });

});
