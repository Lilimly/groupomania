import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const CommentPage = ({ match }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comment, setComment] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " +  storage.token;

    let commentId = match.params.id;

    useEffect(() => {
        fetch('http://localhost:8080/api/comments/' + commentId,
        {headers: 
            {"Authorization" : token}
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setComment(result);
                localStorage.setItem('commentPage', JSON.stringify(result));
                console.log(JSON.parse(localStorage.getItem('commentPage')))
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [commentId, token])

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
    }

    return (<div className="container">
        <h1>Commentaire :</h1>
        <div className="comment-card">
            {users.map((user) => {
                if(comment.userId === user.id){
                return <h3 key={"h3" + comment.id}>Publié par <Link to={"/users/" + user.id} key={comment.id + user.id} className="nav-link">{user.firstname} {user.lastname}, </Link> le {comment.createdAt}</h3>
                } else {
                    return null
                }
            })}
            <p>{comment.content} </p>
                {comment.userId === storage.userId || storage.userAdmin === true
                ? <div className="post-option">
                    <Button variant="outline-info" size="sm" onClick={() => {history.push("/updatecomment/" + commentId)}}>
                        Modifier
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => {history.push("/deletecomment/" + commentId)}}>
                        Supprimer
                    </Button>
                </div> : <></>
                }
            </div>
        </div>
    );
}

export default CommentPage;