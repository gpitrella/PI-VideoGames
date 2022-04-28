import React from 'react';
import { useDispatch } from 'react-redux';
import { filterGames } from '../../redux/actions';
import './LateralNavBar.css'

export default function LateralNavBar() {
    const dispatch = useDispatch()
    const [ filter, setFilter ] = React.useState({
        rating: 0,
        // origen: ''
    });
    const prevRating = React.useRef(filter); 
    console.log(prevRating)



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
    }, [filter]);
    
       
    return (
        <div className='lateralnavbar'>
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