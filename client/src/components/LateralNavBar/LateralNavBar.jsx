import React from 'react';
import FilterStar from './FilterStar/FilterStar'
import FilterAZ from './FilterAZ/FilterAZ'
import './LateralNavBar.css'

export default function LateralNavBar() {  
       
    return (
        <header className='lateralnavbar'>
            <div>
                <FilterStar /> 
            </div>  
            <div>
                <FilterAZ /> 
            </div>       
        </header>

    )
};