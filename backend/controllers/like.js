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
      articleId: req.body.articleId,
      userId: req.body.userId
      }})
      .then(likes => {
        console.log(likes.length)
        if(likes.length === 0) {
          const like = new Like({
            ...likeObject
          });
          // Enregistrement de l'objet like dans la base de données
          like.save()
            .then(() => res.status(201).json(
              { 
                message: 'Like ajouté !',
                like: 1
              }))
            .catch(error => res.status(400).json({ error }));
        } else {
          Like.destroy({ where: {
            articleId: req.body.articleId,
            userId: req.body.userId }})
              .then(() => res.status(200).json(
                { 
                  message: 'Like supprimé !',
                  like: 0
                }))
              .catch(error => res.status(400).json({ error }));
        }
      }
    )
}
