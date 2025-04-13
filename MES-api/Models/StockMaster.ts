import mongoose, { Document, Schema } from 'mongoose';
const Joi=require('joi');


export interface IStockMaster extends Document {
    product?: string; // ObjectId
    variation?: string; // ObjectId
    quantity: number;
    createdOn: Date;
    modifiedOn?: Date;
    userId?:string; // ObjectId
}

const StockMasterSchema = new mongoose.Schema<IStockMaster>(
    {
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required: true,},
        variation:{type:mongoose.Schema.Types.ObjectId,ref:'ProductsVariation'},
        quantity:{type:Number},
        createdOn:{
            type: Date,
            default: new Date(),
        },
        modifiedOn:{ type:Date,default: new Date(), },
    },    
);

   export const StockMaster=mongoose.model<IStockMaster>('StockMaster',StockMasterSchema)
  
