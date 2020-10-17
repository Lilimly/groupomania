//imports
const models = require("../models");
const Article = models.articles;
const User = models.users

const fs = require('fs');

// logique métier : lire tous articles
exports.findAllArticles = (req, res, next) => {
  Article.findAll()
  .then(articles => {
      console.log(articles);
      res.status(200).json({data: articles});
  })
  .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un article par son id
exports.findOneArticle = (req, res, next) => {
  Article.findOne({ where: {id: req.params.id} })
  .then(article => {
    console.log(article);
    res.status(200).json(article)
  })
  .catch(error => res.status(404).json({ error }));
};

// logique métier : créer un article
exports.createArticle = (req, res, next) => {
  const articleObject = req.body;

  // Création d'un nouvel objet article
  const article = new Article(
    req.body.imageUrl ? 
      {
        ...articleObject,
        // Création de l'URL de l'image : http://localhost:8080/images/nomdufichier 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`
      } : { ...articleObject});
  // Enregistrement de l'objet article dans la base de données
  article.save()
    .then(() => res.status(201).json({ message: 'Article créé !'}))
    .catch(error => res.status(400).json({ error }));
}

// logique métier : modifier un article
exports.modifyArticle = (req, res, next) => {
  const articleObject = req.body.imageUrl ?
    {
      ...req.body.article,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`
    } : { ... req.body};

  Article.update({ ...articleObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Article modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

// Logique métier : supprimer un article
exports.deleteArticle = (req, res, next) => {
  Article.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Article supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};