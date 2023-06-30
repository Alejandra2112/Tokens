const cookieParser = require('cookie-parser');
const express = require('express')
const cors  = require('cors');//Implementar seguridad
const bodyParser = require('body-parser')//Recibir datos de formularios html

const dbConection = require('../database/config')


class server{
    
    constructor () {
        this.app = express()

        this.port = process.env.PORT
        this.peoplePath = '/api/people' //Ruta pública de la API
        this.authPath = '/api/auth' //Ruta pública de la API

        this.middlewares()//Seguridad

        this.routes()

        this.dbConectar()

    }

    middlewares() //Directorio Publico
    {
        this.app.use(cookieParser()); 
        this.app.use( cors() );
        this.app.use(bodyParser.json())
    }

    routes()
    {
        this.app.use(this.peoplePath, require('../Routes/people'))
        this.app.use(this.authPath, require('../Routes/auth'));

    }

    async dbConectar(){
        await dbConection()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando el puerto ${this.port}`)
        })
    }
}

//Exportar la clase server
module.exports = server