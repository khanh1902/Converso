const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('flow', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    flowType: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    diagram: {
      type: DataTypes.JSON,
    },
    edges: {
      type: DataTypes.JSON,
    },
    settings: {
      type: DataTypes.JSON,
    },
    attributes: {
      type: DataTypes.JSON,
    },
    flow: {
      type: DataTypes.JSON,
    },
    publishedFlow: {
      type: DataTypes.JSON,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
