const tenisModel = require('../models/tenisModel')

const getTenis = async(req, res) =>{
    const result = await tenisModel.getTenis()
    res.status(200).json({"result": result})
}

const searchTenis = async(req, res) =>{
    try{
    const query = await tenisModel.searchTenis(req.body)

    console.log(query)
    res.status(200).json({'msg': "ok", query: query})
    } catch(err)  {
        throw err
    }
}

const getTenisById = async (req, res) =>{
    const {id} = req.params

    if (id) {
        const queryRes = await tenisModel.getTenisById(id)
        return res.status(200).json(queryRes)
    } else {
        return res.status(404).json({"error": "ID undefined"})
    }

}

module.exports = {getTenis, getTenisById, searchTenis}