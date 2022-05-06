import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import NavBar from './components/NavBar/NavBar';
import LateralNavBar from './components/LateralNavBar/LateralNavBar';
import Home from './components/Home/Home';
import GameDetail from './components/GameDetail/GameDetail'
import CreateGame from './components/CreateGame/CreateGame';
import './App.css';

function App() {
  return (
    <React.Fragment>
        <div className="App">          
        </div>
        <Route path="/" exact component={Welcome}/>
        <Route path="/videogame" component={NavBar} />
        {/* <Route path="/videogame" component={LateralNavBar} /> */}
        <Route path="/videogame" exact component={Home} />
        <Switch>
          <Route path="/videogame/creategame" component={CreateGame}/>
          <Route path="/videogame/:idVideogame" component={GameDetail} />
        </Switch>
          
    </React.Fragment>
  );
}

export default App;
