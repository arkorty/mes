import mongoose, { Document, Schema } from 'mongoose';

interface IWishList extends Document {
    userId?: string; // ObjectId
    productId?: string; // ObjectId
    productVariationId?: string; // ObjectId
    createdOn: Date;
    modifiedOn?: Date;
}

const WishListSchema = new mongoose.Schema<IWishList>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productVariationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariation', required: true },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedOn: { type: Date },
});

export const WishList = mongoose.model<IWishList>('WishList', WishListSchema);