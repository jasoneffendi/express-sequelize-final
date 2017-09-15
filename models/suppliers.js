'use strict';
module.exports = function(sequelize, DataTypes) {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Suppliers.associate = (models) => {
    Suppliers.hasMany(models.Item)
    Suppliers.belongsToMany(models.Item, {through: 'SupplierItem'})
  };
  return Suppliers;
};