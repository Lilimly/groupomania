import React from 'react';
import ReactDOM from "react-dom";
import { Link, useHistory } from 'react-router-dom';
  
  
import NavBar2 from './NavBar/NavBar2';

const Test = ({ match }) => {

    const articleId = match.params.id;

    console.log(articleId)

        return (
            <>
                <NavBar2 />
                    <h1>Test</h1>
            </>
        );
    }

export default Test;