import React from 'react';
import './Home.css'
import { connect } from 'react-redux';
import GameCard from '../GameCard/GameCard';
import Pagination from '../Pagination/Pagination';

export function Home(props) {  

    // all games = 100 games
    const [ currentPage, setCurrentPage ] = React.useState(1); // pagina actual
    const [ gamePerPage, setGamePerPage] = React.useState(16); // games por pagina
    
    const indexLastGame = currentPage * gamePerPage // valor inicial 16 --- 2 -> 32
    const indexFirstGame = indexLastGame - gamePerPage // valor inicial 0 --- 2 -> 16       
    
    const currentAllGames = props.allGames.slice(indexFirstGame, indexLastGame)
    const currentAllFilterGames = props.filterGames.slice(indexFirstGame, indexLastGame)
    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
  
        return (
            <div className='home'>

                <Pagination className='menuPagination'
                    gamePerPage = {gamePerPage}
                    allGameLength = {props.allGames.length}
                    allFilterGamesLength = {props.filterGames.length}
                    handlePage = {handlePage}
                   
                />
            <div className='grid-container'>
            <label className='allYourGames'> 🎮 All Your Games in one Place </label>
                {                  
                typeof(props.allGames) === 'string'
                    ? <span className='dontFoundSearching'> 😭 {props.allGames}</span>
                    : props.allGames.length === 0
                        ? <h2 className='searching'> 👁‍🗨 Searching ... </h2>
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

