const Vendor = require('../models/Vendor');
//const jwt = require('jsonwebtoken'); removing jwt concept 11/6/25
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName



const vendorRegister = async(req, res) => {
    const { username,phone, email, password,district,mandal,village,survey,location} = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        //const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            phone,
            email,
            password,
            district,
            mandal,
            village,
            survey,
            location
        });
        await newVendor.save();

        res.status(201).json({ message: "Farmer registered successfully" });
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error farmer Registration failed check in vendor Register" })
    }
}

const vendorLogin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email,password });
        if(!vendor){
            return res.status(400).json("Invalid email or password");
        }        
        
         // if login successful return vendor Id and Name
         
        res.status(200).json({ success: "Login successful",  vendorId : vendor._id, vendorName: vendor.username });

        console.log("login successful",email);
    } catch (error) {
        console.log("Login failed in backed",error);
        res.status(500).json({ error: "Internal server error in vendorLogin fun" });
    }

};

const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find();    //.populate('firm');
        res.json({ vendors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getVendorById = async (req, res) => {
    const vendorId = req.params.apple;  // Make sure "apple" is the correct param name This Apple is in vendorRoutes

    try {
        const vendor = await Vendor.findById(vendorId);  //.populate('firm');
        
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // if (!vendor.firm || vendor.firm.length === 0) {
        //     return res.status(404).json({ error: "No firms linked to this vendor" });
        // }

        //const vendorProductId = vendor.products[0]._id;
        res.status(200).json({ vendorId, vendor });
        console.log("Vendor Data Fetched By his Id ",vendorId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById }