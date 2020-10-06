import React, {Component} from 'react';
import './css/User.css'

export default class User extends Component {

    constructor (props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    render () {
        return <div className="welcome">
            <h1>Bienvenue sur le Groupomania Social Network !</h1>
            
        </div>
    }
}