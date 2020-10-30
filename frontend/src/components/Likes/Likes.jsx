import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge'

class Likes extends Component {
    constructor (props) {
        super(props)

        this.state = {
            likeArray: ''
        }
        this.increment = this.increment.bind(this);
    }

    increment = (event) => {
        event.preventDefault();

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " + storage.token;
        let userId = storage.userId;

        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const articleId = articlePage.id;

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
                .then((result) => {
                    console.log(result.like)
                    if (result.like === 0) {
                        this.setState({
                            likedOn: false,
                        })
                    } else if (result.like === 1) {
                        this.setState({
                            likedOn: true
                        })
                    }
                })
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });     
        }

    render() {
        return (<>
            
            <button onClick={(this.increment)}>
                <Badge  pill variant="danger">
                    Likes : {this.state.likeArray}
                </Badge>
            </button>
            </>
        )
    }
}

export default Likes;
