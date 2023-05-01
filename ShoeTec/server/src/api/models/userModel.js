const connection = require('./connection')

const getUsers= async()=>{
    const [users] = await connection.execute('SELECT * FROM Users')
    return users
}

const getSpecificUser = async(field, email)=>{
    const args = `SELECT * FROM Users WHERE ${field} = ?`
    const [user] = await connection.execute(args, [email])
    return user
}

const createUser = async(userData)=>{

    const data = userData
    const values = [data.name, data.email, data.password, data.pais, data.estado, data.cidade, data.genero, data.esportes, null]

    const args = `INSERT INTO Users(name, email, password, pais, estado, cidade, genero, esportes, bio ) VALUES(?,?,?,?,?,?,?,?,?)`
    const [createUser] = await connection.execute(args, values)

    return createUser
}

const delUser = async(id) =>{
    const args = 'DELETE FROM users WHERE usuario_id=?'
    const deleteUser = await connection.execute(args, [id])

    return deleteUser
}

module.exports = {getUsers, createUser, delUser, getSpecificUser}