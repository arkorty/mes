const Joi=require('joi');
const mongoose=require('mongoose');
import { boolean, string } from "joi/lib";
import { Schema } from "mongoose";



const CategorySchema = new mongoose.Schema(
    {
      name:{type:string},  
      description:{type:string},
      parentId: { type: Schema.Types.ObjectId, ref: 'Category',default:null},
      picture:{type:string},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const Category=mongoose.model('Category',CategorySchema)



