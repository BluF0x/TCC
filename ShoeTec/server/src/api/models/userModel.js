const connection = require('./connection')
const bcrypt = require('bcrypt')

const getUsers= async()=>{
    const [users] = await connection.execute('SELECT * FROM Users')
    return users
}

const getSpecificUser = async(field, email)=>{
    const args = `SELECT * FROM Users WHERE ${field} = ?`
    const [user] = await connection.execute(args, [email])

    if (user[0] === undefined){
        return new Error("Usuário não encontrado")
    }else {

        return user
    }
}

const createUser = async(userData)=>{

    try {
    const data = userData

    const hashedPassword = await bcrypt.hash(data.pass, 10); // hmmmmm salzinho 

    const values = [data.name, data.email, hashedPassword, data.pais, data.estado, data.cidade, data.genero, data.esporte, null]

    const args = `INSERT INTO Users(name, email, pass, pais, estado, cidade, genero, esportes, bio ) VALUES(?,?,?,?,?,?,?,?,?)`
    const [createUser] = await connection.execute(args, values)

    return createUser
    } catch (err) {
        return err;
    }
}

const delUser = async(id) =>{
    const args = 'DELETE FROM users WHERE usuario_id=?'
    const deleteUser = await connection.execute(args, [id])

    return deleteUser
}

const loginUser = async(email, pass) =>{
    const args = `SELECT * FROM users WHERE email = ?`
    const [queryLogin] = await connection.execute(args, [email])
    

    if (queryLogin[0] === undefined){
        return new Error("Usuário não encontrado")
    }else {
        return queryLogin
    }
}

module.exports = {getUsers, createUser, delUser, getSpecificUser, loginUser}