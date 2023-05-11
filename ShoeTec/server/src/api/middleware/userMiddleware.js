const userSchema = require('../schema/userSchema')

const validateInput=(req, res, next)=>{
    console.log(req.body)
    const {error, value} = userSchema.signupSchema.validate(req.body)

    if(error) {
        console.log(`Bad Request from ${req.ip}`)
        console.log(error)
        return res.status(400).json({error: error})
    }

    
    
    console.log(value)

    next()
}

module.exports= {validateInput}