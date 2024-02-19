const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
};
