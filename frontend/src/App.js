//imports
import React, {useState} from 'react';
import {BrowserRouter as Router, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Routes from './components/Routes';
import AuthApi from './components/AuthApi';
import img from './images/icon.png';
//import NavBar1 from './components/NavBar/NavBar1';

//import CSS & bootsrapreact
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"; 
import Form from "react-bootstrap/Form"; 
import FormControl from "react-bootstrap/FormControl"; 
import Button from "react-bootstrap/Button"; 
import './css/App.css';

// Composant App
function App() {
  const [auth, setAuth] = React.useState(false);
  const [navState, setNavState] = useState(false);

  // gestion des cookies
  const readCookie = () => {
    const user = Cookies.get("user");
    if(user) {
      setAuth(true);
      setNavState(true);
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])

  // gestion de la NavBar
  let navLink;
  if (navState) {
      const userLog = JSON.parse(localStorage.getItem('userConnect'));
      const userId = userLog.userId;

      navLink = <>
              <Nav className="mr-auto">
                  <Link to="/articles" className="nav-link">Tous les articles</Link>
                  <Link to={"/user/" + userId } className="nav-link">Mon compte</Link>
              </Nav>
              <Form inline>
                  <FormControl type="text" placeholder="Recherche" className="mr-sm-2" />
                  <Button variant="outline-info">Rechercher</Button>
              </Form>
          </>
  } else {
      navLink = <Nav className="mr-auto">
              <Link to="/signup" className="nav-link">S'inscrire</Link>
              <Link to="/login" className="nav-link">Se connecter</Link>
          </Nav>
  }

  return (
    <>
      <AuthApi.Provider value={{auth, setAuth}}>
        <Router>
          <Navbar sticky="top" bg="dark" variant="dark">
              <Link to="/" className="logo"><img src={img} alt="logo" /></Link>
              {navLink}
          </Navbar>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </>
  );
}

export default App;