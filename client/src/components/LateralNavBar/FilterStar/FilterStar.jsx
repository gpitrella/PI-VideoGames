import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames } from '../../../redux/actions';
import './FilterStar.css'

export default function FilterStar() {
    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.allGames)
    const dataFilter = useSelector((state) => state.dataFilter)

    const [ filter, setFilter ] = React.useState({
        rating: 0,
        // origen: ''
    });
    const prevRating = React.useRef(filter); 
    
    const prevAllGames = React.useRef(allGames);



    function handleChange(e){
        e.preventDefault();
            setFilter({
                ...filter,
                [e.target.name]: e.target.value
            })
    };   
         
    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(filterGames(filter))
    };

    React.useEffect((e) =>{
        prevRating.current = filter
        if(prevRating.rating !== '' && filter.rating === '' ){
            dispatch(filterGames(filter))
        }
        prevAllGames.current = allGames
        if(prevAllGames !== allGames){
            dispatch(filterGames(filter))
        }
    }, [filter, allGames]);
    
       
    return (
        <div className='filterStar'>
            <form className="rating" onSubmit={(e) => handleOnSubmit(e)}>                
                {/* <label>
                    <input type="radio" name="rating" value="1" onChange={(e) => handleChange(e)}></input>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="rating" value="2" onChange={(e) => handleChange(e)}></input>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="rating" value="3" onChange={(e) => handleChange(e)}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>   
                </label>
                <label>
                    <input type="radio" name="rating" value="4" onChange={(e) => handleChange(e)}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="rating" value="5" onChange={(e) => handleChange(e)}/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label> */}
                
                <label>
                    <input type='number' step="0.01" name='rating' onChange={(e) => handleChange(e)}></input>
                </label>
                <div>
                    <button type='submit'>Filter</button>
                </div>
            </form> 
            {/* <form onSubmit={(e) => handleOnSubmit(e)}>
                <input type="checkbox" name="origen" value="db" onChange={(e) => handleChange(e)}></input>
                <label>DB</label>
                <input type="checkbox" name="origen" value="api" onChange={(e) => handleChange(e)}></input>
                <label> Api</label>
                <input type="submit" value="Submit"></input>
            </form> */}

        </div>
    )
};