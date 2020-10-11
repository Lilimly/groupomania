// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');

// import des routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

// lancement de l'application express
const app = express();

// gestion CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// appel des models dans la DB
const db = require("./models");
db.sequelize.sync();

// TEST route a supprimer
app.get("/", (req, res) => {
  res.json({ message: "Welcome lilimly's application." });
});

// enregistrement des routeurs
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// export de notre app
module.exports = app;