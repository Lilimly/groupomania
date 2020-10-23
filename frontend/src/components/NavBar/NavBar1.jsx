import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"; 
import Form from "react-bootstrap/Form"; 
import FormControl from "react-bootstrap/FormControl"; 
import Button from "react-bootstrap/Button"; 
import img from '../../images/icon.png';
import AuthApi from '../AuthApi';

const NavBar1 = () => {
    const Auth = React.useContext(AuthApi);


    let navDiv;
    if (Auth) {
        const userLog = JSON.parse(localStorage.getItem('userConnect'));
        const userId = userLog.userId;

        navDiv = <>
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
        navDiv = <Nav className="mr-auto">
                <Link to="/signup" className="nav-link">S'inscrire</Link>
                <Link to="/login" className="nav-link">Se connecter</Link>
            </Nav>
    }

    return (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Link to="/" className="logo"><img src={img} alt="logo" /></Link>
            {navDiv}
        </Navbar>
    )
}

export default NavBar1;