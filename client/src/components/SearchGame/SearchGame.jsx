import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchGames, orderByName, filterGamesDbApi, clearFilterGames, orderByStar } from '../../redux/actions';
import searchIcon from './img/searchIcon.png'
import './SearchGame.css'
// import GameCard from '../GameCard/GameCard';

export default function SearchGame() {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.allGenres)
    const allGames = useSelector((state) => state.allGames)

    const [ name, setName ] = React.useState('');
    const [ genre, setGenre] = React.useState('');
    const [ rating, setRating ] = React.useState('');
    const [ orderAZ, setOrderAZ ] = React.useState('NONE');
    const [ orderStar, setOrderStar ] = React.useState('NONE');
    const [ orderDbApi, setOrderDbApi ] = React.useState('ALL');
    const [ displayFilter, setDisplayFilter ] = React.useState('none');
    
    // Filter SearchBar:
    function handleSearch(e) {
        e.preventDefault();
        setName( e.target.value );
    }; 

    // Filter By Genre:
    function handleGenre(e){
        e.preventDefault();
        setGenre( e.target.value );                  
    }; 
     // Filter By Rating:
    function handleRating(e){
        e.preventDefault();
        setRating( e.target.value );                  
    };  

    // Order AZ - ZA
    function handleOrderAZ(e){
        e.preventDefault();
        setOrderAZ( e.target.value )
    }

    // Filter DB or API
    function handleOrderDbApi(e){
        e.preventDefault();
        setOrderDbApi( e.target.value )
    };

    // Order by Star
    function handleOrderStar(e){
        e.preventDefault();
        setOrderStar( e.target.value )
    };

    // Dispatch Action 
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchGames(name, rating, genre));
    };

    // Dispatch AZ Action
    function handleSubmitAZandDbAPI(e) {
        e.preventDefault();
        // Comeback to None / All
        if(orderAZ === 'NONE' || orderDbApi === 'ALL' || orderStar === 'NONE'){
            console.log( `ENTRO A NONE: ${orderAZ}` )
            dispatch(clearFilterGames());
            dispatch(searchGames(name, rating, genre));
            dispatch(orderByName(orderAZ));            
            dispatch(filterGamesDbApi(orderDbApi));
            dispatch(orderByStar(orderStar));
        } else {
            dispatch(clearFilterGames());
            dispatch(orderByName(orderAZ));            
            dispatch(filterGamesDbApi(orderDbApi));
            dispatch(orderByStar(orderStar));
        }
    }; 

    // UpDate allGames when update filters.
     useEffect(() => {
        dispatch(searchGames(name, rating, genre));  
    },[ dispatch, genre, rating ])

    // Update AZ after update allGames
    useEffect(() => {
        dispatch(orderByName(orderAZ));    
        dispatch(filterGamesDbApi(orderDbApi));
        dispatch(orderByStar(orderStar));
        console.log('SEGUNDO: LA ORDENO')          
    },[allGames]);  
    
    // Display filter:
    function handleChangeDiplay(){
        displayFilter === 'none' ? setDisplayFilter('flex') : setDisplayFilter('none');
    }
        
    return (
        <div>
            <div className='searchBar'>                
                <form className="search-container">
                    <input type='text' id='name' placeholder='Search Game ...' autoComplete='off' value={name} onChange={(e) => handleSearch(e)}></input>
                    <img type='submit' className="search-icon" src={searchIcon} alt='icono search' onClick={(e) => handleSubmit(e)}/>
                </form>
            </div>
            <div className='filterOrder'>
            <button type='submit' className='buttonDisplay' onClick={()=> handleChangeDiplay()}>Filters</button>
            <div className='filterOrder' style={{display: displayFilter }}>
                <div className='filterGenre'>
                    <form className="filterGenre" onSubmit={(e) => handleSubmit(e)}>                
                        <select type='text'name='filterGenre' onChange={(e) => handleGenre(e)}>
                            <option value=''>Filter by Genre </option>
                            {allGenres && allGenres.map((g)=>(
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}                   
                        </select>
                    </form> 
                </div>

                <div className='filterStar'>
                    <form className="rating" onSubmit={(e) => handleSubmit(e)}>             
                            {/* <input className='inputStart' placeholder='Filter by Rating' type='number' step="0.01" name='rating' onChange={(e) => handleRating(e)}></input> */}
                            <select className='inputStart' type='number' name='rating' onChange={(e) => handleRating(e)}>
                                <option value=''>Select Star</option>
                                <option value='0'>Without ★</option>
                                <option value='1'>★</option>
                                <option value='2'>★★</option>
                                <option value='3'>★★★</option>
                                <option value='4'>★★★★</option>
                                <option value='5'>★★★★★</option>
                        </select>
                        <div>
                            <button type='submit'>Filter</button>
                        </div>
                    </form> 
                </div>  

                <div className='filteraz'>
                    <form className="filteraz" onSubmit={(e) => handleSubmitAZandDbAPI(e)}> 
                        {/* <label>Order AZ-ZA:</label>             */}
                        <select type='text'name='filteraz' onChange={(e) => handleOrderAZ(e)}>
                            <option value='NONE'>Order by Name</option>
                            <option value='ASC'>AZ</option>
                            <option value='DEC'>ZA</option>                                      
                        </select>
                        <button type='submit'>Order</button>                
                    </form> 
                </div> 

                <div className='filterOrigen'>
                    <form className="filterOrigen" onSubmit={(e) => handleSubmitAZandDbAPI(e)}> 
                        {/* <label>Data Base or API</label>             */}
                        <select type='text'name='filteraz' onChange={(e) => handleOrderDbApi(e)}>
                                <option value='ALL'>Select Origen</option>
                                <option value='DB'>DATA BASE</option>
                                <option value='API'>APi</option>
                                                                    
                        </select>
                        <button type='submit'>Order: </button>                
                    </form> 
                </div> 

                <div className='filteraz'>
                    <form className="filteraz" onSubmit={(e) => handleSubmitAZandDbAPI(e)}> 
                        <select type='text'name='filteraz' onChange={(e) => handleOrderStar(e)}>
                            <option value='NONE'>Order by Star</option>
                            <option value='BEST'>BEST</option>
                            <option value='WORST'>WORST</option>                                      
                        </select>
                        <button type='submit'>Order</button>                
                    </form> 
                </div> 
            </div>     
            </div>
        </div>
        
    )
    
};