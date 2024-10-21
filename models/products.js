'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Product name is require"
        },
        len: {
          args: [3, 1000],
          msg: "Product name is require"
        }
      }
    },
    images: DataTypes.ARRAY(DataTypes.TEXT),
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10000,
          msg: "Maximum stock must be under 10000"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 5000,
          msg: "Minimal price must be 5000 IDR"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};