const express = require('express');

const userRouter = require('express-promise-router')();

const userController = require('../controller/user.controller');

const {validateBody, schemas} = require('../middleware/validate.middleware')

// user register
userRouter.route('/user/register')
    .post(validateBody(schemas.userSchema), userController.createUser)
// user login
userRouter.post('/user/login', userController.userLogin);

module.exports = userRouter;