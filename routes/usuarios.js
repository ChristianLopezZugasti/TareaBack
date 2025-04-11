const {Router} = require('express')
const {crearUsuario,usuariosGet, actualizarUsuario, usuarioGet, borrarUsuario} = require('../controllers/usuarios')


const router = Router()

router.get('/',usuariosGet)
router.get('/:id',usuarioGet)

router.post('/',crearUsuario)

router.put('/:id',actualizarUsuario)

router.delete('/:id',borrarUsuario)

module.exports = router