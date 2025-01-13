const mongoose=require('mongoose');
import { Schema } from "mongoose";



const ProductImageSchema = new mongoose.Schema(
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      image:{type:String},
      thumbnail:{type:String},
      imageUrl:{type:String,required:true},
      thumbnailUrl:{type:String},
      isCover:{type:Boolean,default:false},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const ProductImage=mongoose.model('ProductImage',ProductImageSchema)



