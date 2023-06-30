const {Router} = require('express')

const route = Router()

//Importar el controlador
const {getPeople, postPeople, putPeople, deletePeople} = require('../controllers/people')
const  {isAuthenticated}  = require('../controllers/auth')


route.get('/', isAuthenticated, getPeople)

route.post('/', isAuthenticated, postPeople)

route.put('/', putPeople)

route.delete('/', deletePeople)

module.exports = route   