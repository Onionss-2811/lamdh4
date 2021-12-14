const customerModel = require('../models/customer.model')

const { AppError, handleError } = require('../error/handle.error');

// get all customer
const getAllCustomer = handleError(async (req, res) => {
    const result = await customerModel.find().exec();
    res.send(result);
});

// get customer by id
const getCustomerById = handleError(async (req, res) => {
    const customer = await customerModel.findOne({customerNumber: req.params.id  }).exec();
    res.send(customer);
});

// add new customer
const addCustomer = handleError(async (req, res)=>{
    const customer = new customerModel(req.body);
    const result = await customer.save();
    res.send(result)
});

// update customer
const updateCustomer = handleError(async (req, res)=>{
    const customer = await customerModel.findOne({customerNumber: req.params.id }).exec();
    customer.set(req.body);
    const result = await customer.save();
    res.send(result)
});

// delete customer
const deleteCustomer = handleError(async (req, res)=>{
    const result = await customerModel.deleteOne({ customerNumber: req.params.id }).exec();
    res.send(result);
});

module.exports = {
    getAllCustomer,
    getCustomerById, 
    addCustomer,
    updateCustomer,
    deleteCustomer
}