const { request, response } = require("express")

const Producto = require('../models/producto')
const bcryptjs = require('bcryptjs')


//verificar que el usuario este autenticado, y que sea admin 

const productosGet= async (req=request,res= response) => {

    const {limite = 5,desde = 0} = req.query
    
    const productos = await Producto.findAndCountAll({
        where:{
            estado:true
        },
        offset: Number(desde),
        limit: Number(limite),
    })


    res.json(productos)
}

const productoGet= async (req=request,res= response) => {
   
    const {id} = req.params

    const producto = await Producto.findByPk(id)

    

    res.json(producto)
}

const crearProducto = async (req= request , res= response) => {
    const { nombre, descripcion, precio,...resto } = req.body;
    

    //VALIDAR CAMPOS VACIOS
    if(!nombre || !descripcion || !precio)
        res.status(400).json({
            msg: "Datos invalidos, campos obligatorios"
        }); 



    try {
        //regresa un arreglo 
        existeProducto = await Producto.findOne({
            where:{
                nombre: nombre
            }
        })

      
        if (existeProducto){
            return res.status(400).json({
                msg: "El producto ya existe",
            }); 
        }


        // Creación del nuevo usuario
        const nuevoProducto = await Producto.create({
            nombre: nombre,
            descripcion: descripcion,
            precio
        });

        res.status(201).json({
            msg: "Producto creado con éxito",
            usuario: nuevoProducto
        });
    } catch (error) {
        console.error(error);  // Muestra el error en la consola
        res.status(500).json({
            msg: "Hubo un error al crear el producto",
            error: error.message
        });
    }
};

const actualizarproducto = async(req , res= response) => {
    const id = req.params.id
    const {estado,...data} = req.body
    //const data = req.body
    
    
    
    if(!id){
        res.status(400).json({
            msg: `El id Debe venir`,
        });
    }
   
    const existeProducto = await Producto.findByPk(id)

    if(!existeProducto){
        res.status(400).json({
            msg: `El producto con id ${id} no existe`,
         });
    }

    try{
        const producto = await Producto.update(
            data,
            {
                where:{
                    idProducto: id 
                }    
            }
                    
        )
    
    
        res.json({
            'registros actualizados:':producto,
            data
        })
    
    }catch(error){
        res.json({
            msg: 'error al actualizar el producto',
            error: error
        })
    }

    
}

const BorrarProducto = async(req, res) => {
    const id = req.params.id
  
    
    const existeProducto = await Producto.findByPk(id)

    if(!existeProducto){
        res.status(400).json({
            msg: `El producto con id ${id} no existe`,
            error: error.message
        });
    }

    try{
        const producto = await Producto.update(
            {
                estado:false
            },
            {
                where:{
                    idProducto: id 
                }    
            }
                    
        )
    
    
        res.json({
            'registros borrado': producto
        })
    
    }catch(error){
        res.json({
            msg: 'error al borrar  el producto',
            error: error
        })
    }
}


module.exports = { crearProducto,productosGet,productoGet,actualizarproducto,BorrarProducto}