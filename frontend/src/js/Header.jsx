import React, {Component} from 'react';
import './css/index.css';


export default class Header extends Component {

    render () {
        return <header className="header">
            <a href="index.html" className="logo-groupomania">
                <img src="/img/logo-black.png" title="groupomania" alt="logo groupomania"/>
            </a>
            <a href="index.html" className="connect">S'inscrire</a>
            <a href="index.html" className="connect">Se connecter</a>
      </header>
    }
}