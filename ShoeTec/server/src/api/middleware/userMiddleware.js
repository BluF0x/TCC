const userSchema = require('../schema/userSchema')

const validateInput=(req, res, next)=>{
    const {error, value} = userSchema.signupSchema.validate(req.body)

    if(error) {
        console.log(`Bad Request from ${req.ip}`)
        return res.status(400).json({error: error})
    }

    
    
    console.log(value)

    next()
}

module.exports= {validateInput}