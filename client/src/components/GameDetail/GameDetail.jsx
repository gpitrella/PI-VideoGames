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
                                    <span className={style.genreDetail}> 🌀 Genres: 
                                        <span>{game.game.genres?.map(genre =>(
                                            <span className={style.dateGenre} key={Math.random()*1000/8*3}> {genre}</span>
                                        ))}</span>
                                    </span>
                                    <span className={style.platformDetail}> 🌀 Platforms: 
                                        <span>{game.game.platforms?.map(p =>(
                                            <span className={style.dateGenre} key={Math.random()*1000/8*3}> {p.platform.name}</span>
                                        ))}</span> 
                                    </span>                            
                                </div>
                            </span>
                        </div>
                            <span className={style.description}>
                                <p className={style.descriptionTitle}>Description: </p>
                                <br></br>
                                {game.game.description}
                            </span>
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
                                    <span className={style.genreDetail}> 🌀 Genres: 
                                        <span>{gameDetail.genres?.map(genre =>(
                                            <span className={style.dateGenre} key={gameDetail.id*Math.random()*1000/8}> {genre.name}</span>
                                        ))}</span>
                                    </span>
                                    <span className={style.platformDetail}> 🌀 Platforms: 
                                        <span>{gameDetail.platforms?.map(p =>(
                                            <span className={style.dateGenre} key={gameDetail.id*Math.random()*1000/8}> {p.platform.name}</span>
                                        ))}</span> 
                                    </span>                            
                                </div>
                            </span>
                        </div>
                            <span className={style.description}>
                                <p className={style.descriptionTitle}>Description: </p>
                                <br></br>
                                {gameDetail.description.replaceAll('<p>','').replaceAll('<br>','').replaceAll('<br />','').replaceAll('</p>','')}
                            </span>
                    </div>
                    : (<h2 className={style.charging}> 👁‍🗨 Charging ... </h2>)
                }
            </div>
        )

    }
}

export default GameDetail;