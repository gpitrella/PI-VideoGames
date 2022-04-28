import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames } from '../../../redux/actions';
import './FilterAZ.css'

export default function FilterAZ() {
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
                ...dataFilter,
                filterAz: e.target.value
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
        <div className='filteraz'>
            <form className="filteraz" onSubmit={(e) => handleOnSubmit(e)}> 
                <label>Filter AZ</label>            
                <select type='text'name='filteraz' onChange={(e) => handleChange(e)}>
                        <option value='az'>AZ</option>
                        <option value='za'>ZA</option>                                      
                </select>
                <div>
                    <button type='submit'>Filter</button>
                </div>
            </form> 
        </div>
    )
};