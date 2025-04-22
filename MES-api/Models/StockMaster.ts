import mongoose, { Document, Schema } from "mongoose";
const Joi = require("joi");

export interface IStockMaster extends Document {
  productId?: string; // ObjectId
  productVariationId?: string; // ObjectId
  quantity: number;
  createdOn: Date;
  modifiedOn?: Date;
  userId?: string; // ObjectId
}

const StockMasterSchema = new mongoose.Schema<IStockMaster>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productVariationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductsVariation",
  },
  quantity: { type: Number },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  modifiedOn: { type: Date, default: new Date() },
});

export const StockMaster = mongoose.model<IStockMaster>(
  "StockMaster",
  StockMasterSchema
);
