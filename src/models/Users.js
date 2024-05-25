const pool = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT id_user, names, username, photo from users ORDER BY id_user desc limit 10');
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT id_user, names, username, photo from users WHERE id_user="'+id+'"')
    return result
}

const findOne = async(username)=>{
    const result = await pool.query('SELECT * from users WHERE username="'+username+'"')
    return result
}

const create = async({name, username, password, photo})=>{
    const result = await pool.query(
        `INSERT INTO users(names, username, password, photo) VALUES('${name}','${username}','${password}','${photo}')`
    );
    return result
}

module.exports = {
    findAll,
    findById,
    findOne,
    create
}