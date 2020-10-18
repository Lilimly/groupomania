import React from 'react';
import {Redirect} from 'react-router-dom';
import NavBar1 from './NavBar1';
import Field from './Field';

class UpdateAccount extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)
        this.state = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            bio: this.state.bio,
            imageUrl: this.state.imageUrl,
            email: this.state.email,
            password: this.state.password
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

        let userId = this.props.match.params.id;

        console.log('id', userId)

        fetch(('http://localhost:8080/api/users/' + userId), requestOptions)
                .then(response => response.json())
                .then(() => this.setState({ redirection: true }))
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }

    render() {
        const { redirection } = this.state;
        let userId = this.props.match.params.id;
        if (redirection) {
            return <Redirect to={'/user/' + userId}/>;
        }

        return <>
            <NavBar1 />
            <div className="container">
                <h1>Modifiez votre profil</h1>
                <form>
                    <Field name="firstname" value={this.state.firstname} onChange={this.handleChange}>Prénom</Field>
                    <Field name="lastname" value={this.state.lastname} onChange={this.handleChange}>Nom</Field>
                    <Field name="bio" value={this.state.bio} onChange={this.handleChange}>Rédigez une bio</Field>
                    <Field name="imageUrl" value={this.state.imageURL} onChange={this.handleChange}>Modifier votre photo</Field>
                    <Field name="email" value={this.state.email} onChange={this.handleChange}>Email</Field>
                    <Field name="password" value={this.state.password} onChange={this.handleChange}>Mot de passe</Field>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                    </div>
                    {JSON.stringify(this.state)}
                </form>
            </div>
        </>
    };
};

export default UpdateAccount;

/*         let userId = this.props.match.params.id;
        fetch('http://localhost:8080/api/users/' + userId)
        .then(response => response.json())
        .then(result => this.setState(result)
        .catch(error => {
            this.setState({ Erreur: error.toString() });
            console.error('There was an error!', error);
    }) */