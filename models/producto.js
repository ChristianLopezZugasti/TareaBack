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
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

},{
    freezeTableName: true,
    timestamps: false,
  })

module.exports = Producto