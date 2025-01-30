const express = require("express");

const app =express();

const farmerRoutes =require('./routes/farmerRoutes')
const riceRoutes=require('./routes/riceRoutes')
const productRoutes=require('./routes/productRoutes');

const cors=require('cors');

const path=require('path');

//now convert the text into json format for that we need body parser
const bodyParser = require('body-parser');

const dotEnv=require("dotenv");
const mongoose=require("mongoose");

 app.use(cors());
dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Teja Mongo DB Connected Successfully"))
.catch((error)=>console.log(error))

const PORT=4000
app.listen(PORT,()=>{
    console.log(`Teja Server Started At ${PORT}`);
});

app.use('/home',(req,res)=>{
    res.send("<h1>Teja Welcome To MERN");
});

app.use(bodyParser.json());
//Now To Use The HTTP methods We Need The Middle Wares
app.use('/farmer',farmerRoutes);

app.use('/rice',riceRoutes);

app.use('/product',productRoutes); 
app.use('/uploads',express.static('uploads'));