import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'

class UpdateArticle extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)
        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const storage = JSON.parse(localStorage.getItem('userConnect'));

        this.state = {
            userId: storage.userId,
            isAdmin: storage.userAdmin,
            title: articlePage.title,
            content: articlePage.content,
            articleUrl: articlePage.articleUrl
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const name = e.target.name;
        const value =  e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  storage.token;
      
        const requestOptions = {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };

        let articlePage = JSON.parse(localStorage.getItem('articlePage'));
        let articleId = articlePage.id;

        fetch(('http://localhost:8080/api/articles/' + articleId), requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.error) { 
                        alert("Votre article n'a pas pu être modifié."); 
                    } else { 
                        this.setState({ redirection: true })
                        alert("Votre article à bien été modifié !")
                    }
                }
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }

    render() {
        const { redirection } = this.state;
        const articleId = this.props.match.params.id;
        if (redirection) {
            return <Redirect to={'/article/' + articleId}/>;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Modifiez cet article</h1>
                <form>
                    <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Contenu de l'article</Form.Label>
                        <Form.Control as="textarea" rows={8} name="content" value={this.state.content} onChange={this.handleChange} />
                    </Form.Group>
                    <Field name="articleUrl" value={this.state.articleUrl} onChange={this.handleChange}>Partagez un lien d'article</Field>
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to='/articles/' className="btn btn-outline-info btn-sm">Retour aux articles</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default UpdateArticle;