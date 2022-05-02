// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { filterGames, filterUpStore, filterByGenre } from '../../../redux/actions';
// import './FilterGenre.css'

// export default function FilterGener() {
//     const dispatch = useDispatch()
//     // const allGames = useSelector((state) => state.allGames)
//     const dataFilter = useSelector((state) => state.dataFilter)
//     // const filterByGenreStore = useSelector((state) => state.filterByGenre)
//     const allGenres = useSelector((state) => state.allGenres)

//     // const prevAllGames = React.useRef(allGames);

//     function handleChange(e){
//         e.preventDefault();
//         dataFilter.filterGenre = e.target.value; 
//         // filterByGenreStore = e.target.value;            
//     };   
         
//     function handleOnSubmit(e){
//         e.preventDefault();
//         dispatch(filterUpStore(dataFilter))
//         // dispatch(filterByGenre(filterByGenreStore))
//         dispatch(filterGames())
        
//     };

//     // React.useEffect(() =>{
//     //     prevAllGames.current = allGames
//     //     if(prevAllGames !== allGames){
//     //         dispatch(filterUpStore(dataFilter))
//     //         dispatch(filterGames())
//     //     }
//     // }, [allGames]);
    
       
//     return (
//         <div className='filterGenre'>
//             <form className="filterGenre" onSubmit={(e) => handleOnSubmit(e)}>                
//                 <label> Filter Genres: </label>              
//                 <select type='text'name='filterGenre' onChange={(e) => handleChange(e)}>
//                     <option value='none'>None</option> 
//                     {allGenres && allGenres.map((g)=>(
//                         <option key={g.id} value={g.name}>{g.name}</option>
//                   ))}                   
//               </select>
//                 <div>
//                     <button type='submit'>Filter</button>
//                 </div>
//             </form> 
//         </div>
//     )
// };