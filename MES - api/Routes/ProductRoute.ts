import express from "express";
const productRouter=express.Router();
import { upload } from "../Config/FileStorageConfig";


import {  AddUpdateProduct,
    DeleteProduct,
    ProductList,
    ProductDetails, } from "../Controllers/ProductController";
    
productRouter.put('/upsert',
    upload.fields([{name:`coverImage`,maxCount:1},{name:`otherImages`,maxCount:10}]),
    AddUpdateProduct)   
    
productRouter.get('/:id',ProductDetails).delete('/:id',DeleteProduct)
productRouter.get('',ProductList)


export default productRouter



