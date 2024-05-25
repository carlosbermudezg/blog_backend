const pool = require('../utils/connMySql2')

const allPosts = async(limit, offset, category)=>{
    let result
    if(!isNaN(Number(category))) {
        const categoryExists = await pool.query('SELECT * from categories WHERE id_category="'+category+'"')
        if(categoryExists){
            result = await pool.query('SELECT * from posts WHERE category_id = ? limit ? offset ?', [category, +limit, +offset]);
        }else{
            result = false
        }
    }else{
        result = await pool.query('SELECT * from posts limit ? offset ?', [+limit, +offset]);
    }
    return result
}

const countPosts = async(category)=>{
    let result
    if(!isNaN(Number(category))) {
        const categoryExists = await pool.query('SELECT * from categories WHERE id_category="'+category+'"')
        if(categoryExists){
            result = await pool.query('SELECT count(*) as count from posts WHERE category_id="'+category+'"')
        }else{
            result = false
        }
    }else{
        result = await pool.query('SELECT count(*) as count from posts')
    }
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT * from posts WHERE id_blog="'+id+'"')
    return result
}

const create = async({title, content, category, created_at, published_at, created_by, status})=>{
    const result = await pool.query(
        `INSERT INTO posts(title, content, category_id, created_at, published_at, created_by, status) VALUES('${title}','${content}','${category}','${created_at}','${published_at}','${created_by}','${status}')`
    );
    return result
}
const update = async(post)=>{
    const result = await pool.query(
        `UPDATE posts SET title='${post.title}', content='${post.content}', category_id='${post.category}', created_at='${post.created_at}', published_at='${post.published_at}', created_by='${post.created_by}', status='${post.status}' WHERE id_blog=${post.id_post}`
    )
    return result
}

module.exports = {
    allPosts,
    countPosts,
    findById,
    create,
    update
}