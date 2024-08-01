const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String, 
        required: true 
    }, 
    description: { 
        type: String 
    }
});

module.exports = mongoose.model('Email', EmailSchema);
