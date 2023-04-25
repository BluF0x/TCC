const connection = require('./connection')

const getUsers= async()=>{
    const [users] = await connection.execute('SELECT * FROM Users')
    return users
}

const createUser = async()=>{
    const createUser = await connection.execute(
        'INSERT INTO users'
    )
}

module.exports = {getUsers}