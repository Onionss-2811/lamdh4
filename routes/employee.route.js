const express = require('express');

const employeeRouter = require('express-promise-router')();

const auth = require('../middleware/author.middleware.js');

const employeeController = require('../controller/employee.controller');

const {validateBody, schemas} = require('../middleware/validate.middleware')

employeeRouter.route('/employees')
    .get(auth(['President','Manager','Leader']), employeeController.getAllEmployee)
    .post(auth(['President','Manager']),validateBody(schemas.employeeSchema), employeeController.addEmployee)

employeeRouter.route('/employees/:id')
    .get(auth(['President','Manager','Leader']), employeeController.getEmployeeById)
    .put(auth(['President','Manager']),validateBody(schemas.employeeSchema), employeeController.updateEmployee)
    .delete(auth(['President']),employeeController.deleteEmployee)


module.exports = employeeRouter;