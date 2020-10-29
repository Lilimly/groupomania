import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../../images/icon.png';

const UsersPage = ({match}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const [articles, setArticle] = useState([]);

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    const userId = match.params.id;
    let token = "Bearer " +  storage.token;

    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + userId,
        {headers: 
            {"Authorization" : token}
        })
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
    }, [userId, token])

    useEffect(() => {
        fetch("http://localhost:8080/api/users/" + userId + "/articles/" ,
            {headers: 
                {"Authorization" : token},
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setArticle(result.data);
                    localStorage.setItem('userArticles', JSON.stringify(result.data));
                    console.log(JSON.parse(localStorage.getItem('userArticles')))
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [userId, token])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <div className="container">
                <h1>Bienvenue {user.firstname} !</h1>
                <div className="user-page">
                {user.imageUrl ?
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={"http://localhost:8080/images/" + user.imageUrl}
                        alt="user"
                        key={"userImage" + user.id}
                    /> : 
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={img}
                        alt="user"
                        key={"userImage" + user.id}
                    />
                    }
                        
                    <div className= "show-article">
                        <h2>{user.firstname} {user.lastname}</h2>
                        <p>{user.bio}</p>
                    </div>
                </div>
                <div className="user-article">
                    <h2>Articles publiés par {user.firstname}</h2>
                    {articles.map((article) => (
                        <React.Fragment key={"user" + article.id}>
                            <Link to={"/article/" + article.id} key={"article" + article.id} className="nav-link">{article.title}</Link>
                            <p key={"articlep" + article.id}>{article.content}</p>
                            <p key={"date" + article.id}>Publié le {article.createdAt} </p>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UsersPage;