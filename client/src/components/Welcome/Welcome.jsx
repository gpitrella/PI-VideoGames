import React, { Component } from 'react';
import './Welcome.css'
import { connect } from 'react-redux';
import { getAllGames, getAllGenres } from '../../redux/actions';
import { Link } from 'react-router-dom';

export class Welcome extends Component {
    componentDidMount(){
        this.props.getAllGames()
        this.props.getAllGenres()
    }

    render(){
        return (
            <header className='welcome'>
                <div className='welcomeTitle'>
                    <h1>WELCOME TO THE GAME</h1>
                </div> 
                <div className='divLink'>
                    <Link className='linkStart' to="/videogame">START</Link>
                </div>          
             </header>
        )
    }    
};

function mapDispatchToProps(dispatch){
    return {
        getAllGames: () => dispatch(getAllGames()),
        getAllGenres: () => dispatch(getAllGenres()),
    }
};

export default connect( null, mapDispatchToProps )(Welcome)