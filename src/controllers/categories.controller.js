const catchError = require('../utils/catchError')
const Categories = require('../models/Categories');

const getAll = catchError(async(req, res) => {
    const results = await Categories.findAll();
    return res.status(200).json(results[0]);
});

const create = catchError(async(req, res) => {
    const category = {
        "name": req.body.category_name,
    }
    const result = await Categories.create(category)
    return res.status(201).json(result);
})

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Categories.findById(id)
    return res.status(200).json(result[0])
})

const update = catchError(async(req, res) => {
    const { id } = req.params
    const category = {
        "id": id,
        "name": req.body.category_name,
    }
    const result = await Categories.update(category);
    return res.status(201).json(result);
})

module.exports = {
    getAll,
    getOne, 
    create,
    update
}