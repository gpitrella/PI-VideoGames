import React, { useEffect } from 'react';
import './Home.css'
// import { render } from 'react-dom';
import { connect } from 'react-redux';
import { getAllGames, searchGames } from '../../redux/actions';
import GameCard from '../GameCard/GameCard';

export function Home(props) {  
    
        return (
            <div className='home'>
                {
                    // REVISAR PORQUE AL PEDIR DATOS DE API NO APARECE EL CARTEL DE CARGANDO
                typeof(props.allGames) === 'string'
                    ? <h2>{props.allGames}</h2>
                    : props.allGames 
                        ? props.filterGames.length > 0 
                            ? props.filterGames.map(game => (
                                <GameCard 
                                    name = {game.name}
                                    rating = {game.rating}
                                    image = {game.image}
                                    id = {game.id} 
                                    // genres = {game.genres} 
                                    key = {game.id}             
                                />   
                            ))                        
                            : props.allGames.map(game => (
                                <GameCard 
                                    name = {game.name}
                                    rating = {game.rating}
                                    image = {game.image}
                                    id = {game.id} 
                                    // genres = {game.genres} 
                                    key = {game.id}             
                                />   
                            ))
                        : (<h3>Cargando ...</h3>)                 
            }
            </div>
        )
     
};

function mapStateToProps(state){
    return {
        allGames: state.allGames,
        filterGames: state.filterGames
    }
};

function mapDispatchToProps(dispatch){
    return {
        getAllGames: () => dispatch(getAllGames())        
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Home)

