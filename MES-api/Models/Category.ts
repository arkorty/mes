import mongoose from "mongoose";
import { Schema } from "mongoose";



const CategorySchema = new mongoose.Schema(
    {
      name:{type:String},  
      description:{type:String},
      parentId: { type: Schema.Types.ObjectId, ref: 'Category',default:null},
      image:{type:String},
      imageUrl:{type:String},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const Category=mongoose.model('Category',CategorySchema)



