const connection = require('./connection')
const bcrypt = require('bcrypt')
const fs = require('fs')

const uploadProfilePicture = async (userId, fileName) =>{
    console.log(userId)
    console.log(fileName)
    try {
    // Check if the user already has a profile picture
    const [result] = await connection.query('SELECT picture FROM Users WHERE usuario_id = ?', [userId]);

    if (result && result.length > 0 && result[0].picture) {
        console.log(result)
        const previousProfilePicturePath = result[0].picture;
        console.log(previousProfilePicturePath)
        await fs.unlink(previousProfilePicturePath, (err)=>{if (err && err.errno != -4058){throw err} });
    }

    // Update the new profile picture path in the database
    await connection.query('UPDATE Users SET picture = ? WHERE usuario_id = ?', [fileName, userId]);
    return { success: true, message: 'Profile picture uploaded successfully' };
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
}

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
        const data = userData;
        const hashedPassword = await bcrypt.hash(data.pass, 10);

        const values = [data.name, data.email, hashedPassword, data.pais, data.estado, data.cidade, data.genero, data.esportes, null];

        console.log(values)

        const args = `INSERT INTO Users(name, email, password, pais, estado, cidade, genero, esportes, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [createUser] = await connection.execute(args, values);


        return createUser;
    } catch (err) {
        return err;
    }
};

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
    uploadProfilePicture    
}