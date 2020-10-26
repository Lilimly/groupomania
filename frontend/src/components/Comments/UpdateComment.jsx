import React from 'react';
import {Redirect} from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class UpdateComment extends React.Component {
    state = { redirection: false };

    constructor (props) {
        super(props)

        const commentPage = JSON.parse(localStorage.getItem('commentPage'))

        this.state = {
            articleId: commentPage.articleId,
            userId: commentPage.userId,
            content: commentPage.content,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const name = e.target.name;
        const value =  e.target.value;
        const commentPage = JSON.parse(localStorage.getItem('commentPage'))

        this.setState({
            articleId: commentPage.articleId,
            userId: commentPage.userId,
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  userConnect.token;

        const commentPage = JSON.parse(localStorage.getItem('commentPage'));
        const commentId = commentPage.id;
      
        const requestOptions = {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/comments/' + commentId), requestOptions)
                .then(response => response.json())
                .then(() => 
                this.setState({ redirection: true }),
                alert("Votre commentaire à bien été modifié !")
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
        
            this.setState({
                articleId: '',
                userId: '',
                content: '',
            })
    }

    render() {
        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const articleId = articlePage.id;

        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to={'/article/' + articleId} />;
        }
        return (
            <div className="container">
                <h1>Modifiez votre commentaire</h1>
                <div className="post-comment">
                    <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="btnGroupAddon">Comment </InputGroup.Text>
                            </InputGroup.Prepend>
                        <FormControl
                        type="text"
                        name="content"
                        value={this.state.content}
                        aria-label="comment"
                        aria-describedby="btnGroupAddon"
                        onChange={this.handleChange}
                        />
                    </InputGroup>
                    <div className="form-submit">
                            <button className="btn btn-outline-info" onClick={this.handleSubmit}>Post</button>
                    </div>
                </div>
            </div>
        )
    };
};

export default UpdateComment;