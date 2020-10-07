'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    userId: DataTypes.INTEGER,
    postTime: DataTypes.DATE,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    articleUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    usersLiked: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};