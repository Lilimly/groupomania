import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import NavBar2 from '../NavBar/NavBar2';
import AuthApi from '../AuthApi';
import Cookies from 'js-cookie';

function DeleteAccount () {
    const [error, setError] = useState(null);
    const Auth = React.useContext(AuthApi);

    const userAccount = JSON.parse(localStorage.getItem('userAccount'));
    const userId = userAccount.id;

    const handleSubmit = useCallback(function (value) {

        const userAccount = JSON.parse(localStorage.getItem('userAccount'));
        const userId = userAccount.id;

        fetch(('http://localhost:8080/api/users/' + userId), {
            method: "delete",
            headers: { "Content-type" : 'application/json'},
            body: JSON.stringify({
                id: value.id
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                localStorage.setItem('userConnect', JSON.stringify(result));
            },
            (error) => {
                setError(error);
            }
        )

        Auth.setAuth(false);
        Cookies.remove("user");
        localStorage.clear();

    }, [Auth])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (<>
            <NavBar2 />
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
                <div className="form-submit">
                    <Link to={'/user/' + userId} className="btn btn-primary">Non ! Retour à mon compte</Link>
                    <button className="btn btn-primary" onClick={handleSubmit}>Oui ! Supprimer mon compte</button>
                </div>
            </div>
        </>
        );
    } 
}

export default DeleteAccount;