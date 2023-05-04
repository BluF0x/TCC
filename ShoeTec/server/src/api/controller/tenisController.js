const tenisModel = require('../models/tenisModel')

const getTenis = async(req, res) =>{
    console.log(req.body)
    const result = await tenisModel.getTenis(req.body)
    res.status(200).json({"result": result})
}

module.exports = {getTenis}