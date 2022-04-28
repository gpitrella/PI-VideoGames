import React, { Component } from 'react';
import './Welcome.css'
// import { render } from 'react-dom';
import { connect } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import { Link } from 'react-router-dom';

export class Welcome extends Component {
    componentDidMount(){
        this.props.getAllGames()
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

function mapStateToProps(state){
    return {
        allGames: state.allGames
    }
};

function mapDispatchToProps(dispatch){
    return {
        getAllGames: () => dispatch(getAllGames())
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Welcome)