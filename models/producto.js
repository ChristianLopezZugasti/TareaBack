const {db} = require('../db/configure')
const { DataTypes } = require('sequelize');

const Producto = db.define('producto',{
    idproducto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        validate:{
            customValidator(value){
                if(value !== null){
                    value = value.trim()
                }
                
                
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        
    },
    precio:{  
        type: DataTypes.INTEGER,
    },
    descuento: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },

    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    disponible:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    CreatedAt:{ //si se pone createAt se pone loko 
        type: DataTypes.DATE
    },




},{
    freezeTableName: true,
    timestamps: false,
  
  })


module.exports = Producto