'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post, {foreignKey : 'empID'})
    }
  }
  employees.init({
    uuid: {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNULL : {msg : "employee name cannot be null. "},
        notEmpty : {msg : "employee name cannot be empty."}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNULL : {msg : "employee email cannot be null. "},
        notEmpty : {msg : "employee email cannot be empty."}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'employees',
  });
  return employees;
};