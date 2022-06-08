import sequelize from '../db';
import {DataTypes} from 'sequelize';

const Topic = sequelize.define('topic', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false, unique: true},
  content: {type: DataTypes.STRING, allowNull: false},
  author: {type: DataTypes.STRING},
});

const Comment = sequelize.define('comment', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  content: {type: DataTypes.STRING},
  author: {type: DataTypes.STRING},
});

Comment.hasOne(Comment);

Topic.hasMany(Comment);
Comment.belongsTo(Topic);

export {
  Topic,
  Comment,
}
