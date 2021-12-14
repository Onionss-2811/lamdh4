const express = require('express');
// const customerRouter = express.Router();
const customerRouter = require('express-promise-router')();

const auth = require('../middleware/author.middleware.js');

const customerController = require('../controller/customer.controler');

const {validateBody, schemas} = require('../middleware/validate.middleware')

customerRouter.route('/customers')
    .get(auth(['President','Manager','Leader']),customerController.getAllCustomer)
    .post(auth(['President','Manager']),validateBody(schemas.customerSchema),customerController.addCustomer)

customerRouter.route('/customers/:id')
    .get(auth(['President','Manager','Leader']),customerController.getCustomerById)
    .put(auth(['President','Manager']),validateBody(schemas.customerSchema),customerController.updateCustomer)
    .delete(auth(['President']),customerController.deleteCustomer)

module.exports = customerRouter;

