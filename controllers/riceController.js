const Rice =require('../model/Rice');
const Farmer=require('../model/Farmer');

const multer=require('multer');
const path =require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

const addRice=async(req,res)=>{
    try{
        const {cropName,area,region,orgfarmer,offer}=req.body;
    const image =req.file?req.file.filename: undefined;

    const farmer =await Farmer.findById(req.farmerId);
    if(!farmer){
        res.status(404).json({message:"farmer Not Found"})
    }

    const rice = new Rice({cropName,area,region,orgfarmer,offer,image,farmer : farmer._id})

    const savedRice=await rice.save();

    const riceID=savedRice._id

    farmer.rice.push(savedRice)
    await farmer.save();

    
    return res.status(200).json({message:"Rice Added Successfully" , riceID})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Rice Not Addded"})
    }
}

const deleteCropById=async(req,res)=>{
    try{
        const cropId=req.params.cropId;
        const deletedCrop=Rice.findByIdAndDelete(cropId);

        if(!deletedCrop){
            return res.status(404).json({message:"Crop Not Found"});

        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Crop Not Deleted"});

    }
}

module.exports={addRice:[upload.single('image'),addRice],deleteCropById}