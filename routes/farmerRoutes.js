const farmerController=require("../controllers/farmerController");
const express =require ('express');
const router = express.Router();//default method


router.post('/register',farmerController.farmerRegister);
router.post('/login',farmerController.farmerLogin);

router.get('/all-farmers',farmerController.getAllFaremers);
router.get('/single-farmer/:teja',farmerController.getFarmerById);
module.exports=router;
