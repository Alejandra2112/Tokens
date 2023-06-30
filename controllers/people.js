const {response} = require('express')
const bcrypt = require('bcrypt') //Importar libreria para encriptar
const People = require('../models/people')


//Consulta
const getPeople = async(req, res=response) => {
    let mensaje = ''
    try {
        //Consulta en la colección
        const peopl = await People.find()
        mensaje = peopl
    } catch (error) {
        mensaje = error
    }

   res.json({
        peopl:mensaje
    })
    
}

const postPeople = async(req, res = response) =>{

    const body = req.body //Desestructuración
    let mensaje = ''
    const peopl = new People(body) // Crear el objeto
    peopl.password = bcrypt.hashSync(body.password, 10) //Encriptar

    console.log(body)
    try {
        await peopl.save()
        mensaje = 'Usuario registrado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
   
}

const putPeople = async(req, res = response) =>{
    //Actualización de datos
    const body = req.body //Desestructuración
     console.log(body)
    let mensaje = ''

    try {
        if(body.tipoModificacion == 'Unitaria'){
            await People.findOneAndUpdate({_id:body._id}, {rol:body.rol, estado:body.estado})

            mensaje = 'Usuario modificado exitosamente. Modificación: Sencilla'
        }
        else{
            await People.updateMany({password:body.password}, {rol:body.rol, estado:body.estado})
            mensaje = 'Usuario modificado exitosamente. Modificación: Múltiple'
        }


    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje:mensaje
    })
   
}

const deletePeople = async(req, res = response) =>{
    const body = req.body
    let mensaje = ''

    try {
        await People.deleteOne({_id:body._id})
        mensaje = 'Eliminado exitosamente'
    } catch (error) {
        mensaje = error
    }
   
    res.json({
        mensaje
    })
   
}

module.exports = {
   getPeople,
   postPeople,
   putPeople,
   deletePeople
}


