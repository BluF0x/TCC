const { array } = require('joi')
const commentModel = require('../models/commentModel')
const { query } = require('../models/connection')
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

const getAllComments = async(req, res) =>{ 

    try{
        const {id} = req.params
        console.log(id)
        const queryComments = await commentModel.getTopComment(id)

        const resultPromises = queryComments.map(async (element) => {
            const subComments = await getAllSubComments(element.review_id);
            element.subComments = subComments;
            return element;
        });

        const result = await Promise.all(resultPromises);

        res.status(200).json({ "Resultado": result });

    } catch(err) {
        console.log(err)
        res.status(400).json({"Erro": err})
    }
}

getAllSubComments = async (id) => {
    try {
        const comments = [];
        const subComments = await commentModel.getChildComment(id);
        if (subComments.length === 0) {
            return comments
        }
        console.log(subComments)

        await Promise.all(subComments.map(async (element) => {
            element.subComments = await getAllSubComments(element.review_id)
            comments.push(...comments)
            comments.push(element);
            // await fetchSubComments(element);
        }));

        return comments;
    } catch (err) {
        return err;
    }
};


// Recursive function to get all sub-comments
// const getAllSubComments = async (commentId) => {
//     const comments = await commentModel.getChildComment(commentId);
//     if (comments.length === 0) {
//         return [];
//     }
    
//     const subComments = [];
    
//     for (const comment of comments) {
//         const childComments = await getAllSubComments(comment.review_id);
//         subComments.push(comment);
//         subComments.push(...childComments);
//     }
    
//     return subComments;
// }

module.exports = { createComment, getTopComment, getChildComment, getAllComments}