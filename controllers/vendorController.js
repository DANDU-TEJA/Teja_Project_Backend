const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
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
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            phone,
            email,
            password: hashedPassword,
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
        res.status(500).json({ error: "Internal server error farmer Registration failed" })
    }

}

const vendorLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })

        const vendorId = vendor._id;

        res.status(200).json({ success: "Login successful", token, vendorId })
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const getVendorById = async (req, res) => {
    const vendorId = req.params.apple;  // Make sure "apple" is the correct param name This Apple is in vendorRoutes

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        if (!vendor.firm || vendor.firm.length === 0) {
            return res.status(404).json({ error: "No firms linked to this vendor" });
        }

        const vendorFirmId = vendor.firm[0]._id;
        res.status(200).json({ vendorId, vendorFirmId, vendor });

        console.log(vendorFirmId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById }