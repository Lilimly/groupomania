import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import Comments from "../Comments/Comments";
import Badge from 'react-bootstrap/Badge'


function ArticlePage ({ match }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [article, setArticle] = useState([]);

    const [likes, setLikes] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " +  storage.token;
    let userId = storage.userId;
    
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
        fetch("http://localhost:8080/api/users/", 
            {headers: 
                {"Authorization" : token}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUsers(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [token])

    useEffect(() => {
        fetch("http://localhost:8080/api/articles/" + articleId + "/likes/" ,
            {headers: 
                {"Authorization" : token},
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setLikes(result.data.length);
                    console.log(result.data.length)
                    localStorage.setItem('likes', JSON.stringify(result.data));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [articleId, token])

    function LikeSubmit () {
        fetch('http://localhost:8080/api/likes/', {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                articleId: articleId,
                userId: userId,
                like: 1
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                setLikes(result.like)
                    setIsLoaded(true);
        }, (error) => {
            if(error) {
                setError(error);
            }
        })
    }    

    let userAuth;
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (article.userId === storage.userId || storage.userAdmin === true) {
        userAuth = <div className="article-button">
            <button className="btn btn-outline-info btn-sm" onClick={() => {history.push("/articleupdate/" + articleId)}}>Modifier</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => {history.push("/articledelete/" + articleId)}}>Supprimer</button>
        </div>
    }       

    return (
        <>
            <div className="container">
                <h1>{article.title} </h1>
                <div className="article-content">
                    {users.map((user) => {
                        if(article.userId === user.id){
                        return <h2 key={"h2" +user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + article.id} className="nav-link">{user.firstname} {user.lastname}</Link></h2>
                        } else {
                            return null
                        }
                    })}
                    <p><Moment fromNow key={"date" + article.id}>{article.createdAt}</Moment></p>
                    <div className="article-page">
                        <div className= "show-article">
                            <p>{article.content}</p>
                            {article.articleUrl
                            ? <a target="_blank" rel="noopener noreferrer" className="nav-link" href={article.articleUrl} >{article.articleUrl}</a> : null}
                        </div>
                        {userAuth}
                    </div>
                    <div className="likes">
                    <button onClick={LikeSubmit}>
                        <Badge  pill variant="danger">
                            Likes : {likes}
                        </Badge>
                    </button>

                    </div>
                </div>
                <Comments />
            </div>
        </>
    );
};

export default ArticlePage;

/*


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
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [articleId, token])

                <div className="comment-div">
                    <h2>Laissez un commentaire ici  :</h2> 
                    <Comments />
                    <h2>Article commenté {comments.length} fois.</h2>
                    {comments.map((comment) => (
                        <div className="comment-card" key={"fragment" + comment.id}>
                            {users.map((user) => {
                                if(comment.userId === user.id){
                                return <h3 key={"h3" +user.id}>Publié par <Link to={"/users/" + user.id} key={comment.id + user.id} className="nav-link">{user.firstname} {user.lastname}</Link></h3>
                                } else {
                                    return null
                                }
                            })}
                            <p key={"commenth3" + comment.id}>le <Moment format="DD MMM YYYY" date={comment.createdAt} /></p>
                            <Link to={"/commentpage/" + comment.id} key={"comment" + comment.id} className="nav-link">{comment.content}</Link>
                        </div>
                    ))}
                </div>
*/