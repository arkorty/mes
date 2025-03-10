import mongoose, { Document, Schema } from 'mongoose';
import { OrderStatus, PaymentStatus } from "../Common/Common";
import { AddressSchema } from "./User";
import { IAddress } from '../types/models';

interface IOrder extends Document {
    id: string;
    userId?: string; // ObjectId
    items: {
        productId: string; // ObjectId
        productVariationId?: string; // ObjectId
        quantity: number;
    }[];
    deliveryCharges: number;
    subTotal: number;
    total: number;
    shippingAddress: IAddress; // Assuming Address is defined
    paymentMethod?: string;
    paymentStatus?: string;
    status?: string;
    currency?: string;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt?: Date;
    deliveredAt?: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
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
    shippingAddress: AddressSchema,
    paymentMethod: { type: String },
    paymentStatus: { type: String, default: PaymentStatus.Processing },
    status: { type: String, default: OrderStatus.Processing },
    currency: { type: String, default: "USD" },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
}, {
    timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);