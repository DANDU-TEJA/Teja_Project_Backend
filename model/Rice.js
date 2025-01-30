
const mongoose=require('mongoose');

const riceSchema=new mongoose.Schema({
    cropName:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    region:{
        type:[{
            type:String,
            enum:['north-indian', 'south-indian']
        }],
        required:true
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    farmer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Farmer'
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]

});

const Rice=mongoose.model('Rice',riceSchema);

module.exports=Rice;