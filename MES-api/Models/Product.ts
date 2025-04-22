import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

const dimensionsSchema = new Schema(
  {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    unit: { type: String, enum: ["cm", "inch"], default: "cm" },
  },
  { _id: false }
);

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: string;
  sku: string;
  categoryId?: string; // ObjectId
  subCategoryId?: string; // ObjectId
  subSubCategoryId?: string; // ObjectId
  description: string;
  shortDescription: string;
  price: string;
  salePrice: string;
  specifications: string;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  productCategoryDepth: number;
  parentProductCategoryId: string; //immediate parent category
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      //required: true,
      ref: "Category",
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subSubCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },
    price: {
      type: String,
      required: true,
    },
    salePrice: {
      type: String,
      required: true,
    },
    specifications: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
