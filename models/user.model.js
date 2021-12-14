const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    employeeNumber: Number,
});

const user = mongoose.model('user', userSchema);
module.exports = user;