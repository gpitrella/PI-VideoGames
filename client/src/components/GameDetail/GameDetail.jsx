import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail, clearGameDetail } from "../../redux/actions";

export function GameDetail ({ match }){
    const dispatch = useDispatch();
    const { idVideogame } = useParams();
    const gameDetail = useSelector((state) => state.gameDetail)
    
    React.useEffect(() => {
        dispatch(getGameDetail(idVideogame));
        return() => {
            dispatch(clearGameDetail())
        }
    }, [dispatch, idVideogame]);
    
    
    console.log(gameDetail)
    
       
    return (
        <>
            {gameDetail.name ?
                <div>
                    <h3>{gameDetail.name}</h3>
                    <p>{gameDetail.description}</p>
                    <p>{gameDetail.released}</p>
                </div>
                : (<h3>Charging ...</h3>)
            }
        </>
    )
}

export default GameDetail;