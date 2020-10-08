const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: process.cwd() + '/.env' });
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

/* Récupération de mes fichiers routes
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const likeRoutes = require('./routes/like');
*/

// connexion à DB mySQL avec l'ORM sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, { 
    dialect: "mysql",  
    host: process.env.DB_HOST 
  });

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
  sequelize.query('SELECT * FROM Users').then(([results, metadata]) => {
    console.log(results);
  })
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

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

/* routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('./api/auth', userRoutes);
app.use('./api/article', articleRoutes);
app.use('./api/like', likeRoutes);
*/

// export de notre app
module.exports = app;