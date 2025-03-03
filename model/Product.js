const mongoose=require('mongoose');

const productSchema =new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    region:{
        type:[{
            type:String,
            enum:['north-indian','south-indian']
        }]
    },
   
    orgfarmer:{
        type:Boolean
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    rice: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rice'
        }
       ]

});

const Product=mongoose.model('Product',productSchema);
module.exports=Product;