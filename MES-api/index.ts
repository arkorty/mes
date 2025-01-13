import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import { DbConnect } from './Config/DbConfig';
import categoryRouter from "./Routes/CategoryRoute";
import productRouter from "./Routes/ProductRoute";

dotenv.config();
const port=process.env.PORT || 3000;

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
app.use('/api/category/',categoryRouter)
app.use('/api/products/',productRouter)



app.listen(port,async()=>{
    await DbConnect();
    console.log(`running on port ${port}`);
})
