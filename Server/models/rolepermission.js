const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('rolepermission', {
    id: {
      type: DataTypes.INTEGER,
    },
    permissionid: {
      type: DataTypes.INTEGER,
    },
  });
};
