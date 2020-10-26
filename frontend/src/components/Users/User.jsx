import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthApi from '../AuthApi';
import Cookies from 'js-cookie';
import img from '../../images/icon.png';

const User = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const history = useHistory();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    const userId = storage.userId;
    let token = "Bearer " +  storage.token;

    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + userId,
        {headers: 
            {"Authorization" : token}
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setUser(result);
                localStorage.setItem('userAccount', JSON.stringify(result));
                console.log(JSON.parse(localStorage.getItem('userAccount')));
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [userId, token])

    const Auth = React.useContext(AuthApi);

    const handleOnclick = () => {
        Auth.setAuth(false);
        Cookies.remove("user");
        localStorage.clear();
    }

    let idUser;
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (user.id === userId) {
        idUser = <div className="user-button">
            <button className="btn btn-outline-info btn-sm" onClick={() => {history.push("/userupdate/" + userId)}}>Modifier mon compte</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => {history.push("/userdelete/" + userId)}}>Supprimer mon compte</button>
            <button className="btn btn-outline-dark btn-sm" onClick={handleOnclick}>Me déconnecter</button>  
        </div>
    }

    return (
        <>
            <div className="container">
                <h1>Bienvenue {user.firstname} !</h1>
                <div className="user-page">
                    <img src={img} alt="user" key={"userImage" + user.id} />
                    <div className= "show-article">
                        <h2>{user.firstname} {user.lastname}</h2>
                        <p>{user.bio}</p>
                    </div>
                    {idUser}
                </div>
            </div>
        </>
    );
};

export default User;
