// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


import * as data from '../db.json';
import App from '../src/App';
import NavBar from '../src/components/NavBar/NavBar';
import axios from 'axios';
import nock from 'nock';
import nodeFetch from 'node-fetch';
axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

describe('<App />', () => {
        global.fetch = nodeFetch;

        let store;
        const routes = ['/', '/videogame', '/genres', '/videogame/creategame'];
        const mockStore = configureStore([thunk]);
        const state = {
            allGames: data,
            filterGames: [],
            gameDetail: data[0],
            allGenres: []
        };


    beforeEach(() => {
        store = mockStore(state)
    });

    const componentToUse = (route) => {
        return (
          <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
              <App />
            </MemoryRouter>
          </Provider>
        );
      };

    describe("El componente NavBar debe ser renderizado en todas las rutas /videogame", () => {
        it('Debería ser renderizado en la rutas "/videogame"', () => {
        const app = mount(componentToUse(routes[1]));
        expect(app.find(NavBar)).toHaveLength(1);
        });

        it('Debería ser renderizado en la ruta "/videogame/creategame"', () => {
        const app = mount(componentToUse(routes[3]));
        expect(app.find(Nav)).toHaveLength(1);
        });
    });

});