const mongoose = require('mongoose');


post = new mongoose.Schema({
    title: String,
    text: String, 
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('post', post);