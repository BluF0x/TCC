const userModel = require("../models/userModel")

const getUsers = async (req, res) =>{
    const users = await userModel.getUsers()
    
    return res.status(200).json(users)
}

const setUsers = async (req, res) =>{
    const createUser = await userModel.createUser(req.body)

    return res.status(201).json({"msg": "OK", "body": createUser})
}

const deleteUsers = async (req, res) =>{
    const {id} = req.params
    await userModel.delUser(id)

    return res.status(204).json()
}

module.exports = {getUsers, setUsers, deleteUsers}