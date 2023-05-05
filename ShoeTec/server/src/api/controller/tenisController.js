const tenisModel = require('../models/tenisModel')

const getTenis = async(req, res) =>{
    const result = await tenisModel.getTenis()
    res.status(200).json({"result": result})
}

module.exports = {getTenis}