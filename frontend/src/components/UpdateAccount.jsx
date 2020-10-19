import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavBar2 from './NavBar2';
import Field from './Field';
import InputFile from './InputFile';

class UpdateAccount extends React.Component {

    state = { redirection: false };

    constructor (props) {
        super(props)
        const userAccount = JSON.parse(localStorage.getItem('userAccount'));
        console.log(userAccount.email)

        this.state = {
            firstname: userAccount.firstname,
            lastname: userAccount.lastname,
            bio: userAccount.bio,
            imageUrl: userAccount.imageurl,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
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
            <NavBar2 />
            <div className="container">
                <h1>Modifiez votre profil</h1>
                <form>
                    <Field name="firstname" value={this.state.firstname} onChange={this.handleChange}>Prénom</Field>
                    <Field name="lastname" value={this.state.lastname} onChange={this.handleChange}>Nom</Field>
                    <Field name="bio" value={this.state.bio} onChange={this.handleChange}>Rédigez une bio</Field>
                    <InputFile name="imageUrl" value={this.state.imageURL} ref={this.fileInput} onChange={this.handleChange}>Modifiez votre photo de profil</InputFile>
                    <div className="form-group">
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