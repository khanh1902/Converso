const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('saleproduct', {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    saleId: {
      type: DataTypes.INTEGER,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    subproductId: {
      type: DataTypes.INTEGER,
    },
    productLeft: {
      type: DataTypes.INTEGER,
    },
  });
};
