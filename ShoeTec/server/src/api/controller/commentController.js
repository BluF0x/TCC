const commentModel = require('../models/commentModel')

const createComment = async(req, res) =>{
    const createComment = await commentModel.creatComment(req.body)

    res.status(200).json({"msg":"success", "result":createComment})
}

module.exports = { createComment }