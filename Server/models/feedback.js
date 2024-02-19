const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('feedback', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.INTEGER,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};
