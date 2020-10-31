import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Field from '../Form/Field';

class UpdateAccount extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)
        const userAccount = JSON.parse(localStorage.getItem('userAccount'));

        this.state = {
            firstname: userAccount.firstname,
            lastname: userAccount.lastname,
            bio: userAccount.bio,
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
                "Content-type" : 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/users/' + userId), requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.error) { 
                        alert("Votre compte n'a pas pu être modifié.")
                    } else { 
                        this.setState({ redirection: true })
                    }
                })
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
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">retour à mon compte</Link>
                    </div>
                </form>
            </div>
        </>
    };
};

export default UpdateAccount;