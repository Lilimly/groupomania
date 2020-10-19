import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavBar2 from './NavBar2';
import img from '../img/icon.png';

const Articles = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const history = useHistory();
  
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
                <NavBar2 />
                <div className="container">
                    <h1>Voici tous les articles !</h1>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={() => {history.push("/createarticle/")}}>Publier un article</button>
                    </div>
                    {articles.map((article) => (
                        <div className="article-card">
                            <img src={img} alt="user" />
                            <div className= "show-article">
                                <h2>Nom de l'utilisateur</h2>
                                <Link to={"/article/" + article.id} className="nav-link">{article.title}</Link>
                                <p>{article.content}</p>
                                <Link to={article.articleUrl} className="nav-link">{article.articleUrl}</Link>
                                <p>{article.imageUrl}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    } 
};

export default Articles;
