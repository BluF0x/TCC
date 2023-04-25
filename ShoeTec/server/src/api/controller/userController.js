const userModel = require("../models/userModel")

const getUsers = async (req, res) =>{
    const users = await userModel.getUsers()
    
    return res.status(200).json(users)
}

const setUsers = async (req, res) =>{
    return res.status(201).json(req.body)
}

module.exports = {getUsers}