const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genre', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
            name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        createdAt: false,
        updatedAt: false,
    });
};