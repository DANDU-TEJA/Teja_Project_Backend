const Product =require('../model/Product');
const multer=require('multer');
const Rice=require('../model/Rice')

const path = require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

const addProduct=async(req,res)=>{
    try{
        const {productName,price,quantity,color,region,description}=req.body;
        const image=req.file?req.file.filename:undefined;

        const riceId=req.params.riceId;
        const rice=await Rice.findById(riceId);
        if(!rice){
            return res.status(404).json({message:"No Rice Found"});
        }
        const product=new Product({
            productName,price,quantity,color,region,description,image,rice : rice._id
        })

        const savedProduct=await product.save();
        rice.product.push(savedProduct);
        await rice.save();
        res.status(200).json({savedProduct})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Product Controller no added"})
    }
}

const getProductByRice=async(req,res)=>{
    try{
        const riceId=req.params.riceId;
        const rice=await Rice.findById(riceId);

        if(!rice){
            return res.status(404).json({error:"No Rice Found"}); 
        }

        const cropName=rice.cropName;
        const products=await Product.find({rice:riceId});
        res.status(200).json({cropName,products});
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Product Not Fetched By Id"});
    }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const deletedProduct=Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({error:"No Product Found"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Product Not Deleted"});

    }
}

module.exports={addProduct:[upload.single('image'),addProduct],getProductByRice,deleteProductById};