import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
    userId?: string; // ObjectId
    items: {
        productId: string; // ObjectId
        productVariationId: string; // ObjectId
        quantity: number;
    }[];
    total: number;
    subTotal: number;
    createdOn: Date;
    modifiedOn?: Date;
}

const CartSchema = new mongoose.Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        productVariationId: { type: Schema.Types.ObjectId, ref: 'ProductVariation' },
        quantity: {
            type: Number,
            default: 1
        },
    }],
    total: { type: Number },
    subTotal: { type: Number },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: { type: Date },
});

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
