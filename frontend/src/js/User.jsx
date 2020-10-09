import React, {useEffect, useState} from 'react';
import './css/User.css'

export default function User() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8080/api/users/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result.data);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <>
        {data.map(data => (
          <h1 className="welcome">
            Bienvenue sur le Groupomania Social Network 
            <br /> 
            {data.firstname} {data.lastname} !
          </h1>
        ))}
        <ul>
          {data.map(data => (
            <li key={data.id}>
              {data.firstname} : {data.bio}
            </li>
          ))}
        </ul>
      </>
    );
  }
}