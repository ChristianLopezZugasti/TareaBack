const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarToken = async (token = '') => {
    if (!token) {
        throw new Error('No hay token en la petición');
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuarioAutenticado = await Usuario.findByPk(uid);
        if (!usuarioAutenticado) {
            throw new Error('Token no válido - usuario no existe');
        }

        if (!usuarioAutenticado.estado) {
            throw new Error('Token no válido - usuario con estado false');
        }

        return usuarioAutenticado;

    } catch (error) {
        throw new Error('Token no válido');
    }
}

module.exports = validarToken;
