const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('permission', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    screen: {
      type: DataTypes.STRING,
    },
  });
};
