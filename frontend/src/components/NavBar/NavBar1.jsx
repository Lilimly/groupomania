import React from 'react';
import {Link} from 'react-router-dom';
import img from '../../images/icon.png';
import ComponentRandom from "../ComponentRandom"

const NavBar1 = () => {
    return (
        <nav className="nav">
            <Link to="/" className="logo"><img src={img} alt="logo" /></Link>
            <ComponentRandom />
            <div className="links">
                <Link to="/signup" className="nav-link">S'inscrire</Link>
                <Link to="/login" className="nav-link">Se connecter</Link>
            </div>
        </nav>
    );
}

export default NavBar1;

//className="links"