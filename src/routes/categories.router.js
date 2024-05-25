const { getAll, getOne, create, update } = require('../controllers/categories.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create)

routerCategory.route('/:id')
    .get(verifyJWT, getOne)
    .put(verifyJWT, update)

module.exports = routerCategory;