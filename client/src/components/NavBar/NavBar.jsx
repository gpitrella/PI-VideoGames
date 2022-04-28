import React from 'react';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../redux/actions';
import { connect } from 'react-redux';
import SearchGame from '../SearchGame/SearchGame'
import './NavBar.css'

export function NavBar(props) {
    
    React.useEffect(() =>{
        if(props.allGames.length === 0) props.getAllGames()
    })
    
    return (
        <header className='navbar'>
            <div>
                <Link to="/videogame">Home</Link>
            </div>
            <div>
                <SearchGame /> 
            </div>
            <div>
                <Link to="/videogame/creategame">Create Game</Link>
            </div>
        </header>
    )
};

function mapStateToProps(state){
    return {
        allGames: state.allGames
    }
};

function mapDispatchToProps(dispatch){
    return {
        getAllGames: () => dispatch(getAllGames())
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(NavBar)

