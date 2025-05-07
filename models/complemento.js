const {db} = require('../db/configure')
const { DataTypes } = require('sequelize');
const Producto = require('./producto');

const Complemento = db.define('complemento',{
    idcomplemento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idproducto:{
        type: DataTypes.INTEGER,
        references: {
            name: 'fk_complemento_producto',
            model: Producto,
            key: 'idproducto'
        }
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
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    




},{
    freezeTableName: true,
    timestamps: false,
  })



  
module.exports = Complemento