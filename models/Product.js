const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    image: {
        type: String
    },
    bestSeller: {
        type: Boolean
    },
    description: {
        type: String
    },
    imageUrl:{
        type:String
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }],
    vendor:[{//new Change
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product