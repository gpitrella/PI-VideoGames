import React from 'react';
import { connect } from 'react-redux';
import { searchGames, filterGames } from '../../redux/actions'

export class SearchGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameGame: ''
        };          
    };

       
    handleChange(e) {
        e.preventDefault();
        this.setState( {nameGame: e.target.value} )
    };
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.searchGames(this.state.nameGame);
     
    };   
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.nameGame !== '' && this.state.nameGame === ''){
            this.props.searchGames(this.state.nameGame);
        }
       
    }
    

    render() {
        const { nameGame } = this.state;
        return (
            <div>
                <h3>Search Game</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type='text' id='nameGame' autoComplete='off' value={nameGame} onChange={(e) => this.handleChange(e)}></input>
                    <button type='submit'>Search</button>                    
                </form>
            </div>
        )
    };
};

function mapStateToProps(state){
    return {
        allGames: state.allGames,
        filterGames: state.filterGames
    };
};

function mapDispatchToProps(dispatch){
    return{
        searchGames: (nameGame) => dispatch(searchGames(nameGame)),
        filterGames: (games) => dispatch(filterGames(games))
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(SearchGame)