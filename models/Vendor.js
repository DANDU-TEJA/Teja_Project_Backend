const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    district:{
        type:String,
        required:true
    },
    mandal:{
        type:String,
        required:true
    },
    village:{
        type:String,
        required:true
    },
    survey:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }]
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;