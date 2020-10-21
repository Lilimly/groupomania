import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavBar2 from '../NavBar/NavBar2';
import Field from '../Form/Field';
import InputFile from '../Form/InputFile';

class UpdateArticle extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)
        const articlePage = JSON.parse(localStorage.getItem('articlePage'));

        this.state = {
            title: articlePage.title,
            content: articlePage.content,
            articleUrl: articlePage.articleUrl,
            imageUrl: articlePage.imageUrl
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
      
        const requestOptions = {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token' 
            },
            body: JSON.stringify(this.state)
        };

        let articlePage = JSON.parse(localStorage.getItem('articlePage'));
        let articleId = articlePage.id
        console.log('id', articleId)

        fetch(('http://localhost:8080/api/articles/' + articleId), requestOptions)
                .then(response => response.json())
                .then(() => this.setState({ redirection: true }))
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/articles/'/>;
        }

        return <>
            <NavBar2 />
            <div className="container">
                <h1>Modifiez cet article</h1>
                <form>
                    <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                    <Field name="content" value={this.state.content} onChange={this.handleChange}>Contenu de l'article</Field>
                    <Field name="articleUrl" value={this.state.articleUrl} onChange={this.handleChange}>Partagez un lien d'article</Field>
                    <InputFile></InputFile>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to='/articles/' className="btn btn-primary">Retour aux articles</Link>
                    </div>
                    {JSON.stringify(this.state)}
                </form>
            </div>
        </>
    };
};

export default UpdateArticle;