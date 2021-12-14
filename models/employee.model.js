const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeNumber: Number,
    lastName: String,
    firstName: String,
    extension: String,
    email: String,
    officeCode:String,
    reportsTo: Number,
    jobTitle: String,
});

const employee = mongoose.model('employee', employeeSchema);
module.exports = employee;