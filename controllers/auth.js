const People = require('../models/people')
const bcrypt = require('bcrypt')
const { generarJWT } = require('../helpers/generar-jtw')
const jwt = require('jsonwebtoken');

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

const login = async(req, res) => {
    const { nombre, password } = req.body
    
    const people = await People.findOne({nombre})
    
    try {

        if(!people){
            return res.status(400).json({
                msg: 'No encontrado'
            })
        }
    
        if( !people.estado ){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })            
        }
        resultado = await comparePassword(password, people.password)

        if(resultado == true){
            const token = await generarJWT(people)
            res.cookie('token',token);//creando la cookie
            return res.status(200).json({
                msg: 'Iniciaste Sesión',
                token
            })
        }
        else{
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })  
        }
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Apreciado usuario contacte al administrador.'
        })
    }
}

const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        console.log('token:'+token)
        if(!token){
            return next('Por favor logueese.');
        }
        const verify = jwt.verify(token,process.env.SECRET_KEY);
        console.log('verify:'+verify)
        
        req.user = await People.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}


module.exports = {
    login,
    isAuthenticated
}
