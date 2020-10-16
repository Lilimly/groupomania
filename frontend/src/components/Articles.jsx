import React, { useState, useEffect } from 'react';
import NavBar1 from './NavBar1';
import img from '../img/icon.png';

const Articles = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8080/api/articles")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setArticles(result.data);
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
                <NavBar1 />
                <div className="container">
                    <h1>Voici tous les articles !</h1>
                    {articles.map((article) => (
                        <div className="article-card">
                            <img src={img} alt="user" />
                            <div className= "show-article">
                                <h2>Nom de l'utilisateur</h2>
                                <h3>{article.title}</h3>
                                <p>{article.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    } 
};

export default Articles;
