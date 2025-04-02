const express = require('express');
const productController = require("../controllers/productController");

const path = require('path');
const { route } = require('./vendorRoutes');

const router = express.Router();

router.post('/add-product/:vendorId', productController.addProduct);//vendorId Added newly 11/3/25
//router.get('/:firmId/products', productController.getProductByFirm);

router.get('/get-product/:vendorId',productController.getProductsByVendor);

router.get('/all-products',productController.getAllProducts);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// Update product by ID route
router.put('/update-product/:productId', productController.updateProductById);

router.delete('/:productId', productController.deleteProductById);

module.exports = router;