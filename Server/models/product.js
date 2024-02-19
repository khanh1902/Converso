const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extendData: {
      type: DataTypes.JSON,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
  });
};
