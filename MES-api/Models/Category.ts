import mongoose from "mongoose";
import { Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  description?: string;
  parentId?: string; // ObjectId
  image?: string;
  imageUrl?: string;
  createdOn: Date;
  modifiedOn?: Date;
}


const CategorySchema = new mongoose.Schema<ICategory>(
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

 export const Category=mongoose.model<ICategory>('Category',CategorySchema)



