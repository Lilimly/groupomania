import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ImageUpdate extends React.Component {

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
        .then(function (res) { 
            if (res.ok) { 
            alert("Votre image à bien été modifiée !"); 
            } else if (res.status === 401) { 
                alert("Oops! "); 
            } 
            }, function (e) { 
                alert("Une erreur s'est produite : " + e); 
            }); 
        } 

    render() {
        const storage = JSON.parse(localStorage.getItem('userConnect'));
        const userId = storage.userId;

        return <>
            <form className="addPhotoForm" onSubmit={this.handleSubmit}>
                <input className="form-control" type="file" name="imageUrl" />
                <Button color="success" type="Submit">Add</Button>
            </form>
            <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">retour à mon compte</Link>
        </>
    }
}

export default ImageUpdate;

/*  images:

        const formData = new FormData();
        for (let name in this.state) {
            formData.append(name, this.state[name]);
        }
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('image', imagedata);

       <label>
            Selectionnez une photo
            <input className="form-control" type="file" name="imageUrl" onChange={this.handleChange}/>
        </label> */