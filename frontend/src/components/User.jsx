import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import NavBar2 from './NavBar2';
import img from '../img/icon.png';

const User = ({ match }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    let userId = match.params.id

    console.log("id=" + userId)

    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + userId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setUser(result);
                console.log(result.firstname)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>Bienvenue {user.firstname} !</h1>
                    <div className="article-card">
                        <img src={img} alt="user" />
                        <div className= "show-article">
                            <h2>{user.firstname} {user.lastname}</h2>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary">Modifier mon compte</button>
                </div>
            </>
        );
    } 
};

export default User;
