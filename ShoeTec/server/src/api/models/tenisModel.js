const connection = require('./connection')

const getTenis = async() =>{
    const args = `SELECT * FROM tenis ORDER BY data_registro LIMIT 20`
    const [query] = await connection.execute(args)
    return query
}

const getTenisById = async(id) =>{
    const args = "SELECT * FROM tenis WHERE tenis_id=?";
    console.log(id)
    const [query] = await connection.execute(args, [id])
    return query
}

module.exports = {getTenis, getTenisById}