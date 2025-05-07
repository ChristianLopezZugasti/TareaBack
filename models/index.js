// models/index.js

const Producto = require('./producto');
const Complemento = require('./complemento');

// Relaciones
Producto.hasMany(Complemento,{
    foreignKey: 'idproducto',
    
});
Complemento.belongsTo(Producto,{
    foreignKey: 'idproducto',    
});

module.exports = {
  Producto,
  Complemento
};
