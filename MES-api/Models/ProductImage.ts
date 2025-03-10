import mongoose, { Document, Schema } from 'mongoose';


interface IProductImage extends Document {
  product?: string; // ObjectId
  image?: string;
  thumbnail?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isCover: boolean;
  createdOn: Date;
  modifiedOn?: Date;
}

const ProductImageSchema = new mongoose.Schema<IProductImage>(
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      image:{type:String},
      thumbnail:{type:String},
      imageUrl:{type:String,required:true},
      thumbnailUrl:{type:String},
      isCover:{type:Boolean,default:false},
      createdOn:{
        type: Date,
        default: new Date()
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const ProductImage=mongoose.model<IProductImage>('ProductImage',ProductImageSchema)



