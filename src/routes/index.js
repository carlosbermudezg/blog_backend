const express = require('express')
const routerCategory = require('./categories.router')
const routerPosts = require('./posts.router')
const routerUsers = require('./users.router')
const router = express.Router();

router.use('/categories', routerCategory)
router.use('/posts', routerPosts)
router.use('/users', routerUsers)

module.exports = router;