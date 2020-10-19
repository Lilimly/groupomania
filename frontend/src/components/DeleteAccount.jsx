import * as React from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavBar2 from './NavBar2';

class DeleteAccount extends React.Component {
    state = { redirection: false };

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault()
      
        const requestOptions = {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token' 
            },
            body: JSON.stringify(this.state)
        };

        let userId = this.props.match.params.id;

        fetch(('http://localhost:8080/api/users/' + userId), requestOptions)
                .then(response => response.json())
                .then(() => this.setState({ redirection: true }))
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
        });
    }

    render () {
        const { redirection } = this.state;
        let userId = this.props.match.params.id;
        if (redirection) {
            return <Redirect to='/' />;
        }

        return <>
            <NavBar2 />
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
                <div className="form-submit">
                    <Link to={'/user/' + userId} className="btn btn-primary">Non ! Retour à mon compte</Link>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Oui ! Supprimer mon compte</button>
                </div>
            </div>
        </>
    };
};

export default DeleteAccount;