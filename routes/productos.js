const {Router} = require('express')
const { crearProducto, productosGet, productoGet, actualizarproducto } = require('../controllers/productos')



const router = Router()

router.get('/',productosGet)
router.get('/:id',productoGet)

router.post('/',crearProducto)

router.put('/:id',actualizarproducto)

//router.delete('/:id',borrarUsuario)

module.exports = router