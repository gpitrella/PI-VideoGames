import React  from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom'
import imgBackUp from '../CreateGame/img/new-game.jpg'

export default function GameCard({ name, rating, image, id, genres }){
    let img = image;
    // let genreBackUp = genres
    if(!image) img = imgBackUp;   
    // if(genres.lenght === 0) genreBackUp = [{name: "Without Genre"}]

    return(
        <div>
            
            <img className="imageCard" src={img} alt={name} />
            <Link to={`/videogame/${id}`}>
                <h5>{name}</h5>            
            </Link>
            
            <span>{rating}</span>
            {/* <div>{genreBackUp.map(genre =>(
                <span>{genre.name}</span>
            ))}</div> */}
        </div>
    );
};

