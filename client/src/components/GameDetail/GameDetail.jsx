import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail, clearGameDetail } from "../../redux/actions";
import style from './GameDetail.module.css'

export function GameDetail (game){
    const dispatch = useDispatch();
    const { idVideogame } = useParams();
    const gameDetail = useSelector((state) => state.gameDetail)
    
    React.useEffect(() => {
        dispatch(getGameDetail(idVideogame));
        return() => {
            dispatch(clearGameDetail())
        }
    }, [dispatch, idVideogame]);
    console.log(game)
    if(game.game){
        return (
            <div className={style.bodyDetail}>
                {game.game.name ?
                        <div>
                        <h1 className={style.titleDetail}> ✅ GAME CREATED SUCCEFULLY 🎮</h1>
                        <h3 className={style.titleDetail}> ⭕️ {game.game.name}</h3>
                        <div className={style.cardDetail}>
                            <img className={style.imageDetail} src={game.game.image} alt={game.game.name} />
                            <span className={style.descriptionDetailTitle}> Details: 
                                <p className={style.dateReleased}> 🌀 Released Date: {game.game.released}</p>
                                <p className={style.dateReleased}> 🌀 Rating: ⭐️ {game.game.rating}</p>
                                <div className={style.genresPlatforms}>
                                    <p className={style.genreDetail}> 🌀 Genres: 
                                        <p>{game.game.genres?.map(genre =>(
                                            <p className={style.dateGenre} key={Math.random()*1000/8*3}>  -- {genre}</p>
                                        ))}</p>
                                    </p>
                                    <p className={style.platformDetail}> 🌀 Platforms: 
                                        <p >{game.game.platforms?.map(p =>(
                                            <p className={style.dateGenre} key={Math.random()*1000/8*3}>  -- {p.platform.name}</p>
                                        ))}</p> 
                                    </p>                            
                                </div>
                            </span>
                        </div>
                            <p className={style.description}>
                                <p className={style.descriptionTitle}>Description: </p>
                                <br></br>
                                {game.game.description}
                            </p>
                    </div>
                    : (<h2 className={style.charging}> 👁‍🗨 Charging ... </h2>)
                }
            </div>
        )
    } else {
        return (
            <div className={style.bodyDetail}>                
                {gameDetail.name ?
                    <div>
                        <h3 className={style.titleDetail}>⭕️ {gameDetail.name}</h3>
                        <div className={style.cardDetail}>
                            <img className={style.imageDetail} src={gameDetail.image} alt={gameDetail.name} />
                            <span className={style.descriptionDetailTitle}> Details: 
                                <p className={style.dateReleased}> 🌀 Released Date: {gameDetail.released}</p>
                                <p className={style.dateReleased}> 🌀 Rating: ⭐️ {gameDetail.rating}</p>
                                <div className={style.genresPlatforms}>
                                    <p className={style.genreDetail}> 🌀 Genres: 
                                        <p>{gameDetail.genres?.map(genre =>(
                                            <p className={style.dateGenre} key={gameDetail.id*Math.random()*1000/8}>  -- {genre.name}</p>
                                        ))}</p>
                                    </p>
                                    <p className={style.platformDetail}> 🌀 Platforms: 
                                        <p >{gameDetail.platforms?.map(p =>(
                                            <p className={style.dateGenre} key={gameDetail.id*Math.random()*1000/8}>  -- {p.platform.name}</p>
                                        ))}</p> 
                                    </p>                            
                                </div>
                            </span>
                        </div>
                            <p className={style.description}>
                                <p className={style.descriptionTitle}>Description: </p>
                                <br></br>
                                {gameDetail.description.replaceAll('<p>','').replaceAll('<br>','').replaceAll('<br />','').replaceAll('</p>','')}
                            </p>
                    </div>
                    : (<h2 className={style.charging}> 👁‍🗨 Charging ... </h2>)
                }
            </div>
        )

    }
}

export default GameDetail;