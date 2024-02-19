const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('channel', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contactId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contactName: {
      type: DataTypes.STRING,
    },
    credentials: {
      type: DataTypes.JSON,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flowId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
