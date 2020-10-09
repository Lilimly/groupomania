// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');

const userRoutes = require('./routes/user');

// lancement de l'application express
const app = express();

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome lilimly's application." });
});

// route get all users
app.use('/api/users', userRoutes);

// export de notre app
module.exports = app;