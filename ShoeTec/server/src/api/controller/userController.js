const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const connection = require('../models/connection')

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

const loginUser = async (req, res) =>{
    const {email, pass} = req.body

    try {
        if (email && pass)  {
            user = await userModel.getSpecificUser("email", email)
            
            if (user.name === "Error") {
                return res.status(400).json({error: query.message, "stack" : query.stack})
            }

            const passMatch = await bcrypt.compare(pass, user[0].pass)
            if (passMatch){
                let session = req.session
                session.username = user[0].name
                session.userid = user[0].usuario_id
                return res.status(200).json({"msg": "Ok"})
            } else {
                return res.status(400).json({"msg": "Senha incorreta"})
            }
        }
        else {
            res.status(400)
        }
    }catch (error) {
        res.status(500).json({"Erro": error.message, "Trace": error.stack})
    }
}

    const logoutUser = async (req, res) => {
        req.session.destroy((err) => {
           if (err) {
            return res.status(500).json({error: 'Erro ao sair'})
           } 
           res.clearCookie('connection.sid')
           return res(200).json({success: trun, "msg": "Saiu com sucesso"})
        })
    }

module.exports = {getUsers, setUsers, deleteUsers, getSpecificUser, loginUser}