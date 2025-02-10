import { Schema } from "mongoose";

const Joi=require('joi');
const mongoose=require('mongoose');



const WishListSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    productId:{type:mongoose.Schema.Types.ObjectId, ref : "Product"},
    productVariationId: {type:mongoose.Schema.Types.ObjectId,ref:'ProductVariation'},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const WishList=mongoose.model('WishList',WishListSchema);