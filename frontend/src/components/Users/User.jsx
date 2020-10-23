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

    let imgUser;
    let idUser;
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (user.id === userId) {
        idUser = <div className="form-submit">
            <button className="btn btn-primary" onClick={() => {history.push("/userupdate/" + userId)}}>Modifier mon compte</button>
            <button className="btn btn-primary" onClick={() => {history.push("/userdelete/" + userId)}}>Supprimer mon compte</button>
            <button className="btn btn-primary" onClick={handleOnclick}>Me déconnecter</button>
        </div>
    }
     else if (!user.imageUrl) {
        imgUser = <img src={img} alt="img" />
    } else {
        imgUser = <img src={ user.imageUrl } alt="user" />;
    } 

    return (
        <>
            <div className="container">
                <h1>Bienvenue {user.firstname} !</h1>
                <div className="article-card">
                    {imgUser}
                    <div className= "show-article">
                        <h2>{user.firstname} {user.lastname}</h2>
                        <p>{user.bio}</p>
                    </div>
                </div>
                {idUser}
            </div>
        </>
    );
};

export default User;
