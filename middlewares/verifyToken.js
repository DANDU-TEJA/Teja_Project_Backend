const Farmer=require('../model/Farmer');
const jwt =require('jsonwebtoken');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.WhatIsYourName

const verifyToken = async(req,res,next)=>{
    const token =req.headers.token;

    if(!token){
        return res.status(400).json({message:'token is missing'})
    }
    try{
        const decoded=jwt.verify(token,secretKey)
        const farmer=await Farmer.findById(decoded.farmerId);

        if(!farmer){
            return res.status(400).json({message:'Farmer Not Found'})
        }
        req.farmerId=farmer._id

        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Invalid Token"});
    }
}

module.exports=verifyToken;