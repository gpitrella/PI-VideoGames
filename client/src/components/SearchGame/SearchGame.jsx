import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchGames, orderByName, getAllGames } from '../../redux/actions';
// import GameCard from '../GameCard/GameCard';

export default function SearchGame() {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.allGenres)
    const allGames = useSelector((state) => state.allGames)

    const [ name, setName ] = React.useState('');
    const [ genre, setGenre] = React.useState('');
    const [ rating, setRating ] = React.useState('');
    const [ orderAZ, setOrderAZ ] = React.useState('NONE');
    

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
        console.log( orderAZ )
    }

    // Dispatch Action 
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchGames(name, rating, genre));
        // filterGames = []
        // dispatch(orderByName(orderAZ));
    }; 

     useEffect(() => {
        dispatch(searchGames(name, rating, genre));  
    },[dispatch, genre, rating ])

    useEffect(() => {
        dispatch(orderByName(orderAZ));
        console.log('SEGUNDO: LA ORDENO')          
    },[allGames])
    
    
    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.nameGame !== '' && this.state.nameGame === ''){
    //         this.props.searchGames(this.state.nameGame, this.state.genreGame);
    //     }       
    // }
        
        
    return (
        <div>
            <div>
                <h3>Search Game</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' id='name' autoComplete='off' value={name} onChange={(e) => handleSearch(e)}></input>
                    <button type='submit'>Search</button>                    
                </form>
            </div>
            
            <div className='filterGenre'>
                <form className="filterGenre" onSubmit={(e) => handleSubmit(e)}>                
                    <label> Filter Genres: </label>              
                    <select type='text'name='filterGenre' onChange={(e) => handleGenre(e)}>
                        <option value=''>Todos</option>
                        {allGenres && allGenres.map((g)=>(
                        <option key={g.id} value={g.name}>{g.name}</option>
                    ))}                   
                    </select>
                    <div>
                        <button type='submit'>Filter</button>
                    </div>
                </form> 
            </div>

            <div className='filterStar'>
                <form className="rating" onSubmit={(e) => handleSubmit(e)}>             
                    <label>Filter Rating: </label>
                        <input type='number' step="0.01" name='rating' onChange={(e) => handleRating(e)}></input>
                    <div>
                        <button type='submit'>Filter</button>
                    </div>
                </form> 
            </div>  

            <div className='filteraz'>
            <form className="filteraz" onSubmit={(e) => handleSubmit(e)}> 
                <label>Order AZ-ZA:</label>            
                <select type='text'name='filteraz' onChange={(e) => handleOrderAZ(e)}>
                        <option value='NONE'>None</option>
                        <option value='ASC'>AZ</option>
                        <option value='DEC'>ZA</option>                                      
                </select>
                <button type='submit'>Order: </button>                
            </form> 
        </div>      
            
        </div>
        
    )
    
};