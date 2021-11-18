const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const userschema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    emailId: {
        type: String, 
        required: true
    },

    mobNum: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const user = mongoose.model('user',userschema);
module.exports = user;