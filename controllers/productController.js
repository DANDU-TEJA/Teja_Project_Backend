const Product = require("../models/Product");
const multer = require("multer");
//comment
const path = require('path');
const Vendor=require ("../models/Vendor");// New Change


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });
//Add Product
const addProduct = async(req, res) => {
    try {
        const { productName, price,quantity,color,bestSeller, description,imageUrl } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendorId=req.params.vendorId;//New Change
        const vendor=await Vendor.findById(vendorId);// new change



        if(!vendor){//new Change
            return res.status(404).json({ error: "No vendor found in productController" });
        }

        const product = new Product({
            productName,
            price,
            quantity,
            color,
            image,
            bestSeller,
            description,
            imageUrl,
            
            vendor:vendor._id //new change
        })

        const savedProduct = await product.save();


        vendor.products.push(savedProduct._id);

        await vendor.save();

        //await firm.save()

        res.status(200).json(savedProduct);
        console.log("Product added successfully",savedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error in Product controller" })
    }
}


const getProductsByVendor = async (req, res) => {
    try {
        const vendorId = req.params.vendorId;

        // Find the vendor first
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // Find products associated with this vendor
        const products = await Product.find({ vendor: vendorId });

        res.status(200).json({ vendorName: vendor.username, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error in Product controller" });
    }
};



//Get All Products from All Farmers
const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().populate('vendor');//populate firm removed 11/3/25
        res.status(200).json(products);
    }catch(error){
        console.error(error,"New Change in ProductCtrl");
        res.status(500).json({error: "Internal server error in Product controller" });
    }
};

// Update Product by ID
const updateProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { productName, price, quantity, color, bestSeller, description, imageUrl } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Update fields if they exist in the request
        if (productName) product.productName = productName;
        if (price) product.price = price;
        if (quantity) product.quantity = quantity;
        if (color) product.color = color;
        if (bestSeller !== undefined) product.bestSeller = bestSeller;
        if (description) product.description = description;
        if (imageUrl) product.imageUrl = imageUrl;
        if (image) product.image = image;

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
        console.log("Product updated successfully", updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error in Product controller to Update Product" });
    }
};

const deleteProductById = async(req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct],
    
     getAllProducts,
     deleteProductById,
     updateProductById,
     getProductsByVendor};
