const { request, response } = require("express")

const bcryptjs = require('bcryptjs')
const { Complemento,Producto } = require("../models")


//verificar que el usuario este autenticado, y que sea admin 

const productosGet= async (req=request,res= response) => {
    
    const {limite = 20,desde = 0} = req.query
    
    const productos = await Producto.findAndCountAll({
        where:{
            estado:true
        },
        //offset: Number(desde),
        //limit: Number(limite),
        include: {
            model: Complemento,
            as: 'complementos',
            attributes: ['idcomplemento','nombre'],
            where:{
                estado:true
            },
            required: false // Esto permite que se devuelvan productos sin complementos
        },
    })


    res.json(productos)
}

const productoGet= async (req=request,res= response) => {
   
    const {id} = req.params

    const producto = await Producto.findByPk(id,{
        include:{
            model: Complemento,
            as: 'complementos',
            attributes: ['idcomplemento','nombre'],
            where:{
                estado:true
            },
            required: false // Esto permite que se devuelvan productos sin complementos
        }
    })

    

    res.json(producto)
}

const crearProducto = async (req= request , res= response) => {
    const { nombre, descripcion, precio,descuento,complementos,...resto } = req.body;
    const complementosArray = []
    //VALIDAR CAMPOS VACIOS
    if(!nombre || !descripcion || !precio   )
        return res.status(400).json({
            msg: "Datos invalidos, campos obligatorios"
        }); 
    //validar que el precio sea un numero
    if (isNaN(precio) || precio <= 0) {
        return res.status(400).json({
            msg: "El precio debe ser un numero",
        });
    }
    //validar que el descuento sea un numero
    if (isNaN(descuento) || descuento <= 0) {
        return res.status(400).json({
            msg: "El descuento debe ser un numero mayor o igual a 0",
        });
    }
    

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
        
        

        // Creación del nuevo producto 
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            descuento,
            CreatedAt: new Date(),
        });

        //comprobar si vienen los complementos
        if(complementos){
            if(!Array.isArray(complementos)){
                return res.status(400).json({
                    msg: "Los complementos deben ser un arreglo",
                }); 
            }  
            
            

            //creacion de los complementos
            for ( const comp of complementos){
                complementosArray.push(await Complemento.create({ nombre: comp, idproducto: nuevoProducto.idproducto  }));
            }
    
        }

        

        res.status(201).json({
            msg: "Producto creado con éxito",
            usuario: nuevoProducto,
            complementos: complementosArray 
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
    const {estado,complementos,...data} = req.body
    //const data = req.body
    const complementosArray = []
    
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
                    idproducto: id 
                }    
            }
                    
        )
    
        if(complementos){
            if(!Array.isArray(complementos)){
                return res.status(400).json({
                    msg: "Los complementos deben ser un arreglo",
                }); 
            }           
        
            //Eliminamos todos los registros previos
            await Complemento.update({estado:false},{
                where:{
                    idproducto: id
                }
            })
            //Insertamos los nuevos registros de complementos
            for ( const comp of complementos){
                console.log('complemento',comp)
                complementosArray.push(await Complemento.create({
                    nombre: comp,
                    idproducto:id,
                })
                )
            }
        }
      
        
        res.json({
            'registros actualizados:':producto,
            data,
            complementosArray
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

         //Eliminamos todos los registros de complementos
         await Complemento.update({estado:false},{
            where:{
                idproducto: id
            }
        })

    
    
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



