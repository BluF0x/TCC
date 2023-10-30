const commentModel = require('../models/commentModel')

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
        // console.log(id)
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
        // console.log(subComments)

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

deleteComments = async (req, res) => {
    try {
        const {commentId} =  req.params
        const userid = req.session.userid
        const isAdmin = req.session.admin
        console.log('userid: ' + userid)
        console.log('commentId: ' + commentId)
        console.log(req.session)
        console.log(isAdmin)

        if(!userid || isAdmin == 0) {
            res.status(401).json({msg: "Não autorizado"})
        } else {

            const userIdQuery = await commentModel.getCommentPosterId(commentId, res)

            if (userIdQuery.length === 0) {
                // Comment not found
                res.status(404).json({ msg: "Comentário não encontrado" });
                return; // Return early to avoid further execution
            }

            const commentPosterId = userIdQuery[0].reviewer_id

            console.log(`CommentPosterId: ${commentPosterId}`)

            if (isAdmin == 1) {
                const deleteQuery = await commentModel.deleteComment(commentId)
                res.status(200).json({resultado: "Comentáro deletado com sucesso!", query: deleteQuery})
            } else if (!commentPosterId || !userid) {
                res.status(401).json({msg: "Não autorizado"})
            } else if (commentPosterId != userid) {
                res.status(401).json({msg: "Não autorizado, id do usuário não é o mesmo do comentário"})
            } else {
                const deleteQuery = await commentModel.deleteComment(commentId)
                res.status(200).json({resultado: "Comentáro deletado com sucesso!", query: deleteQuery})
            }

        }
        
    } catch (err) {
        res.status(400).json({"erro": err})
    }
}

const canUserDelete = async (userId, postId) => {
    if (!userId || !postId) return false
    if (userId === null || userId != postId) return false
    else return true
}

const getCommentsByReviewerId = async (req, res) => {
    try {
        const { reviewerId } = req.params;
        
        const comments = await commentModel.getCommentsByReviewerId(reviewerId);
        
        const commentData = comments.map(comment => ({
            corpo_texto: comment.corpo_texto,
            tenis_id: comment.tenis_id,
        }));
        
        res.status(200).json({ comments: commentData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createComment, getTopComment, getChildComment, getAllComments, deleteComments, getCommentsByReviewerId}