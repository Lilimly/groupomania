import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const CommentPage = ({ match }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comment, setComment] = useState([]);
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

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    }

    return (<div className="container">
        <h1>Commentaire :</h1>
        <h2>{comment.content} </h2>
        <p id="created-at">Publié par {comment.userId}, le : {comment.createdAt}</p>
            {comment.userId === storage.userId 
            ? <div className="post-option">
                <Button variant="outline-info" size="sm" onClick={() => {history.push("/updatecomment/" + commentId)}}>
                    Modifier
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => {history.push("/deletecomment/" + commentId)}}>
                    Supprimer
                </Button>
            </div>
            : <p></p>
            }
        </div>
    );
}

export default CommentPage;