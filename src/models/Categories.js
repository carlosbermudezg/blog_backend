const pool = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT * from categories');
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT * from categories WHERE id_category="'+id+'"')
    return result
}

const create = async({name})=>{
    const result = await pool.query(
        `INSERT INTO categories(name_category) VALUES('${name}')`
    );
    return result
}

const update = async(category)=>{
    const result = await pool.query(
        `UPDATE categories SET name_category='${category.name}' WHERE id_category=${category.id}`
    )
    return result
}

module.exports = {
    findAll,
    findById,
    create,
    update
}