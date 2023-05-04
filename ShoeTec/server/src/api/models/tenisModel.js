const connection = require('./connection')

const getTenis = async(options) =>{
    const args = `SELECT ${options.values} FROM tenis ${options.args}`
    const [query] = await connection.execute(args)
    return query
}

module.exports = {getTenis}