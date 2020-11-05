import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';

class DeleteComment extends React.Component {
    state = { redirection: false };

    constructor (props) {
        super(props)

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));

        this.state = {
            userId: userConnect.userId,
            isAdmin: userConnect.userAdmin
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault()

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  userConnect.token;
      
        const requestOptions = {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };
        console.log(this.state)

        const commentId = this.props.match.params.id;

        fetch(('http://localhost:8080/api/comments/' + commentId), requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.error) { 
                        this.setState({ redirection: true })
                        alert("Ce commentaire n'a pas pu être supprimé."); 
                    } else { 
                        this.setState({ redirection: true })
                        alert("Commentaire publié !")
                    }
                })
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
        });
    }

    render () {
        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const articleId = articlePage.id;
        
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to={'/article/' + articleId}/>;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer ce commentaire ?</h1>
                <div className="form-submit">
                    <Link to={'/articles/'} className="btn btn-outline-info btn-sm">Retour aux articles</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={this.handleSubmit}>Supprimer ce commentaire</button>
                </div>
            </div>
        </React.Fragment>
    };
};

export default DeleteComment;