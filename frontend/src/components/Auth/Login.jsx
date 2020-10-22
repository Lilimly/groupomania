import React, {useState, useCallback, useContext, useMemo, createContext} from 'react';
import AuthApi from '../AuthApi';
import Cookies from 'js-cookie';

const FormContext = createContext({})

function FormWithContext ({defaultValue, onSubmit, children}) {

    const [data, setData] = useState(defaultValue)

    const change = useCallback(function (name, value) {
        setData(d => ({...d, [name]: value}))
    }, [])

    const value= useMemo(function () {
        return {...data, change}
    }, [data, change])

    const handleSubmit = useCallback(function (e) {
        e.preventDefault()
        onSubmit(value)
    }, [onSubmit, value])

    return <FormContext.Provider value={value}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    </FormContext.Provider>
}

function FormField ({name, children}) {
    const data = useContext(FormContext)
    const handleChange = useCallback(function (e) {
        data.change(e.target.name, e.target.value)
    }, [data])

    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" name={name} id={name} className="form-control" value={data[name] || ''} onChange={handleChange}/>
    </div>
}

function PrimaryButton ({children}) {
    return <button className="btn btn-primary">{children}</button>
}

function Login () {
    const [error, setError] = useState(null);
    const Auth = React.useContext(AuthApi);

    const handleSubmit = useCallback(function (value) {

        fetch("http://localhost:8080/api/auth/login/", {
            method: "post",
            headers: { "Content-type" : 'application/json'},
            body: JSON.stringify({
                email: value.email,
                password: value.password
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                localStorage.setItem('userConnect', JSON.stringify(result));
                Auth.setAuth(true)
                Cookies.set("user", "loginTrue")
            },
            (error) => {
                setError(error);
            }
        )
    }, [Auth])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>Connectez-vous à votre compte</h1>
                    <FormWithContext onSubmit={handleSubmit}>
                        <FormField name="email">Email</FormField>
                        <FormField name="password">Mot de passe</FormField>
                        <PrimaryButton>Me connecter</PrimaryButton>
                    </FormWithContext>
                </div>
            </React.Fragment>
        );
    } 
}

export default Login;