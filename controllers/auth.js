const { response } = require("express")
const Usuario = require("../models/usuario")

const bcryptjs = require('bcryptjs')

const generarJWT = require('../helpers/generar-jwt')


const login = async(req,res=response)=> {

    const {correo, password } = req.body

    try{

        //verificar si el ameil existe
        //const user = await usuario.findOne({correo})
        const user = await Usuario.findOne({
            where:{
                correo: correo
            }
        })

       
        if(!user){
            return res.status(400).json({
                msg: "Usuario / pass no son correctos -email",
                replyCode: 400
            })
        }

        //Verificar la contra
        //la funcion, compara, la paas que le estamos pasanfo en el bodym
        //junto  con la funcion 
        const validPassword = bcryptjs.compareSync(password,user.dataValues.password)

        if( !validPassword){
            return res.status(400).json({
                msg: "Usuario /pass no son correctos -Password",
                replyCode: 400
            })
        }


        //General l JWT
        const token = await generarJWT(user.dataValues.idUsuario)
        res.json({ //no se pone return , al poner el res, se retrona solito 
            user,
            token,
            replyCode: 200
            
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:"se chafio algo",
            error: error,
            replyCode: 500
        })
    }

}


module.exports = login
