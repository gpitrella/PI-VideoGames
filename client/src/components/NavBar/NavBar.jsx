import React from 'react';
import { Link } from 'react-router-dom';
import { getAllGames, getAllGenres } from '../../redux/actions';
import { connect } from 'react-redux';
import SearchGame from '../SearchGame/SearchGame'
import './NavBar.css'
import imageLogo from './img/controllerIconGame.png'

export function NavBar(props) {
    
    React.useEffect(() =>{
            if(props.allGenres.length === 0) {
            props.getAllGenres();
        }
    }, [props.allGenres])
    
    return (
        <header className='header'>
            <div className='navbar'>
                <div className='navBarLogo'>
                    <Link to="/videogame"><img className="imageLogo" src={imageLogo} alt='game Logo' /></Link>
                </div>
                <div>
                    <Link className="createGameNavBar"to="/videogame/creategame">Create Game</Link>
                </div>
            </div>
            <div>
                <SearchGame /> 
            </div>
        </header>
    )
};

function mapStateToProps(state){
    return {
        allGames: state.allGames,
        allGenres: state.allGenres
    }
};

function mapDispatchToProps(dispatch){
    return {
        getAllGames: () => dispatch(getAllGames()),
        getAllGenres: () => dispatch(getAllGenres())
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(NavBar)