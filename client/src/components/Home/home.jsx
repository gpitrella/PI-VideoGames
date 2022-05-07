import React, { useEffect, useState } from 'react';
import './Home.css'
// import { render } from 'react-dom';
import { connect } from 'react-redux';
import { getAllGames, searchGames } from '../../redux/actions';
import GameCard from '../GameCard/GameCard';
import Pagination from '../Pagination/Pagination';

export function Home(props) {  

    // all games = 100 games
    const [ currentPage, setCurrentPage ] = React.useState(1); // pagina actual
    const [ gamePerPage, setGamePerPage] = React.useState(16); // games por pagina
   
    // SE TRAE TODO LA INFORMACIÓN EN ALL GAMES
    // const [ allGames , setAllGames ] = React.useState([]);
    // 
    
    
    const offsetPag = 5;
    const indexLastGame = currentPage * gamePerPage // valor inicial 16
    const indexFirstGame = indexLastGame - gamePerPage // valor inicial 0        
    
    const currentAllGames = props.allGames.slice(indexFirstGame, indexLastGame)
    const currentAllFilterGames = props.filterGames.slice(indexFirstGame, indexLastGame)
    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

   
    
    // useEffect(()=>{
    // }, [props.allGames])

    /////////////////////////7
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, 5)
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(currentPage * offsetPag, currentPage * offsetPag * 2) => 
    // si page 0 [].slice(0,5) X 
    // si page 2 [].slice(5,10) X 


    // let dataAllgames = props.allGames

   
        return (
            <div className='home'>

                <Pagination className='menuPagination'
                    gamePerPage = {gamePerPage}
                    allGameLength = {props.allGames.length}
                    allFilterGamesLength = {props.filterGames.length}
                    handlePage = {handlePage}
                   
                />
            
            <div className='grid-container'>
                {                  // REVISAR PORQUE AL PEDIR DATOS DE API NO APARECE EL CARTEL DE CARGANDO
                typeof(props.allGames) === 'string'
                    ? <h2>{props.allGames}</h2>
                    : props.allGames.length === 0
                        ? <h2 className='searching'> 👁‍🗨 Searching ...</h2>
                        : props.filterGames.length > 0 
                            ? currentAllFilterGames.map(game => (
                                <GameCard className='mainCard'
                                    name = {game.name}
                                    rating = {game.rating}
                                    image = {game.image}
                                    id = {game.id} 
                                    genres = {game.genres} 
                                    key = {game.id}
                                             
                                />   
                            ))                        
                            : currentAllGames.map(game => (
                                <GameCard className='mainCard'
                                    name = {game.name}
                                    rating = {game.rating}
                                    image = {game.image}
                                    id = {game.id} 
                                    genres = {game.genres} 
                                    key = {game.id} 
                                                 
                                />   
                            ))              
            }
          
        </div>
        </div>
            
        )
     
};

function mapStateToProps(state){
    return {
        allGames: state.allGames,
        filterGames: state.filterGames
    }
};

// function mapDispatchToProps(dispatch){
//     return {
//         getAllGames: () => dispatch(getAllGames())        
//     }
// };

export default connect( mapStateToProps, null )(Home)

