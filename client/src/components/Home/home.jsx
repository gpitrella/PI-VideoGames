import React, { Component } from 'react';
import './Home.css'
// import { render } from 'react-dom';
import { connect } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import GameCard from '../GameCard/GameCard';

export class Home extends Component {
     
    render(){
        return (
            <div className='home'>
                {
                
                this.props.allGames 
                    ? this.props.filterGames.length > 0 
                        ? this.props.filterGames.map(game => (
                            <GameCard 
                                name = {game.name}
                                rating = {game.rating}
                                image = {game.image}
                                id = {game.id} 
                                // genres = {game.genres} 
                                key = {game.id}             
                            />   
                        ))                        
                        : this.props.allGames.map(game => (
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
    }    
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

