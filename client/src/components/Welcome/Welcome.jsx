import React, { Component } from 'react';
import './Welcome.css'
// import { render } from 'react-dom';
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
                <div>
                    <Link to="/videogame">Entrar</Link>
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