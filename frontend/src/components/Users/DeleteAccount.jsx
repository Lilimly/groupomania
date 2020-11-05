import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import AuthApi from '../AuthApi';
import Cookies from 'js-cookie';

function DeleteAccount () {
    const Auth = React.useContext(AuthApi);

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    const userId = storage.userId;
    const isAdmin = storage.userAdmin;
    let token = "Bearer " +  storage.token;

    const handleSubmit = useCallback(function (value) {


        fetch(('http://localhost:8080/api/users/' + userId), {
            method: "delete",
            headers: 
                { "Content-type" : 'application/json',
                'Authorization': token
                },
            body: JSON.stringify({
                id: value.id,
                userId: userId,
                isAdmin: isAdmin
            })
        })
        .then(res => res.json())
        .then(
            (res) => {
                if (res.error) { 
                    alert("Votre compte n'a pas pu être supprimé."); 
                } else { 
                    alert("Compte supprimé !")
                    Auth.setAuth(false);
                    Cookies.remove("user");
                    localStorage.clear();
                }
            }
        )
        .catch(error => {
            this.setState({ Erreur: error.toString() });
            alert("Votre compte n'a pas pu être supprimé !");
            console.error('There was an error!', error);
        })
    }, [Auth, isAdmin, userId, token])

    return (
        <div className="container">
            <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
            <div className="form-submit">
                <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">Retour à mon compte</Link>
                <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer mon compte</button>
            </div>
        </div>
    );
}

export default DeleteAccount;