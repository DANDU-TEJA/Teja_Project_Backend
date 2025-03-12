const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({ //farmerSchema
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
    products: [{
        type: mongoose.Schema.Types.ObjectId, //Firm Concept is Removed..
        ref: 'Product'//Farmer
    }],
    
});

const Vendor = mongoose.model('Vendor', vendorSchema); //Farmer ('Farmer', farmerSchema)

module.exports = Vendor; //Farmer