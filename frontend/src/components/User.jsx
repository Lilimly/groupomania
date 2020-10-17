import React, { useState, useEffect } from 'react';
import NavBar2 from './NavBar2';
import img from '../img/icon.png';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const User = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8080/api/users/")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setUsers(result.data);
                console.log(result.data);
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
                    <h1>Bienvenue !</h1>
                    {users.map((user) => (
                        <div className="article-card">
                            <img src={img} alt="user" />
                            <div className= "show-article">
                                <h2>{user.firstname}</h2>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    } 
};

export default User;