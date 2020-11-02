import React, { useCallback} from 'react';
import { Redirect, Link } from 'react-router-dom';

function DeleteUserAccount ({ match }) {
    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " +  storage.token;
    let userId = match.params.id;

    const handleSubmit = useCallback(function (value) {

        fetch(('http://localhost:8080/api/users/' + userId), {
            method: "delete",
            headers: 
                { "Content-type" : 'application/json',
                'Authorization': token
                },
            body: JSON.stringify({
                id: value.id
            })
        })
        .then(res => res.json())
        .then(
            (res) => {
                if (res.error) { 
                    alert("Ce compte n'a pas pu être supprimé."); 
                } else { 
                    alert("Compte supprimé !")
                    return <Redirect to='/articles' />
                }
            }
        )
        .catch(error => {
            this.setState({ Erreur: error.toString() });
            alert("Ce compte n'a pas pu être supprimé !");
            console.error('There was an error!', error);
        })
    }, [userId, token])

    return (
        <div className="container">
            <h1>Souhaitez vous vraiment supprimer ce compte ?</h1>
            <div className="form-submit">
                <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">Retour au compte utilisateur</Link>
                <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer ce compte</button>
            </div>
        </div>
    );
}

export default DeleteUserAccount;