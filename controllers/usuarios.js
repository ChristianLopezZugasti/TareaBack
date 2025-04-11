
const { request, response } = require("express")
const Usuario = require("../models/usuario")

const bcryptjs = require('bcryptjs')


//GET USUARIOS
const usuariosGet =async (req = request, res = response) => {
    

    const {limite = 5,desde = 0} = req.query
    
    const usuarios = await Usuario.findAndCountAll()


    res.json(usuarios)
}

//GET USUARIO
const usuarioGet =async (req = request, res = response) => {
     
    const id = req.params.id

    const usuario = await Usuario.findByPk(id)


    res.json(usuario)
}


// POST
const crearUsuario = async (req, res) => {
    const { nombre, correo, password,...resto } = req.body;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    

    //VALIDAR CAMPOS VACIOS
    if(!nombre || !correo || !password)
        res.status(400).json({
            msg: "Datos invalidos, campos obligatorios"
        }); 

 
    //validar correo
    if (!regexCorreo.test(correo)) {
        res.status(400).json({
                msg: "Correo electrónico inválido",
            });
        }
    //validar password
    if( String(password).length < 6){
        res.status(400).json({
            msg: "Password debe ser mayor a 6 caracteres",
        });
    }

    try {
        //regresa un arreglo 
        existeCorreo = await Usuario.findOne({
            where:{
                correo: correo
            }
        })

      
        if (existeCorreo){
            return res.status(400).json({
                msg: "El correo ya existe",
            }); 
        }

        //encriptar constra
        const salt = bcryptjs.genSaltSync()
        passwordCifrada = bcryptjs.hashSync(password,salt)




        // Creación del nuevo usuario
        const nuevoUsuario = await Usuario.create({
            nombre: nombre,
            correo: correo,
            password: passwordCifrada
        });

        // Responder con el usuario creado
        console.log(nuevoUsuario)
        res.status(201).json({
            msg: "Usuario creado con éxito",
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error(error);  // Muestra el error en la consola
        res.status(500).json({
            msg: "Hubo un error al crear el usuario",
            error: error.message
        });
    }
};

//PUT actualizar usuario 
const actualizarUsuario = async(req , res= response) => {
    const id = req.params.id
    const {correo,password,...data} = req.body
    
    const existeUsario = await Usuario.findByPk(id)

    if(!existeUsario){
        res.status(400).json({
            msg: `El usuario con id ${id} no existe`,
            error: error.message
        });
    }


    const usuario = Usuario.update(
        data,
        {
            where:{
                idUsuario: id 
            }    
        }
                
    )


    res.json(usuario)

}

//borrar registro.
const borrarUsuario = async(req , res= response) => {
    const id = req.params.id
    
    const existeUsario = await Usuario.findByPk(id)

    if(!existeUsario){
        res.status(400).json({
            msg: `El usuario con id ${id} no existe`,
            error: error.message
        });
    }

    //borrar fisicamente, verificar si se pone un estado en true or false
    const usuario = Usuario.destroy(
        {
            where:{
                idUsuario: id 
            }    
        }
                
    )


    res.json(usuario)

}


module.exports = {usuariosGet,usuarioGet, crearUsuario,actualizarUsuario,borrarUsuario}