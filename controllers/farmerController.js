const Farmer = require("../model/Farmer");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotEnv=require('dotenv');
dotEnv.config();

const secretKey=process.env.WhatIsYourName;

const farmerRegister=async(req,res)=>{
    const {username,email,password,district,mandal,village,survy}=req.body;
    try{
        const farmerEmail = await Farmer.findOne({email});
        if(farmerEmail){
            return res.status(400).json({message :"Email Already Exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        //To Save This Data in DB we Need Save() method
        const newFarmer= new Farmer({
            username,
            email,
            password:hashedPassword,
            district,
            mandal,
            village,
            survy
        });
        await newFarmer.save();

        res.status(201).json({message:"Farmer Registerd Successfully"});
        console.log('Farmer Registered');
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Registartion Failed"})
    }
}

const farmerLogin = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const farmer = await Farmer.findOne({email});
        if(!farmer || !(await bcrypt.compare(password,farmer.password))){
            return res.status(400).json({message :"Invalid Email or Password"});
        }

        const token=jwt.sign({farmerId:farmer._id},secretKey,{expiresIn:"1h"})

        res.status(200).json({success:"Logi Successful", token})
        console.log(email,"This is Token ",token);
    }
    catch(error){
        res.status(400).json({message :"Failed To Login"});
    }
}
const getAllFaremers=async(req,res)=>{
    try{
        const farmers=await Farmer.find().populate('rice');
        res.json({farmers})
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getFarmerById=async(req,res)=>{
    const farmerId=req.params.teja;

    try{
        const farmer=await Farmer.findById(farmerId).populate('rice');
        if(!farmer){
            return res.status(404).json({error:"Farmer not founde"})
        }
        res.status(200).json({farmer})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"farmer not found"})
    }
}

module.exports={farmerRegister,farmerLogin,getAllFaremers,getFarmerById};