const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('customer', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    phonenumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
