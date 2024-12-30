const Joi=require('joi');
const mongoose=require('mongoose');
import { boolean, number, string } from "joi/lib";
import { Schema } from "mongoose";



const ProductVariationSchema = new mongoose.Schema(
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      size:{type:string},
      color:{type:string},
      gender:{type:string},
      weight:{type:number},
      height:{type:number},
      width:{type:number},
      breadth:{type:number},
      quantity:{type:number},
      price:{type:number},
      sku:{type:string},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const ProductVariation=mongoose.model('ProductVariation',ProductVariationSchema)



