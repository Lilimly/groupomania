import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Field from '../Form/Field';

class CreateArticle extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        const userId = userConnect.userId;
        console.log(userId);

        this.state = {
            userId: userId,
            title: "",
            content: "",
            articleUrl: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        const userId = userConnect.userId;

        const name = e.target.name;
        const value =  e.target.value;
        this.setState({
            userId: userId,
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  storage.token;

        const requestOptions = {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/articles/'), requestOptions)
                .then(response => response.json())
                .then(() => 
                this.setState({ redirection: true }),
                alert("Votre article à bien été publié !")
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/articles' />;
        }

        return <>
            <div className="container">
                <h1>Publiez un article</h1>
                <form>
                    <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                    <Field name="content" value={this.state.content} onChange={this.handleChange}>Contenu de l'article</Field>
                    <Field name="articleUrl" value={this.state.articleUrl} onChange={this.handleChange}>URL d'un article</Field>
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" onClick={this.handleSubmit}>Publiez l'article</button>
                        <Link to='/articles' className="btn btn-outline-info btn-sm">Retour aux articles</Link>
                    </div>
                    {JSON.stringify(this.state)}
                </form>
            </div>
        </>
    };
};

export default CreateArticle;