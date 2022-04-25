import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/home';
import CreateGame from './components/CreateGame/creategame';

function App() {
  return (
    <React.Fragment>
      <NavBar  />
        <Route exact path="/" component={Home} />
        <Route path="/creategame" component={CreateGame}/>
        <div className="App">
          <h1>Henry Videogames</h1>
        </div>
    </React.Fragment>
  );
}

export default App;
