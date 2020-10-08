const Article = require('../models/article');
const fs = require('fs');

// Logiques métiers pour les articles
// Lecture de tous les articles dans la base de données (Get)
exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
};

// Lecture d'un article avec son ID (Get/:id)
exports.getOneArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};

// Création d'un nouvel article (Post)
exports.createArticle = (req, res, next) => {
  const articleObject = JSON.parse(req.body.article);
  delete articleObject._id;

  // Création d'un nouvel objet Article
  const article = new Article({
    ...articleObject,
    // Création de l'URL de l'image : http://localhost:4200/image/nomdufichier 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // Enregistrement de l'objet article dans la base de données
  article.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Modification d'un article (Update)
exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
    // Si il existe déjà une image
    {
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; 
    // Si il n'existe pas d'image
    Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

// Suppression d'un article (Delete)
exports.deleteArticle = (req, res, next) => {
  Article.findOne({_id: req.params.id})
    .then(sauce => {
      // Récupération du nom du fichier
      const filename = article.imageUrl.split('/images/')[1];
      // On efface le fichier (unlink)
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};