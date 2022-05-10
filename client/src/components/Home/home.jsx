import React from 'react';
import style from './Home.module.css'
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
            <div className={style.home}>

                <Pagination className={style.menuPagination}
                    gamePerPage = {gamePerPage}
                    allGameLength = {props.allGames.length}
                    allFilterGamesLength = {props.filterGames.length}
                    handlePage = {handlePage}
                   
                />
            <div className={style.gridcontainer}>
            <label className={style.allYourGames}> 🎮 All Your Games in one Place </label>
                {                  
                typeof(props.allGames) === 'string'
                    ? <span className={style.dontFoundSearching}> 😭 {props.allGames}</span>
                    : props.allGames.length === 0
                        ? <h2 className={style.searching}> 👁‍🗨 Searching ... </h2>
                        : props.filterGames.length > 0 
                            ? currentAllFilterGames.map(game => (
                                <GameCard className={style.mainCard}
                                    name = {game.name}
                                    rating = {game.rating}
                                    image = {game.image}
                                    id = {game.id} 
                                    genres = {game.genres} 
                                    key = {game.id}
                                             
                                />   
                            ))                        
                            : currentAllGames.map(game => (
                                <GameCard className={style.mainCard}
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

export default connect( mapStateToProps, null )(Home)

