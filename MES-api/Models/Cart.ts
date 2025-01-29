import { Schema } from "mongoose";

const mongoose=require('mongoose');



const CartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    items:[{
        productId:{type:mongoose.Schema.Types.ObjectId, ref : "Product"},
        productVariationId: {type:mongoose.Schema.Types.ObjectId,ref:'ProductVariation'},
        quantity:{
          type:Number,
          default:1
        },
    }],    
    total:{type:Number},
    subTotal:{type:Number},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const Cart=mongoose.model('Cart',CartSchema);