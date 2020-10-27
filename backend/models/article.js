'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      models.Article.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Article.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};

