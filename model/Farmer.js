
const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required : true
    },
    rice:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Rice"
        }
    ]
});

const Farmer =mongoose.model('Farmer',farmerSchema);
module.exports=Farmer;