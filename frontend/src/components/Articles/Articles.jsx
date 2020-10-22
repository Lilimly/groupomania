import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import img from '../../images/icon.png';

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
                <div className="container">
                    <h1>Voici tous les articles !</h1>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={() => {history.push("/createarticle/")}}>Publier un article</button>
                    </div>
                    {articles.map((article) => (
                        <div  className="article-card" key={"articleCard" + article.id}>
                            <img src={img} alt="user" key={"userImage" + article.id} />
                            <div className= "show-article" key={"show" + article.id}>
                                <h2 key={"userName" + article.id}>Nom de l'utilisateur</h2>
                                <Link to={"/article/" + article.id} key={"article" + article.id} className="nav-link">{article.title}</Link>
                                <p key={"content" + article.id}>{article.content}</p>
                                <p key={article.createdAt} id="created-at">Publié le : {article.createdAt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    } 
};

export default Articles;
