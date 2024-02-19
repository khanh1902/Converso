const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  });
};
