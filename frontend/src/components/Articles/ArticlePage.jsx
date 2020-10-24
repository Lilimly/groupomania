import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Comments from "./Comments"

const ArticlePage = ({ match }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [article, setArticle] = useState([]);
    const [comments, setComment] = useState([]);
    const history = useHistory();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " +  storage.token;
    
    let articleId = match.params.id;

    useEffect(() => {
      fetch("http://localhost:8080/api/articles/" + articleId, 
        {headers: 
            {"Authorization" : token}
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setArticle(result);
                localStorage.setItem('articlePage', JSON.stringify(result));
                console.log(JSON.parse(localStorage.getItem('articlePage')))
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [articleId, token])

    useEffect(() => {
        fetch("http://localhost:8080/api/articles/" + articleId + "/comments/" , 
          {headers: 
              {"Authorization" : token},
          })
          .then(res => res.json())
          .then(
              (result) => {
                  setIsLoaded(true);
                  setComment(result.data);
                  console.log(result.data)
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )
      }, [token])

    let userAuth;

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (article.userId === storage.userId) {
        userAuth = <div className="article-button">
            <button className="btn btn-outline-info btn-sm" onClick={() => {history.push("/articleupdate/" + articleId)}}>Modifier l'article</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => {history.push("/articledelete/" + articleId)}}>Supprimer l'article</button>
        </div>
    }       

    return (
        <>
            <div className="container">
                <h1>{article.title} </h1>
                <p id="created-at">Publié par {article.userId} le : {article.createdAt}</p>
                <div className="article-page">
                    <div className= "show-article">
                        <p>{article.content}</p>

                        {article.articleUrl
                        ? <a target="_blank" rel="noopener noreferrer" className="nav-link" href={article.articleUrl} >{article.articleUrl}</a> : <p></p>}

                        {article.imageUrl
                        ? <img src={ article.imageUrl } alt="article" /> : <p></p>}

                        <Comments />
                    </div>
                    {userAuth}
                </div>
                <div className="comment-div">
                    {comments
                    ? <>
                    <h2>Commentaires</h2> 
                        {comments.map((comment) => (
                        <React.Fragment key={"fragment" + comment.id}>
                            <h3 key={"commenth3" + comment.id}>Publié par {comment.userId}, le {comment.createdAt} </h3>
                            <p key={"commentp" + comment.id}>{comment.content}</p>
                            {comment.userId === storage.userId 
                            ? <div>
                                <Button variant="outline-info" size="sm">
                                    Modifier
                                </Button>{' '}
                                <Button variant="outline-danger" size="sm">
                                    Supprimer
                                </Button>
                            </div>
                            : <p></p>
                            }
                        </React.Fragment>
                    ))}
                    </> : <p>Cet article ne posséde pas encore de commentaires ...</p>
                    }
                </div>
            </div>
        </>
    );
};

export default ArticlePage;