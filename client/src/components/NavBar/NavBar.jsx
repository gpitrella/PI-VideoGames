import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <header>
            <nav>
                <NavLink exact to="/">Home</NavLink>
            </nav>
            <nav>
                <NavLink to="/creategame">Create Game</NavLink>
            </nav>
        </header>
    )
}