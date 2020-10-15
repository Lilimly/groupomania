import React, { useState, useEffect } from 'react';
import NavBar1 from './NavBar1';

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
                        <h2 key={article.id}>{article.title}</h2>
                    ))}
                </div>
            </>
        );
    } 
};

export default Articles;
