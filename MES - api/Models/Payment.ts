import { string } from "joi";
import { PaymentStatus } from "../Common/Common";

const Joi=require('joi');
const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema({
    id:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:'Order'},
    paymentMethod:{type:Joi.string()},
    paymentStatus:{type:Joi.string(),default:PaymentStatus.Processing},
    amount:{type:Number},
    currency:{type:String},
    card:{
        type:{
            name:String,
            number:String,
            exp_month:Number,
            exp_year: Number,
            cvv:String,
            card_type: String,
        }
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
})

export const Payment= mongoose.model('Payment',PaymentSchema);