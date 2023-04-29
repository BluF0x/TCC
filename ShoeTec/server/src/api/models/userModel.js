const connection = require('./connection')

const getUsers= async()=>{
    const [users] = await connection.execute('SELECT * FROM Users')
    return users
}

const createUser = async(userData)=>{

    const data = userData
    const esportes = data.esportes
    console.log(data.esportes)
    

    const args = `INSERT INTO Users(name, email, pass, pais, estado, cidade, genero, esportes, bio ) VALUES(${data.name},${data.email}, ${data.pass}, ${data.pais}, ${data.estado}, ${data.cidade}, ${data.genero}, ${esportes}, ${null})`
    const [createUser] = await connection.execute(args)

    return createUser
}

const delUser = async(id) =>{
    const args = 'DELETE FROM users WHERE usuario_id=?'
    const deleteUser = await connection.execute(args, [id])

    return deleteUser
}

module.exports = {getUsers, createUser, delUser}