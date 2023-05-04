const connection = require('./connection')

const creatComment = async(data) =>{
    const values = [data.nota, data.corpo, data.isReview, data.reviewerId, data.parenteId, data.tenisId]
    const args = `INSERT INTO Post(nota, corpo_texto, is_review, reviewer_id, parent_id, tenis_id) VALUES(?,?,?,?,?,?)`
    const [comment] = await connection.execute(args, values)

    return comment
}

module.exports = {creatComment}