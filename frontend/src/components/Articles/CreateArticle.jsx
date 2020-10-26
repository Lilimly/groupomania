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
            title: this.state.title,
            content: this.state.content,
            articleUrl: this.state.articleUrl,
            imageUrl: this.state.imageUrl
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

        const formData = new FormData();
        for (let name in this.state) {
            formData.append(name, this.state[name]);
        }
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('image', imagedata);

        //formData.append('test', 'valeur');

        console.log(formData);
        const requestOptions = {
            method: 'post',
            headers: { 
                'Authorization': token
            },
            body: formData
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
                    <label>
                        Selectionnez une photo
                        <input className="form-control" type="file" name="imageUrl" onChange={this.handleChange}/>
                    </label>
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