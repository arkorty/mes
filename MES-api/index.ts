import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import { DbConnect } from './Config/DbConfig';
import categoryRouter from "./Routes/CategoryRoute";
import productRouter from "./Routes/ProductRoute";
import orderRouter from "./Routes/OrderRouter";
import userRouter from "./Routes/UserRoute";
import cartRouter from "./Routes/CartRouter";
import wishListRouter from "./Routes/WishlistRouter";
import enquiryRouter from "./Routes/EnquiryRouter";

dotenv.config();
const port= process.env.PORT || 3000;

//app config
const app = express()
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({limit: '2mb',extended: false}));
app.use(cors({
    origin: true,
    methods: ["GET, POST, PATCH, DELETE, PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.static('uploads'));
app.use("/uploads",express.static('uploads'));


//routes
const deployTime = new Date();
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Welcome to MES API",
        deployTime
    })
})
app.use('/api/user/',userRouter)
app.use('/api/category/',categoryRouter)
app.use('/api/product/',productRouter)
app.use('/api/order/',orderRouter)
app.use('/api/cart/',cartRouter)
app.use('/api/wishlist', wishListRouter)
app.use('/api/enquiry', enquiryRouter)



app.listen(port,async()=>{
    await DbConnect();
    console.log(`running on port ${port}`);
})
