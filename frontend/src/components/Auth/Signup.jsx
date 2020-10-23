import React from 'react';
import {Redirect} from 'react-router-dom';
import Field from '../Form/Field';

class Signup extends React.Component {

    state = { redirection: false }

    constructor (props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
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
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token' 
            },
            body: JSON.stringify(this.state)
        };

        fetch('http://localhost:8080/api/auth/signup/', requestOptions)
                .then(response => response.json())
                .then(() => this.setState({ redirection: true }))
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });

        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        })
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
            alert("Votre compte à bien été créé ! Connectez-vous pour accéder aux derniers échanges.")

            return <Redirect to='/login'/>;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Inscrivez au réseau social de votre entreprise !</h1>
                <form>
                    <Field name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange}>Prénom</Field>
                    <Field name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange}>Nom</Field>
                    <Field name="email" type="text" value={this.state.email} onChange={this.handleChange}>Email</Field>
                    <Field name="password" type="password" value={this.state.password} onChange={this.handleChange}>Mot de passe</Field>
                    <div className="form-submit">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Envoyer !</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default Signup;