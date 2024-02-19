const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('intent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    intents: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    entities: {
      type: DataTypes.JSON,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
