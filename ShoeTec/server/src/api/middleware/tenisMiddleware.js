const schema = require('../schema/tenisSchema')

const validateGetReq = (req, res, next) =>{
    const {error, value} = schema.tenisRequestSchema.validate(req.body)
    if (error){
        console.log(`Bad request resulting in ${error}`)
        console.log(req.body)
        return res.status(400).json({error: error})
    }

    next()
}

module.exports = {validateGetReq}