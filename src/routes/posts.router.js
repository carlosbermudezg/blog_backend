const { getAll, getOne, create, update } = require('../controllers/posts.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerPosts = express.Router();

routerPosts.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create)

routerPosts.route('/:id')
    .get(getOne)
    .put(verifyJWT, update)

module.exports = routerPosts;