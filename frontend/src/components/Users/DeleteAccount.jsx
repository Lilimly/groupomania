import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import AuthApi from '../AuthApi';
import Cookies from 'js-cookie';

function DeleteAccount () {
    const [error, setError] = useState(null);
    const Auth = React.useContext(AuthApi);

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    const userId = storage.userId;
    let token = "Bearer " +  storage.token;

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
            () => {
                Auth.setAuth(false);
                Cookies.remove("user");
                localStorage.clear();
            },
            (error) => {
                setError(error);
            }
        )
    }, [Auth, userId, token])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (<>
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
                <div className="form-submit">
                    <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">Retour à mon compte</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer mon compte</button>
                </div>
            </div>
        </>
        );
    } 
}

export default DeleteAccount;