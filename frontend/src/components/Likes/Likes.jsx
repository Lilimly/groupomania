import React from 'react';
import { Component } from 'react';
import Badge from 'react-bootstrap/Badge'

class Likes extends Component {

    constructor (props) {
        super(props)

        this.state = {
            articleId: '',
            userId: '',
            like: 0,
        }
        this.increment = this.increment.bind(this);
    }

    increment = (event) => {
        event.preventDefault();

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let userId = storage.userId;

        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const articleId = articlePage.id;

        let token = "Bearer " +  storage.token;

        const requestOptions = {
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
        };

        fetch(('http://localhost:8080/api/likes/'), requestOptions)
                .then(response => response.json())
                .then(() => 
                    this.setState(),
                    )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }

    render() {
        return (
            <button onClick={(this.increment)}>
                <Badge  pill variant="danger">
                    Likes
                </Badge>
            </button>
        )
    }
}

export default Likes;
