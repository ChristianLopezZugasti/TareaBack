const {db} = require('../db/configure')
const { DataTypes } = require('sequelize');

const Usuario = db.define('usuario',{
    idUsuario:{
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
    correo: {
        type: DataTypes.STRING,
        
    },
    password:{  
        type: DataTypes.STRING,
    },
    rol:{
        type: DataTypes.ENUM('USER_ROLE','ADMIN_ROLE'),
        defaultValue: 'USER_ROLE'
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
    
},{
    freezeTableName: true,
    timestamps: false,
  })

module.exports = Usuario