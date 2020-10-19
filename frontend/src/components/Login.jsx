import React from 'react';
import {Redirect} from 'react-router-dom';
import NavBar1 from './NavBar1';
import Field from './Field';



export default class Login extends React.Component {

    state = { redirection: false }

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

        fetch('http://localhost:8080/api/auth/login/', requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState(result);
                this.setState({ redirection: true })
            })
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('There was an error!', error);
        });

        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        const { redirection } = this.state;
        const userId = this.state.userId;
        
        if (redirection) {
        return <Redirect to={'/user/' + userId}/>;
        }

        return <>
            <NavBar1 />
            <div className="container">
                <h1>Connectez-vous à votre compte</h1>
                <form>
                    <Field name="email" value={this.state.email} onChange={this.handleChange}>Email</Field>
                    <Field name="password" value={this.state.password} onChange={this.handleChange}>Mot de passe</Field>
                    <div className="form-submit">
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Me connecter !</button>
                    </div>
                </form>
            </div>
        </>
    }
}