const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    patente: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;