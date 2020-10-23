import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Field from '../Form/Field';
import InputFile from '../Form/InputFile';

class UpdateAccount extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)
        const userAccount = JSON.parse(localStorage.getItem('userAccount'));

        this.state = {
            firstname: userAccount.firstname,
            lastname: userAccount.lastname,
            bio: userAccount.bio,
            imageUrl: userAccount.imageUrl
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
        const userId = storage.userId
        let token = "Bearer " +  storage.token;

        const requestOptions = {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/users/' + userId), requestOptions)
                .then(response => response.json())
                .then(() => this.setState({ redirection: true }))
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }

    render() {
        const userAccount = JSON.parse(localStorage.getItem('userAccount'));
        const userId = userAccount.id;

        const { redirection } = this.state;

        if (redirection) {
            return <Redirect to={'/user/' + userId}/>;
        }

        return <>
            <div className="container">
                <h1>Modifiez votre profil</h1>
                <form>
                    <Field name="firstname" value={this.state.firstname} onChange={this.handleChange}>Prénom</Field>
                    <Field name="lastname" value={this.state.lastname} onChange={this.handleChange}>Nom</Field>
                    <Field name="bio" value={this.state.bio} onChange={this.handleChange}>Rédigez une bio</Field>
                    <InputFile></InputFile>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to={'/user/' + userId} className="btn btn-primary">retour à mon compte</Link>
                    </div>
                    {JSON.stringify(this.state)}
                </form>
            </div>
        </>
    };
};

export default UpdateAccount;