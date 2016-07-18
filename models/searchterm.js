'use strict';
module.exports = function(sequelize, DataTypes) {
  var SearchTerm = sequelize.define('SearchTerm', {
    term: DataTypes.STRING,
    notifyMethod: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        SearchTerm.belongsTo(models.User);
      }
    }
  });
  return SearchTerm;
};
