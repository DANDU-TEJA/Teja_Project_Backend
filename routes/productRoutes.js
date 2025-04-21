const express = require('express');
const productController = require("../controllers/productController");

const path = require('path');
const { route } = require('./vendorRoutes');

const router = express.Router();

const upload = require('../middlewares/multerConfig');

router.post('/add-product/:vendorId',upload.single('image') ,productController.addProduct);//vendorId Added newly 11/3/25
//router.get('/:firmId/products', productController.getProductByFirm);

router.get('/get-product/:vendorId',productController.getProductsByVendor);

router.get('/all-products',productController.getAllProducts);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// Update product by ID route
router.put('/update-product/:productId',upload.single('image') ,productController.updateProductById);

router.delete('/:productId', productController.deleteProductById);

module.exports = router;