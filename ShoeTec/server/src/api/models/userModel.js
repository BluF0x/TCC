const connection = require('./connection')
const bcrypt = require('bcrypt')

const getUsers = async () => {
    const [users] = await connection.execute('SELECT * FROM Users')
    return users
}

const getSpecificUser = async (field, email) => {
    const args = `SELECT * FROM Users WHERE ${field} = ?`
    const [user] = await connection.execute(args, [email])

    if (user[0] === undefined) {
        return new Error("Usuário não encontrado")
    } else {
        return user
    }
}

const createUser = async (userData) => {

    try {
        const data = userData

        const hashedPassword = await bcrypt.hash(data.pass, 10); // hmmmmm salzinho 

        const values = [data.name, data.email, hashedPassword, data.pais, data.estado, data.cidade, data.genero, data.esporte, null]

        const args = `INSERT INTO Users(name, email, password, pais, estado, cidade, genero, esportes, bio ) VALUES(?,?,?,?,?,?,?,?,?)`
        const [createUser] = await connection.execute(args, values)

        return createUser
    } catch (err) {
        return err;
    }
}

const updateUser = async (id, userData) => {
    try {
        const { name, pais, estado, cidade, genero, esportes, bio } = userData;

        const values = [name, pais, estado, cidade, genero, esportes, bio, id];

        console.log(values)

        const args = `UPDATE Users SET name=?, pais=?, estado=?, cidade=?, genero=?, esportes=?, bio=? WHERE usuario_id=?`;

        const [updateUser] = await connection.execute(args, values);

        return updateUser;
    } catch (err) {
        return err;
    }
};

const deleteUserId = async (id) => {
    try {
        const args = 'DELETE FROM Users WHERE usuario_id=?';
        const [deleteUserId] = await connection.execute(args, [id]);

        return deleteUserId;
    } catch (error) {
        return error;
    }
};

const updateAdminStatus = async (id, isAdmin) => {
    try {
        const isAdminInt = parseInt(isAdmin);
        const values = [isAdminInt, id];
        const args = 'UPDATE Users SET admin=? WHERE usuario_id=?';
        const [updateAdmin] = await connection.execute(args, values);

        return updateAdmin;
    } catch (error) {
        return error;
    }
};

const delUser = async (id) => {
    const args = 'DELETE FROM users WHERE usuario_id=?'
    const deleteUser = await connection.execute(args, [id])

    return deleteUser
}

const loginUser = async (email, pass) => {
    const args = `SELECT * FROM users WHERE email = ?`
    const [queryLogin] = await connection.execute(args, [email])


    if (queryLogin[0] === undefined) {
        return new Error("Usuário não encontrado")
    } else {
        return queryLogin
    }
}

const uploadPicture = async (filename, path) =>{
    
}

module.exports = { 
    getUsers, 
    createUser, 
    delUser, 
    getSpecificUser, 
    loginUser, 
    updateUser, 
    updateAdminStatus, 
    deleteUserId,
    uploadPicture
}