const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: process.cwd() + '/.env' });

// Connexion à la base de données avec mongoose
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'lilimly',
    password : 'Yipi2616!',
    database : 'groupomania'
  });
  
  connection.connect();
  
  connection.query('SELECT * FROM User', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
  });
  
  connection.end();

  const app = express();

  // Définition de cheaders pour éviters les erreurs de CORS
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
  
  app.use(bodyParser.json());

module.exports = app;