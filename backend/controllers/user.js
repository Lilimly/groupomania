// imports
const models = require("../models");
const User = models.users;
const Article = models.articles;
const Comment = models.comments;
const Like = models.likes;

const fs = require('fs');

// logique métier : lire tous utilisateurs
exports.findAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        console.log(users);
        res.status(200).json({data: users});
    })
    .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {
  
  User.findOne({ where: {id: req.params.id} })
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => res.status(404).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findAllUserByName = (req, res, next) => {
  
  User.findAll({ where: {firstname: req.params.name}})
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => res.status(404).json({ error }));
};

// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
      // éléments de la requète
      const firstname = req.body.firstname;
      const lastname =  req.body.lastname;
    
      // vérification que tous les champs sont remplis
      if(firstname === null || firstname === '' || lastname === null ||lastname === '') {
          return res.status(400).json({'error': 'Eléments manquants'});
      }
  // gestion d'ajout/modification image de profil
  const userObject = req.file ?
    {
      ...req.body.user,
      imageUrl: req.file.filename
    } : { ... req.body};

  User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  Like.destroy({where: {userId: req.params.id}})
  .then(() => 
    Comment.destroy({where: {userId: req.params.id}})
    .then(() => 
      Article.findAll({where: {userId: req.params.id}})
        .then(
          (articles) => {
            articles.forEach(
              (article) => {
                Comment.destroy({where: {articleId: article.id}})
                Like.destroy({where: {articleId: article.id}})
                Article.destroy({where: {id: article.id}})
              }
            )
          }
        )
        .then(() =>
        User.findOne({ where: {id: req.params.id} })
          .then(user => {
            const filename = user.imageUrl;
            fs.unlink(`images/${filename}`, () => {
              User.destroy({ where: {id: req.params.id} })
              .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            })
          })
        )
      )
    )
  .catch(error => res.status(400).json({ error }));
};