const Joi = require('joi')

const signupSchema = Joi.object({
    email: Joi.string().email().required().min(1).max(255),
    name: Joi.string().required().min(1).max(255),
    password: Joi.string().required().min(1).max(255),
    pais: Joi.string().required().min(1).max(255),
    estado: Joi.string().min(1).max(255).allow(null),
    cidade: Joi.string().min(1).max(255).allow(null),
    genero: Joi.string().required().min(1).max(1).valid('O', 'F', 'M'),
    esportes: Joi.array().items(Joi.string())
})

module.exports = {signupSchema}