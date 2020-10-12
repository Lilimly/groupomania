const db = require("../models");
const Comment = db.comments;

// logique métier : lire tous les commentaires
exports.findAllComments = (req, res, next) => {
  Comment.findAll()
  .then(comments => {
      console.log(comments);
      res.status(200).json({data: comments});
  })
  .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un commentaire par son id
exports.findOneComment = (req, res, next) => {
  Comment.findOne({ where: {id: req.params.id} })
  .then(comment => {
    console.log(comment);
    res.status(200).json(comment)
  })
  .catch(error => res.status(404).json({ error }));
};

// logique métier : créer un commentaire
exports.createComment = (req, res, next) => {
  const commentObject = req.body;

  

  // Création d'un nouvel objet commentaire
  const comment = new Comment({
    ...commentObject
  });
  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => res.status(201).json({ message: 'Commentaire ajouté !'}))
    .catch(error => res.status(400).json({ error }));
}

// logique métier : modifier un article
exports.modifyComment = (req, res, next) => {
    const commentObject = req.body;
  
    Comment.update({ ...commentObject }, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

// Logique métier : supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};