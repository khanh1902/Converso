const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    note: {
      type: DataTypes.STRING,
    },
    totalprice: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
