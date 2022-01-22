const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

user = new mongoose.Schema({
    name:{
        firstName: String,
        lastName: String
    },
    DoB: Date,
    userName:{
        type: String,
        unique: true,
        required: true
    },
    gender: Boolean,
    email: String,
    isAdmin: Boolean
});

user.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('user', user);