import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import img from '../../images/icon.png';

const Articles = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " + storage.token;

    useEffect(() => {
      fetch("http://localhost:8080/api/articles", 
        {headers: 
            {"Authorization" : token}
        })
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
    }, [token])

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
                    console.log(result.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [token])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <>   
                <div className="container">
                    <h1>Tous les articles publiés</h1>
                    <div className="form-submit">
                        <button className="btn btn-outline-info btn-sm" onClick={() => {history.push("/createarticle/")}}>Publier un article</button>
                    </div>
                    {articles.map((article) => (
                        <div  className="article-card" key={"articleCard" + article.id}>
                            {users.map((user) => {
                                    if (user.id === article.userId && user.imageUrl) {
                                    return <img src={"http://localhost:8080/images/" + user.imageUrl} alt="user" key={"userImage" + article.id} />
                                    } else if (user.id === article.userId && !user.imageUrl) {
                                        return <img src={img} alt="user" key={"userImage" + article.id} />
                                    } else {
                                        return null
                                    }
                                })}
                            <div className= "show-article" key={"show" + article.id}>
                                {users.map((user) => {
                                    if(user.id === article.userId){
                                        return <h2 key={"h2" +user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + article.id}className="nav-link">{user.firstname} {user.lastname}</Link></h2>
                                    } else {
                                        return null
                                    }
                                })}
                                <Link to={"/article/" + article.id} key={"article" + article.id} className="nav-link">{article.title}</Link>
                                <p key={"content" + article.id}>{article.content}</p>
                                <p key={article.createdAt} id="created-at"><Moment fromNow key={"date" + article.id}>{article.createdAt}</Moment></p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    } 
};

export default Articles;
