const catchError = require('../utils/catchError')
const Posts = require('../models/Posts')
const { v4: uuidv4 } = require('uuid')

const getAll = catchError(async(req, res) => {
    const { page, limit, category } = req.query
    const offset = (page - 1) * limit
    const totalPagesData = await Posts.countPosts(category)
    if(totalPagesData === false){
        return res.status(400).json({
          data: "La categoria no existe."  
        })
    }
    const results = await Posts.allPosts(limit, offset, category)
    const totalPages = Math.ceil(totalPagesData[0][0]?.count / limit)

    return res.status(200).json({
        data: results[0],
        pagination: {
            page: +page,
            limit: +limit,
            totalPages: totalPages,
            totalPosts: totalPagesData[0][0]?.count
        }
    })
})

const create = catchError(async(req, res) => {
    const post = {
        "title": req.body.title,
        "content": req.body.content,
        "category": req.body.category,
        "created_at": req.body.created_at,
        "published_at": req.body.published_at,
        "created_by": req.body.created_by,
        "status": req.body.status,
        "viewedBy": "[]"
    }
    const result = await Posts.create(post)
    return res.status(201).json(result);
})

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    let visitorId = req.cookies['visitor_id']
    if (!visitorId) {
        visitorId = uuidv4();
        res.cookie('visitor_id', visitorId, { maxAge: 900000, httpOnly: true });
    }
    const result = await Posts.findById(id)
    const cookies = JSON.parse(result[0][0].viewedBy)
    if(!cookies.includes(visitorId)){
        cookies.push(visitorId)
        const views = result[0][0].views + 1
        const post = {
            "id_post": id,
            "cookies": JSON.stringify(cookies),
            "views": views
        }
        await Posts.updateViews(post)
    }

    return res.status(200).json(result[0])
})

const update = catchError(async(req, res) => {
    const { id } = req.params
    const post = {
        "id_post": id,
        "title": req.body.title,
        "content": req.body.content,
        "category": req.body.category,
        "created_at": req.body.created_at,
        "published_at": req.body.published_at,
        "created_by": req.body.created_by,
        "status": req.body.status
    }
    const result = await Posts.update(post);
    return res.status(201).json(result);
})

module.exports = {
    getAll,
    getOne, 
    create,
    update
}