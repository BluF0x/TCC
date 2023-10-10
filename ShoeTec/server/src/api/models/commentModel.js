const { post } = require('../routes/router')
const connection = require('./connection')

const creatComment = async(data) =>{
    const values = [data.nota, data.corpo, data.reviewerId, data.parenteId, data.tenisId]
    const args = `INSERT INTO Post(nota, corpo_texto, reviewer_id, parent_id, tenis_id) VALUES(?,?,?,?,?)`
    const [comment] = await connection.execute(args, values)

    return comment
}

const getTopComment = async(id) => {
    try{
        const args = `SELECT * FROM Post WHERE tenis_id = ${id} AND parent_id IS NULL ORDER BY data_post DESC;`
        const [comments ] = await connection.execute(args)
        comments.forEach(async element => {
            const args = `SELECT name FROM users WHERE usuario_id= ${element.reviewer_id}`
            const [name] = await connection.execute(args)
            element.reviewer_name = name[0].name
            console.log('COMENTARIOS TOPO')
            console.log(comments)
        });
        

        return comments
    } catch (err) {
        return err
    }
}


const getChildComment = async (id) => {
    if (id === undefined || isNaN(id) || id <= 0) {
        return new Error("Invalid or undefined 'id' parameter.");
    }

    const args = `SELECT * FROM Post WHERE parent_id = ${id};`
    const [comments] = await connection.execute(args);
    comments.forEach(async element => {
        const args = `SELECT name FROM users WHERE usuario_id= ${element.reviewer_id}`
        const [name] = await connection.execute(args)
        element.reviewer_name = name[0].name
        console.log('SUB COMENTARIOS')
        console.log(comments)
    });

    return comments;
}

const deleteComment = async (commentId) =>{
    console.log(commentId)
    const args = `UPDATE Post SET deletado = 1 WHERE review_id = ?`;
    const [queryResult] = await connection.execute(args, [commentId])
    console.log(queryResult)

    return queryResult
}

const getCommentPosterId = async (commentId, res) =>{
    const args = `SELECT * FROM Post WHERE review_id = ${commentId}`
    const [posterId] = await connection.execute(args)
    console.log(posterId)

    return posterId
}

const getCommentsByReviewerId = async (reviewerId) => {
    try {
        const args = `SELECT corpo_texto, tenis_id FROM Post WHERE reviewer_id = ${reviewerId} AND parent_id IS NULL`;
        const [comments] = await connection.execute(args);
        return comments;
    } catch (err) {
        throw err;
    }
};

module.exports = {creatComment, getChildComment, getTopComment, deleteComment, getCommentPosterId, getCommentsByReviewerId}