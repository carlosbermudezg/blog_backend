const { getAll, getById, login, create} = require('../controllers/users.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create)

routerUsers.route('/login')
    .post(login)

routerUsers.route('/:id')
    .get(verifyJWT, getById)

    
module.exports = routerUsers;