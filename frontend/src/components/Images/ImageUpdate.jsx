import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ImageUpdate extends React.Component {

    state = { redirection: false }
    constructor(props) {
        const storage = JSON.parse(localStorage.getItem('userConnect'));

        super(props)
        this.state = {
            userId: storage.userId,
            isAdmin: storage.userAdmin,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) { 
        e.preventDefault();

        const formData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('image', imagedata);

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        const userId = storage.userId;
        let token = "Bearer " +  storage.token;
    
        fetch("http://localhost:8080/api/users/" + userId,
        {
            method: 'put',
            headers: {"Authorization" : token}, 
            body: formData 
        })
        .then((res) => { 
            this.setState({ redirect: true })
            if (res.ok) { 
            alert("Votre image à bien été modifiée !"); 
            } else if (res.status === 401) { 
                alert("Une erreur s'est produite, rententez ! "); 
            } 
            }, function (e) { 
                alert("Une erreur s'est produite : " + e); 
            }); 
        } 

    render() {
        const storage = JSON.parse(localStorage.getItem('userConnect'));
        const userId = storage.userId;

        const { redirect } = this.state;
        if (redirect) {
         return <Redirect to={'/user/' + userId}/>;
      }

    return <div className="container">
                <h1>Modifiez votre photo de profil</h1>
                <div className="update-image">
                    <form className="addPhotoForm" onSubmit={this.handleSubmit}>
                        <input className="form-control" type="file" name="imageUrl" />
                        <Button color="success" type="Submit">Add</Button>
                    </form>
                    <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">retour à mon compte</Link>
                </div>
        </div>
    }
}

export default ImageUpdate;