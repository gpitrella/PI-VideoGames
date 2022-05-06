import React  from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom'
import imgBackUp from '../CreateGame/img/new-game.jpg'

export default function GameCard({ name, rating, image, id, genres }){
    
    let img = image;
    let genreBackUp = genres.slice(0,2)
    if(!image) img = imgBackUp;   
    if(genres.lenght === 0) genreBackUp = [{name: "WO Genre"}]

    return(
        <div className='bodyGameCard'>
            
            <Link className='linkTitle' to={`/videogame/${id}`}>
                <img className="imageCard" src={img} alt={name} key={id}/>
                <h5 className='titleCard'> 🖤 {name}</h5>            
            </Link>
            <div className='detailCard'>                
                <div className='ratingCard' key={id}><span className='starCard'>★</span> {rating}</div>
                <div className='genreCard'>
                    
                    <div className='allGenreCard'>{genreBackUp?.map(genre =>(
                        <div key={id*Math.random()*1000/8}><span className='checkGenre'>🌀</span> {genre.name}</div>
                    ))}</div>
                    
                </div>
            </div>            
        </div>
    );
};

