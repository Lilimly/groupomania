import React from 'react';
import {Link} from 'react-router-dom'
import img from '../../images/icon.png';

const NavBar2 = () => {

    const userLog = JSON.parse(localStorage.getItem('userConnect'));
    const userId = userLog.userId;

    console.log(userId)
    
    return (
        <nav className="nav">
            <Link to="/articles" className="logo"><img src={img} alt="logo" /></Link>
            <div className="links">
                <Link to="/articles" className="nav-link">Articles</Link>
                <Link to={"/user/" + userId} className="nav-link">Mon compte</Link>
            </div>
        </nav>
    );
}

export default NavBar2;