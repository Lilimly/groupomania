import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import NavBar2 from './NavBar2';
import img from '../images/icon.png';

const User = ({ match }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const history = useHistory();
    let userId = match.params.id

    console.log("id=" + userId)

    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + userId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setUser(result);
                localStorage.setItem('userAccount', JSON.stringify(result));
                console.log(JSON.parse(localStorage.getItem('userAccount')));
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [userId])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (!user.imageUrl) {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>Bienvenue {user.firstname} !</h1>
                    <div className="article-card">
                        <img src={img} alt="img" />
                        <div className= "show-article">
                            <h2>{user.firstname} {user.lastname}</h2>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => {history.push("/userupdate/" + userId)}}>Modifier mon compte</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>Bienvenue {user.firstname} !</h1>
                    <div className="article-card">
                        <img src={"../images/" + user.imageUrl } alt="go" />
                        <div className= "show-article">
                            <h2>{user.firstname} {user.lastname}</h2>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => {history.push("/userupdate/" + userId)}}>Modifier mon compte</button>
                </div>
            </>
        );
    } 
};

export default User;
