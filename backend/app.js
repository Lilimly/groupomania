// imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./middleware/auth');

// import des routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');

// lancement de l'application express
const app = express();

// gestion CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

// parse requètes de content-type - application/json
app.use(bodyParser.json());

// parse requètes de content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// appel des models dans la DB
const db = require("./models");
db.sequelize.sync();

// enregistrement des routeurs
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/users', auth, userRoutes);
app.use('/api/articles', auth, articleRoutes);
app.use('/api/likes', auth, likeRoutes);
app.use('/api/comments', auth, commentRoutes);

// export de notre app
module.exports = app;