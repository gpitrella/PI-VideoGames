import React  from 'react';
import style from './GameCard.module.css';
import { Link } from 'react-router-dom'
import imgBackUp from '../CreateGame/img/new-game.jpg'

export default function GameCard({ name, rating, image, id, genres }){
    
    let img = image;
    let genreBackUp = genres.slice(0,2)
    if(!image) img = imgBackUp;   
    if(genres.lenght === 0) genreBackUp = [{name: "WO Genre"}]

    return(
        <div className={style.bodyGameCard}>
            
            <Link className={style.linkTitle} to={`/videogame/${id}`}>
                <img className={style.imageCard} src={img} alt={name} key={id}/>
                <h5 className={style.titleCard}> 🖤 {name}</h5>            
            </Link>
            <div className={style.detailCard}>                
                <div className={style.ratingCard} key={id}><span className={style.starCard}>★</span> {rating}</div>
                <div className={style.genreCard}>
                    
                    <div className={style.allGenreCard}>{genreBackUp?.map(genre =>(
                        <div key={id*Math.random()*1000/8}><span className={style.checkGenre}>🌀</span> {genre.name}</div>
                    ))}</div>
                    
                </div>
            </div>            
        </div>
    );
};