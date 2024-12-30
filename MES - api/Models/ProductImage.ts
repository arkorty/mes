const Joi=require('joi');
const mongoose=require('mongoose');
import { boolean, string } from "joi/lib";
import { Schema } from "mongoose";



const ProductImageSchema = new mongoose.Schema(
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      image:{type:string},
      isCover:{type:boolean},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const ProductImage=mongoose.model('ProductImage',ProductImageSchema)



