const commentModel = require('../models/commentModel')
const { param } = require('../routes/router')

const createComment = async(req, res) =>{

    try{
        const createComment = await commentModel.creatComment(req.body)

        res.status(200).json({"msg":"success", "result":createComment})
    } catch(err) {
        console.log(err)
        res.status(400).json({"Erro:": err})
    }
}

const getTopComment = async(req, res) =>{ 

    try{
        const {id} = req.params
        console.log(id)
        const queryComments = await commentModel.getTopComment(id)
        console.log(queryComments)

        res.status(200).json({"Resultado": queryComments})

    } catch(err) {
        console.log(err)
        res.status(400).json({"Erro": err})
    }
}

const getChildComment = async(req, res) =>{ 

    try{
        const {id} = req.params
        console.log(id)
        const queryComments = await commentModel.getChildComment(id)
        console.log(queryComments)

        res.status(200).json({"Resultado": queryComments})

    } catch(err) {
        console.log(err)
        res.status(400).json({"Erro": err})
    }
}

module.exports = { createComment, getTopComment, getChildComment }