const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      }     
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    }
  }, {
    createdAt: false,
    updatedAt: false,
  }); 
};
