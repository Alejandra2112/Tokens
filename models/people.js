const {Schema, model} = require('mongoose') 


const PeopleSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
        minlength: [3, 'Mínimo debe digitar 3 caracteres'],
       
    },
    rol: {
        type: String,
        enum: ['Administrador' , 'Residente', 'Vigilante'],
        required: [true, 'El rol es obligatorio']
    },

    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obigatorio']
    }
})

module.exports = model('People', PeopleSchema)