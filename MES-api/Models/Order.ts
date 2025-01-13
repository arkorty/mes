
const Joi=require('joi');
const mongoose=require('mongoose');
import { Schema } from "mongoose";
import { OrderStatus, PaymentStatus } from "../Common/Common";
import { AddressSchema } from "./User";


const OrderSchema=new mongoose.Schema({
    id: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    items: [
        {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productVariationId: { type: Schema.Types.ObjectId, ref: 'ProductVariation' },
        quantity: { type: Number, default: 1, min: 1 }
        }
    ],
    deliveryCharges: { type: Number, default: 0 },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shippingAddress:AddressSchema,
    paymentMethod:{type:Joi.string()},
    paymentStatus:{type:Joi.string(),default:PaymentStatus.Processing},
    status:{type:Joi.string(),default:OrderStatus.Processing},
    currency:{type:Joi.string(),default:"USD"},
    isPaid:{
        type:Boolean,
        default:false
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    deliveredAt:Date,
},{
    timestamps: true
});


export const Order=mongoose.model('Order',OrderSchema);