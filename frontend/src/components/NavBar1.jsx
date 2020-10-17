import React from 'react';
import {Link} from 'react-router-dom'
import img from '../img/icon.png';

const NavBar1 = () => {
    return (
        <nav className="nav">
            <Link to="/" className="logo"><img src={img} alt="logo" /></Link>
            <div className="links">
                <Link to="/signup" className="nav-link">S'inscrire</Link>
                <Link to="/login" className="nav-link">Se connecter</Link>
                <Link to="/articles" className="nav-link">Articles</Link>
            </div>
        </nav>
    );
}

export default NavBar1;

//className="links"