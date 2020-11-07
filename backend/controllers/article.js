//imports
const models = require("../models");
const Article = models.articles;
const Comment = models.comments;
const Like = models.likes;

// logique métier : lire tous articles
exports.findAllArticles = (req, res, next) => {
  Article.findAll({order: [
    ['createdAt', 'DESC'],
]})
  .then(articles => {
      console.log(articles);
      res.status(200).json({data: articles});
  })
  .catch(error => res.status(400).json({ error }));
};

// Find all articles where userId
exports.findArticlesByUserId = (req, res, next) => {
  Article.findAll({
    where: {userId: req.params.id},
    order: [
      ['createdAt', 'DESC'],
  ]})
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
  // éléments de la requète
  const title = req.body.title;
  const content =  req.body.content;

  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"});
  }

  const articleObject = req.body;

  // Création d'un nouvel objet article
  const article = new Article({
        ...articleObject,
    });
  // Enregistrement de l'objet article dans la base de données
  article.save()
    .then(() => res.status(201).json({ message: 'Article créé !'}))
    .catch(error => res.status(400).json({ error }));
}

// logique métier : modifier un article
exports.modifyArticle = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const content =  req.body.content;
  
    // vérification que tous les champs sont remplis
    if(title === null || title === '' || content === null || content === '') {
        return res.status(400).json({'error': "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article"});
    }
    
  const articleObject = req.body;
    
  Article.update({ ...articleObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Article modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

// Logique métier : supprimer un article
exports.deleteArticle = (req, res, next) => {
  Like.destroy({where: {articleId: req.params.id}})
  .then(() => 
    Comment.destroy({where: {articleId: req.params.id}})
    .then(() => 
      Article.destroy({ where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: 'Article supprimé !'}))
    )
    )
  .catch(error => res.status(400).json({ error }));
};