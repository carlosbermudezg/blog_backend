const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = catchError(async(req, res) => {
    const results = await Users.findAll();
    return res.status(200).json(results[0]);
});

const getById = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findById(id)
    return res.status(200).json(result[0][0])
})

const create = catchError(async(req, res) => {
    const user = {
        "name": req.body.name,
        "username": req.body.username,
        "password": await bcrypt.hash(req.body.password, 10),
        "photo": req.body.photo
    }
    const result = await Users.create(user);
    return res.status(201).json(result);
});

const login = catchError(async (req, res) => {
    const { user, password } = req.body
    const logged = await Users.findOne(user)
    if (!logged[0][0]) return res.status(401).json({ error: "invalid credentials user" })

    const isValid = await bcrypt.compare(password, logged[0][0].password)
    if (!isValid) return res.status(401).json({ error: "invalid credentials pass" })

    const userJson = {
        id_user: logged[0][0].id_user,
        name: logged[0][0].names,
        username: logged[0][0].username,
        photo: logged[0][0].photo
    }
    const token = jwt.sign(
        { userJson },
        process.env.TOKEN,
        { expiresIn: '1d' }
    )

    return res.status(200).json({ user: userJson, token });
})

module.exports = {
    getAll,
    getById,
    login,
    create,
}