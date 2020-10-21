import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import NavBar2 from '../NavBar/NavBar2';

const ArticlePage = ({ match }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [article, setArticle] = useState([]);
    const history = useHistory();
    
    let articleId = match.params.id;

    console.log("id=" + articleId)

    useEffect(() => {
      fetch("http://localhost:8080/api/articles/" + articleId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setArticle(result);
                localStorage.setItem('articlePage', JSON.stringify(result));
                console.log(JSON.parse(localStorage.getItem('articlePage')));
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [articleId])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (!article.imageUrl) {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>{article.title} </h1>
                    <p id="created-at">Publié le : {article.createdAt}</p>
                    <div className="article-card">
                        <div className= "show-article">
                            <p>{article.content}</p>
                            <a target="_blank" rel="noopener noreferrer" className="nav-link" href={article.articleUrl} >{article.articleUrl}</a>
                        </div>
                    </div>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={() => {history.push("/articleupdate/" + articleId)}}>Modifier l'article</button>
                        <button className="btn btn-primary" onClick={() => {history.push("/articledelete/" + articleId)}}>Supprimer l'article</button>
                    </div>
                </div>
            </>
        );
    } else if (!article.articleUrl) {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>{article.title} </h1>
                    <p id="created-at">Publié le : {article.createdAt}</p>
                    <div className="article-card">
                        <div className= "show-article">
                            <p>{article.content}</p>
                            <img src={ article.imageUrl } alt="article" />
                        </div>
                    </div>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={() => {history.push("/articleupdate/" + articleId)}}>Modifier l'article</button>
                        <button className="btn btn-primary" onClick={() => {history.push("/articledelete/" + articleId)}}>Supprimer l'article</button>
                    </div>
                </div>
            </>
        );
    } else if (!article.articleUrl && !article.imageUrl) {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>{article.title} </h1>
                    <p id="created-at">Publié le : {article.createdAt}</p>
                    <div className="article-card">
                        <div className= "show-article">
                            <p>{article.content}</p>
                        </div>
                    </div>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={() => {history.push("/articleupdate/" + articleId)}}>Modifier l'article</button>
                        <button className="btn btn-primary" onClick={() => {history.push("/articledelete/" + articleId)}}>Supprimer l'article</button>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <NavBar2 />
                <div className="container">
                    <h1>{article.title} </h1>
                    <p id="created-at">Publié le : {article.createdAt}</p>
                    <div className="article-card">
                        <div className= "show-article">
                            <p>{article.content}</p>
                            <a target="_blank" rel="noopener noreferrer" className="nav-link" href={article.articleUrl} >{article.articleUrl}</a>
                            <img src={ article.imageUrl } alt="article" />
                        </div>
                    </div>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={() => {history.push("/articleupdate/" + articleId)}}>Modifier l'article</button>
                        <button className="btn btn-primary" onClick={() => {history.push("/articledelete/" + articleId)}}>Supprimer l'article</button>
                    </div>
                </div>
            </>
        );
    } 
};

export default ArticlePage;