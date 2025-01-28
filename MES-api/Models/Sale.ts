import { PaymentStatus } from "../Common/Common";

const mongoose=require('mongoose');

const SaleSchema=new mongoose.Schema({
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

export const Sale= mongoose.model('Sale',SaleSchema);