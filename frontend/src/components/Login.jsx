import React from 'react';
import NavBar1 from './NavBar1';

const Field = ({name, value, onChange, children}) => {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control"/>
    </div>
}

class Login extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        const name = e.target.name;
        const value =  e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)
        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return <>
            <NavBar1 />
            <div className="container">
                <h1>Connectez-vous à votre compte</h1>
                <form>
                    <Field name="email" value={this.state.email} onChange={this.handleChange}>Email</Field>
                    <Field name="password" value={this.state.password} onChange={this.handleChange}>Mot de passe</Field>
                    <div className="form-group">
                        <button className="btn btn-primary">Se connecter</button>
                    </div>
                    {JSON.stringify(this.state)}
                </form>
            </div>
        </>
    }
}

export default Login;