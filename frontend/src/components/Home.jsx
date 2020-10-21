import React from 'react';
import {Link} from 'react-router-dom';
import NavBar1 from './NavBar/NavBar1';

const Home = () => {
    return (
        <>
            <NavBar1 />
            <div className="container">
                <h1>Bienvenue sur le Groupomania Social Network !</h1>
                <p><Link to="/login">Connectez-vous</Link> au réseau social de Groupomania pour échanger avec vos collégues sans plus tarder ! <br />
                <br />
                Si vous n'avez pas encore de compte, <Link to="/signup">inscrivez-vous ici</Link> !</p>
            </div>
        </>
    );
}

export default Home;