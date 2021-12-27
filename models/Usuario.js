const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre:{type: String, required:true},
    apellido:{type: String, required: true},
    mail:{type: String, required:true},
    contrasenia:{type: String, required:true},
    foto:{type: String, required:true},
    peliculasLikeadas:{type:Array},
    google:{type:Boolean, default:false},
})

const Usuario = mongoose.model('usuario',usuarioSchema)

module.exports = Usuario