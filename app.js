const express = require('express');
const BodyParser = require("body-parser");
const securityApp = require("helmet");
const mongoose = require("mongoose");
const logger = require('morgan')

// set up mongodb by mongoose
mongoose.connect("mongodb://localhost/restful_api")
    .then(() => console.log('✅ connect database success'))
    .catch((error) => console.error('❌ connect database fail'))

// const customerRouter = require('./routes/customer.route');

const app = express(); 

app.use(securityApp());

const { handleErrors} = require('./error/handle.error');

const employeeRouter = require('./routes/employee.route');
const customerRouter = require('./routes/customer.route');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(handleErrors);

// Middlewares
app.use(logger('dev'));

// Routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    })
})
app.use(employeeRouter);
app.use(customerRouter);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // resqonse to client
    return res.status(status).json({
        error:{
            message: error.message
        }
    })
})

// listening port
const port = app.get('port') || 3000;
app.listen(port, ()=>console.log(`Server is listening on port ${port}`))
