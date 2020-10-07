'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Article, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'articleId',
      });
  
      models.Article.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'articleId',
        otherKey: 'userId',
      });
  
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.Like.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'message',
      });
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};