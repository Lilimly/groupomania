import React from 'react';
import {Link} from 'react-router-dom'

const NavBar1 = () => {
    return <nav>
        <Link to="/" className="logo">Groupomania Social Network</Link>
        <div className="links">
            <Link to="/signup">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
            <Link to="/articles">Articles</Link>
        </div>
    </nav>;
}

export default NavBar1;