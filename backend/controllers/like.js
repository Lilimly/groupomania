const db = require("../models");
const Like = db.likes;

// logique métier : lire tous les likes
exports.findAllLikes = (req, res, next) => {
  Like.findAll({where: {
    articleId: req.params.id}})
    .then(likes => {
        console.log(likes);
        res.status(200).json({data: likes});
    })
    .catch(error => res.status(400).json({ error }));
};

// logique métier : créer un like
exports.createLike = (req, res, next) => {
  const likeObject = req.body;
  Like.findAll({where: {
    articleId: req.params.id}})
    .then(likes => {
        if (likes.userId.includes(req.body.userId)){
          Like.destroy({ where: {
            articleId: req.params.id,
            userId: req.body.userId }})
              .then(() => res.status(200).json({ message: 'Like supprimé !'}))
              .catch(error => res.status(400).json({ error }));
        } else {
          const like = new Like({
            ...likeObject
          });
          // Enregistrement de l'objet like dans la base de données
          like.save()
            .then(() => res.status(201).json({ message: 'Like ajouté !'}))
            .catch(error => res.status(400).json({ error }));
        }
   }
  )
  .catch(error => res.status(400).json({ error }));
}



/*if (req.body.like === 1) {
    const like = new Like({
      ...likeObject
    });
    // Enregistrement de l'objet like dans la base de données
    like.save()
      .then(() => res.status(201).json({ message: 'Like ajouté !'}))
      .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === 0) {
      Like.destroy({ where: {
        articleId: req.body.articleId,
        userId: req.body.userId }})
            .then(() => res.status(200).json({ message: 'Like supprimé !'}))
            .catch(error => res.status(400).json({ error }));
  }; */


// logique métier : lire un like par son id
exports.findOneLike = (req, res, next) => {
  Like.findOne({ 
    where: {id: req.params.id } })
  .then(like => {
    console.log(like);
    res.status(200).json(like)
  })
  .catch(error => res.status(404).json({ error }));
};


// Logique métier : supprimer un like
exports.deleteLike = (req, res, next) => {
  Like.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Like supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};