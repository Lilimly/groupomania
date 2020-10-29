import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';

class DeleteComment extends React.Component {
    state = { redirection: false };

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault()

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  storage.token;
      
        const requestOptions = {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };
        console.log(this.state)

        const commentPage = JSON.parse(localStorage.getItem('commentPage'))
        let commentId = commentPage.id

        fetch(('http://localhost:8080/api/comments/' + commentId), requestOptions)
                .then(response => response.json())
                .then(() => 
                this.setState({ redirection: true }),
                alert("Votre commentaire à bien été supprimé !"))
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
        });
    }

    render () {
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/articles' />;
        }

        return <>
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer ce commentaire ?</h1>
                <div className="form-submit">
                    <Link to={'/articles/'} className="btn btn-outline-info btn-sm">Retour aux articles</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={this.handleSubmit}>Supprimer ce commentaire</button>
                </div>
            </div>
        </>
    };
};

export default DeleteComment;