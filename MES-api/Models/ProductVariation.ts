import mongoose, { Document, Schema } from 'mongoose';


export interface IProductVariation extends Document {
  product?: string; // ObjectId
  size: string;
  color: string;
  isBaseVariation: boolean;
  gender: string;
  weight: number;
  height: number;
  width: number;
  breadth: number;
  quantity: number;
  price: number;
  image: string;
  imageUrl: string;
  sku: string;
  createdOn: Date;
  modifiedOn?: Date;
}

const ProductVariationSchema = new mongoose.Schema<IProductVariation>(
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      size:{type:String},
      color:{type:String},
      isBaseVariation: { type: Boolean, default: false },
      gender:{type:String},
      weight:{type:Number},
      height:{type:Number},
      width:{type:Number},
      breadth:{type:Number},
      quantity:{type:Number},
      price:{type:Number},
      image:{type:String},
      imageUrl:{type:String},
      sku:{type:String},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

  ProductVariationSchema.index({ product: 1, isBaseVariation: 1 });

 export const ProductVariation=mongoose.model<IProductVariation>('ProductVariation',ProductVariationSchema)



