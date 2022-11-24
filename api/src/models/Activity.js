const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    },
    duartion:{
      type: DataTypes.STRING,
    },
    season:{
      type: DataTypes.ENUM('Verano', "Otoño", "Invierno", 'Primavera'),
    },
  },
  {
    timestamps: false
  });
};