const userModel = require("../models/userModel")

const getUsers = async (req, res) =>{
    const users = await userModel.getUsers()
    
    return res.status(200).json(users)
}

const getSpecificUser = async (req, res) =>{
    // try{
        const {id} = req.params
        console.log(id)
        const queryResult = await getSpecificUser("usuario_id", id)
        return queryResult
    // }catch(e){
    //     return res.status(400).json({"error:":e})
    // }
}

const setUsers = async (req, res) =>{
    const emailResult = await userModel.getSpecificUser("email", req.body.email)

    if (emailResult[0] != undefined){
        return res.status(400).json({"error": "Email já existe"})
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

module.exports = {getUsers, setUsers, deleteUsers, getSpecificUser}