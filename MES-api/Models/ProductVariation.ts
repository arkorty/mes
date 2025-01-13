const Joi=require('joi');
const mongoose=require('mongoose');
import { boolean, } from "joi/lib";
import { Schema } from "mongoose";



const ProductVariationSchema = new mongoose.Schema(
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      size:{type:String},
      color:{type:String},
      isBaseVariation: { type: Boolean, default: false },
      gender:{type:String},
      weight:{type:Number},
      height:{type:Number},
      width:{type:Number},
      breadth:{type:Number},
      quantity:{type:Number},
      price:{type:Number},
      image:{type:String},
      imageUrl:{type:String},
      sku:{type:String},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const ProductVariation=mongoose.model('ProductVariation',ProductVariationSchema)



