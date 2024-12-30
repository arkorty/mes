import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const dimensionsSchema = new Schema({
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  unit: { type: String, enum: ['cm', 'inch'], default: 'cm' }
}, { _id: false });


const productSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true
    },
    sku: {
      type: String,
      required: true,
      unique: true
    },
    brand: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    subSubCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    salePrice: {
      type: Number,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
   
    isActive: {
      type: Boolean,
      default: true
    },
    
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String,
      trim: true
    }]
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  
  // Indexes
  // productSchema.index({ name: 'text', description: 'text' });
  // productSchema.index({ categoryId: 1, isActive: 1 });
  // productSchema.index({ brand: 1 });
  // productSchema.index({ tags: 1 });
  // productSchema.index({ slug: 1 });
  
  // Auto-generate slug before saving

  
  export const Product = mongoose.model('Product', productSchema);