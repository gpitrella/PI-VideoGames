import React, { useEffect } from "react";
import style from './Pagination.module.css';

export default function Pagination( { gamePerPage, allGameLength, allFilterGamesLength, handlePage } ) {

    const [ nextPage, setNextPage ] = React.useState([]); // Next Page
    const [ countNext, setCountNext ] = React.useState(0);
    const [ currentPage, setCurrentPage] = React.useState([]);
    
    const offsetPag = 6;
    let numberOfPagination = [] // --> [1,2,3,4,5][6,7]

    const numberPages = allFilterGamesLength === 0 ? Math.ceil(allGameLength / gamePerPage) : Math.ceil(allFilterGamesLength / gamePerPage) // 116 / 16 = 6,25 => 7
    for (let i = 1 ; i < numberPages && i < 6 ; i++){ //i < numberPages ||
            numberOfPagination.push(i);
    }

    // Next Page:
    const aux = []
    const handleChangeNextPage = () => {
        setCountNext(countNext + 1);
        if(Math.ceil(allGameLength / gamePerPage) > 6 ){
            if(nextPage.length === 0) { // First Next
                for (let i = 0; i < numberOfPagination.length; i++) {
                    numberOfPagination[i] = numberOfPagination[i] + offsetPag;
                }
                setNextPage(numberOfPagination.slice(0, numberPages - offsetPag )) // --> [10,11]
                console.log(numberOfPagination);          
            } else {
                const countPages = numberPages - countNext * offsetPag // -4
                if(countPages <= 0){
                    alert(`Don't have more Pages`)
                } else {
                    for (let i = 0; i < nextPage.length; i++) {
                        aux[i] = nextPage[i] + offsetPag;
                        setNextPage(aux.slice(0, numberPages - offsetPag * countPages)) // --> [12,13,14,14,16]
                    }
                }
                console.log(numberOfPagination);
            }
        } else {
            alert(`Don't have more games.`)
        }
    };

    const handleInit = () => {
        console.log(numberOfPagination)
        if(nextPage.length > 0) {
            setNextPage(numberOfPagination);
            setCountNext(0);
        }
        handlePage(1);
    };
    
    // Update Component
    useEffect(()=>{
        if(nextPage.length === 0){
            setCurrentPage(numberOfPagination.slice(0, numberPages - offsetPag ))
        } else {
            setCurrentPage(aux)
        }
    }, [nextPage])


    return (
        <div className={style.pagination}>
            <nav className={style.pagination}>                
                <ul className={style.pagination}> 
                    <label className={style.buttonTitlePagePagination}> Pages: </label>            
                    <li className={style.itemPoint}>
                        <button className={style.item} onClick={() => handleInit()}>Init</button>
                    </li>
                    {nextPage.length === 0 
                        ? (numberOfPagination?.map((number)=>(
                        <li key={number} className={style.itemPoint}>
                            <button className={style.item} onClick={() => handlePage(number)}>{number}</button>
                        </li>                        
                    ))) 
                        : (nextPage?.map((number)=>(
                            <li key={number} className={style.itemPoint}>
                                <button className={style.item} onClick={() => handlePage(number)}>{number}</button>
                            </li >                        
                        )))   
                } 
                    <li className={style.itemPoint}>
                        <button className={style.item} onClick={() => handleChangeNextPage()}>Next</button>
                    </li>           
                </ul>
            </nav> 
        </div>
    )
};