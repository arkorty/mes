import { PaymentStatus } from "../Common/Common";

import mongoose, { Document, Schema } from 'mongoose';


interface ISale extends Document {
    userId?: string; // ObjectId
    productId?: string; // ObjectId
    productVariationId?: string; // ObjectId
    price: number;
    quantity: number;
    paymentStatus?: string;
    createdOn: Date;
}

const SaleSchema=new mongoose.Schema<ISale>({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    productVariationId:{type:mongoose.Schema.Types.ObjectId,ref:'ProductVariation'},
    price:{type:Number},
    quantity:{type:Number},
    paymentStatus:{type:String,default:PaymentStatus.Processing},
    createdOn:{
        type: Date,
        default: Date.now
    },
})

export const Sale= mongoose.model<ISale>('Sale',SaleSchema);