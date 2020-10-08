const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: process.cwd() + '/.env' });
const mysql = require('mysql2');

// Récupération de mes fichiers routes
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const likeRoutes = require('./routes/like');

// connexion DB mySQL
const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : '3306',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset  : 'UTF8_general_ci'
  });

connection.connect();

// test de requète 
connection.query('SELECT * FROM User', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows);
});
connection.end();

// lancement de l'application express
const app = express();

  // Définition des CORS
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
  
// On parse les requètes du body en json
app.use(bodyParser.json());

// routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('./api/auth', userRoutes);
app.use('./api/article', articleRoutes);
app.use('./api/like', likeRoutes);

// export de notre app
module.exports = app;

/* création d'un pool de connexion (10 requètes en parrallèle)
const pool = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  charset  : 'UTF8_general_ci',
  waitForConnections : true,
  connectionLimit : 10,
  queueLimit : 0
})*/