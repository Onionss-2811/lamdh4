const Joi = require('joi');

const validateBody = (schema) =>{
    return ( req, res, next) =>{
        const validatorResult = schema.validate(req.body)

        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        } else {
            if(!req.value) req.value = {}
            if(!req.value['params']) req.value.params = {};

            req.value.body = validatorResult.value
            next()
        }
    }
}
 
const schemas = {
    employeeSchema: Joi.object({
        employeeNumber: Joi.number().required().positive(),
        lastName: Joi.string().min(3).max(50).required(),
        firstName: Joi.string().min(3).max(50).required(),
        extension: Joi.string().max(50).required(),
        email: Joi.string().email().min(10).max(100).required(),
        officeCode: Joi.string().max(10).required(),
        repostsTo: Joi.number().positive(),
        jobTitle: Joi.required().valid('President', 'Manager', 'Leader', 'Staff')
    }),

    customerSchema: Joi.object({
        customerNumber: Joi.number().required().positive(),
        customerName: Joi.string().min(5).max(10).required(),
        contactLastName: Joi.string().min(3).max(50).required(),
        contactFristName: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(8).max(20).required(),
        addressLine1: Joi.string().min(10).max(50).required(),
        addressLine2: Joi.string().min(10).max(50).allow(null).optional(),
        city: Joi.string().min(2).max(50).required(),
        state: Joi.string().min(2).max(50).allow(null).optional(),
        postalCode: Joi.string().min(5).max(15).allow(null).optional(),
        country: Joi.string().min(2).max(50).required(),
        salesRepEmployeeNumber: Joi.number().required().positive(),
        creditLimit: Joi.number().positive().allow(null).optional()
    }),

    userSchema: Joi.object({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().required(),
        employeeNumber: Joi.number().required().positive()
    })
}

module.exports = {
    validateBody,
    schemas
}