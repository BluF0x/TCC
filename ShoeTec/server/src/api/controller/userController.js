const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session');


const getUsers = async (req, res) =>{
    const users = await userModel.getUsers()
    
    return res.status(200).json(users)
}

const getSpecificUser = async (req, res) =>{
    try{
        const {id} = req.params
        console.log(id)
        const queryResult = await userModel.getSpecificUser("usuario_id", id)
        console.log(queryResult)
        return res.status(200).json({result: queryResult})
    }catch(e){
        return res.status(400).json({"error:":e})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updateAdminStatus = async (req, res) => {
    const { id, isAdmin } = req.body; 

    try {
        const result = await userModel.updateAdminStatus(id, isAdmin);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Admin status updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const deleteUserId = async (req, res) => {
    const { id} = req.body; 

    try {
        const result = await userModel.deleteUserId(id);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User delet sucessfuly' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updatUser = async (req, res) => {
    const {id} = req.body;
    const userData = req.body;

    try {
        const result = await userModel.updateUser(id, userData);
        console.log(result)

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}; 

//devias ser createUsers 
const setUsers = async (req, res) =>{
    const emailResult = await userModel.getSpecificUser("email", req.body.email)

    if (emailResult[0] != undefined){
        return res.status(400).json({"error": "Email já está sendo usado"})
    }

    const createUser = await userModel.createUser(req.body)



    // return res.status(201)
    return res.status(201).json({"msg": "OK", "body": createUser})
}

const deleteUsers = async (req, res) =>{
    const {id} = req.params
    await userModel.delUser(id)

    return res.status(204).json()
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`email:${email}, pass:${password}`);
  console.log(`ID:${req.sessionID}`);

  try {
    if (email && password) {
      user = await userModel.getSpecificUser("email", email);
      console.log(user);

      if (user.name === "Error") {
        return res.status(400).json({ error: query.message, stack: query.stack });
      }

      if (req.session.authenticated) {
        return res.json(req.session);
      }

      const passMatch = await bcrypt.compare(password, user[0].password);
      console.log(passMatch);
      if (passMatch) {
        req.session.username = user[0].name;
        req.session.userid = user[0].usuario_id;
        req.session.authenticated = true;
        req.session.genero = user[0].genero;
        req.session.admin = user[0].admin;

        console.log(req.session);
        return res.status(200).json({ success: true, msg: "Ok", session: req.session });
      } else {
        return res.status(400).json({ msg: "Senha incorreta" });
      }
    } else {
      return res.status(400).json({ msg: "Erro" });
    }
  } catch (error) {
    res.status(500).json({ Erro: error.message, Trace: error.stack });
  }
};


const logoutUser = async (req, res) => {
  try {
    req.session = null; // Clear the session data
    return res.status(200).json({ success: true, msg: "Saiu com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


const checkSession = async (req, res) => {
    try{
    console.log(req.session)
    return res.status(200).json({session: req.session})
    } catch(err) {
        return res.status(400).json({Erro: err})
    }
}

module.exports = { getUsers, setUsers, deleteUsers, getSpecificUser, loginUser, logoutUser, checkSession, updatUser, getAllUsers, updateAdminStatus, deleteUserId}
