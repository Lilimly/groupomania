//imports
import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';
import Routes from './components/Routes';
import AuthApi from './components/AuthApi';

//import CSS
import './css/App.css';

// definition composant App
function App() {
  const [auth, setAuth] = React.useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if(user) {
      setAuth(true);
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])

  return (
    <>
      <AuthApi.Provider value={{auth, setAuth}}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </>
  );
}

export default App;