import { string } from "joi";
import { PaymentStatus } from "../Common/Common";
import mongoose, { Document, Schema } from 'mongoose';

const Joi=require('joi');



export interface IPayment extends Document {
    id: string;
    userId?: string; // ObjectId
    orderId?: string; // ObjectId
    paymentMethod?: string;
    paymentStatus?: string;
    amount: number;
    currency: string;
    card: {
        name: string;
        number: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
        card_type: string;
    };
    createdOn: Date;
}

const PaymentSchema=new mongoose.Schema<IPayment>({
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