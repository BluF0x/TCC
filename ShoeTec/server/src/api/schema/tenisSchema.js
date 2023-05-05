const Joi = require('joi')

const tenisRequestSchema = Joi.object({
    values: Joi.string().required(),
    args: Joi.string()
})

module.exports = {tenisRequestSchema}