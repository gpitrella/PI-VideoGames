// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { filterUpStore, orderByName } from '../../../redux/actions';
// import './FilterAZ.css'

// export default function FilterAZ() {
//     const dispatch = useDispatch()
//     // const allGames = useSelector((state) => state.allGames)
//     const dataFilter = useSelector((state) => state.dataFilter)
   
//     // const prevAllGames = React.useRef(allGames);

//     function handleChange(e){
//         e.preventDefault();
//         dataFilter.filterAZ = e.target.value;        
//     };   
         
//     function handleOnSubmit(e){
//         e.preventDefault();        
//         dispatch(filterUpStore(dataFilter))        
//         dispatch(orderByName())
//     };

//     // React.useEffect(() =>{    
//     //     prevAllGames.current = allGames
//     //     if(prevAllGames !== allGames && parseInt(dataFilter.filterAZ) === 1){
//     //         dispatch(orderByName(dataFilter))
//     //     }
//     // }, [allGames]);
    
       
//     return (
//         <div className='filteraz'>
//             <form className="filteraz" onSubmit={(e) => handleOnSubmit(e)}> 
//                 <label>Order AZ-ZA:</label>            
//                 <select type='text'name='filteraz' onChange={(e) => handleChange(e)}>
//                         <option value='0'>None</option>
//                         <option value='1'>AZ</option>
//                         <option value='2'>ZA</option>                                      
//                 </select>
//                 <button type='submit'>Order</button>
                
//             </form> 
//         </div>
//     )
// };