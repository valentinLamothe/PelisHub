const Usuario = require ('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const controladoresUsuario = {
    agregarNuevoUsuario : (req, res) => {
        const {nombre, apellido, mail, contrasenia, foto, peliculasLikeadas, google} = req.body
        let cryptPass = bcryptjs.hashSync(contrasenia)
        const nuevoUsuario = new Usuario ({nombre, apellido, mail, contrasenia:cryptPass, foto, peliculasLikeadas, google})
        Usuario.findOne({mail:mail})
        .then((usuario)=>{
            if(usuario){
                throw new Error ('Este correo ya esta en uso')
            }else{
                nuevoUsuario.save()
                .then((nuevoUsuario) =>{
                    const token = jwt.sign({...nuevoUsuario}, process.env.SECRETKEY)
                    res.json({success:true, response:{nombre:nuevoUsuario.nombre, foto:nuevoUsuario.foto, token, _id:nuevoUsuario._id}, error:null})
                }) 
                .catch((error) => res.json({success:false, response:error}))
            }
        })
        .catch((error) => res.json({success:false, response:null, error: error.message}))
    },
    ingresarUsuario : (req, res) => {
        const { mail, contrasenia, flagGoogle} = req.body
        usuario.findOne({mail:mail})
        .then((usuario) =>{
            if(!usuario) throw new Error('correo o contraseña incorrectas')
            if(usuario.google && !flagGoogle) throw new Error ('Has creado una cuenta con Google, por favor ingrese con ella')
            let correctPass = bcryptjs.compareSync(contrasenia, usuario.contrasenia)
            if(!correctPass) throw new Error('correo o contraseña incorrectas')
            const token = jwt.sign({...usuario}, process.env.SECRETKEY)
            res.json({ success:true, response:{token, nombre:usuario.nombre, foto:usuario.foto,  _id:usuario._id}})
         })
        .catch ((error) => res.json({success:false, error:error.message}))
    },
    eliminarUsuario :(req, res) =>{
        usuario.findOneAndDelete({_id:req.params.id})
        .then(() =>res.json({success:true}))
        .catch((error) => res.json({success:false, response:error.message}))
    },
    editarUsuario:(req, res) =>{
        usuario.findOneAndUpdate({_id:req.params.id}, {...req.body})
        .then(() => res.json({success:true}))
        .catch((error) => res.json({success:false, response:error.message}))
    },
    verifyToken : (req, res) => {
        res.json({nombre: req.usuario.nombre, foto:req.usuario.foto, _id:req.usuario._id})
    }
}

module.exports= controladoresUsuario