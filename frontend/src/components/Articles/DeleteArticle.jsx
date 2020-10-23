import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';

class DeleteArticle extends React.Component {
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

        let articlePage = JSON.parse(localStorage.getItem('articlePage'));
        let articleId = articlePage.id

        fetch(('http://localhost:8080/api/articles/' + articleId), requestOptions)
                .then(response => response.json())
                .then(() => 
                this.setState({ redirection: true }),
                alert("Votre article à bien été supprimé !"))
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
                <h1>Souhaitez vous vraiment supprimer cet article ?</h1>
                <div className="form-submit">
                    <Link to={'/articles/'} className="btn btn-primary">Non ! Retour aux articles</Link>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Oui ! Supprimer cet article</button>
                </div>
            </div>
        </>
    };
};

export default DeleteArticle;