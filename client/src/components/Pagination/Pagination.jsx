import React, { useEffect } from "react";
import './Pagination.css'

export default function Pagination( { gamePerPage, allGameLength, allFilterGamesLength, handlePage } ) {

    const [ currentPage, setCurrentPage] = React.useState([]);
    const [ nextPage, setNextPage ] = React.useState([]); // Next Page
    
    let numberOfPagination = []

    if(allFilterGamesLength === 0){
        const numberPages = Math.ceil(allGameLength / gamePerPage); // 100 / 16 = 6,25
        for (let i = 1 ; i < numberPages && i < 5 ; i++){ //i < numberPages ||
            numberOfPagination.push(i);
        }
    }   

    const handleChangePage = () => {
        if(Math.ceil(allGameLength / gamePerPage) > 5 ){
            
            for (let i = 0; i < numberOfPagination.length; i++) {
                numberOfPagination[i] = numberOfPagination[i] + 5;
            }
            setNextPage(numberOfPagination)
            console.log(numberOfPagination);            
        }
    };

    const handleInit = () => {
        console.log(numberOfPagination)
        if(nextPage.length > 0) {
            for (let i = 0; i < nextPage.length; i++) {
                nextPage[i] = numberOfPagination[i] - 5;
            }
            setNextPage(numberOfPagination)
        }
    }
    

    useEffect(()=>{
       setCurrentPage(numberOfPagination)
    }, [nextPage])


    return (
        <div className='pagination'>
            <nav className="pagination" >                
                <label className="titlePage">Pages: </label>              
                <ul className="pagination"> 
                    <li className="itemPoint">
                        <button className="item" onClick={() => handleInit()}>Init</button>
                    </li>
                    {nextPage.length === 0 
                        ? (numberOfPagination?.map((number)=>(
                        <li key={number} className="itemPoint">
                            <button className="item" onClick={() => handlePage(number)}>{number}</button>
                        </li>                        
                    ))) 
                        : (nextPage?.map((number)=>(
                            <li key={number} className="itemPoint">
                                <button className="item" onClick={() => handlePage(number)}>{number}</button>
                            </li >                        
                        )))   
                } 
                    <li className="itemPoint">
                        <button className="item" onClick={() => handleChangePage()}>Next</button>
                    </li>           
                </ul>
            </nav> 
        </div>
    )
};