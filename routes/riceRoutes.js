const express=require('express');
const riceController=require('../controllers/riceController')
const verifyToken=require('../middlewares/verifyToken');

const router=express.Router()
router.post('/add-rice',verifyToken,riceController.addRice);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

router.delete('/:cropId',riceController.deleteCropById);
module.exports=router;