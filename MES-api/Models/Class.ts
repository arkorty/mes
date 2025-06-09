import mongoose, { Document } from "mongoose";

export interface IClass extends Document {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  instructor: string;
  instructorBio?: string;
  instructorImage?: string;
  level: string;
  duration: string;
  location: string;
  dates: string[];
  price: number;
  capacity: number;
  spotsLeft: number;
  skillsCovered?: string[];
  details?: {
    whatToBring?: string[];
    whatWeProvide?: string[];
    instructorCertifications?: string[];
    priceNote?: string;
  };
}

const ClassSchema = new mongoose.Schema<IClass>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    instructor: { type: String, required: true },
    instructorBio: { type: String, required: false },
    instructorImage: { type: String, required: false },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    dates: [{ type: String, required: true }],
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
    skillsCovered: [{ type: String, required: false }],
    details: {
      whatToBring: [{ type: String, required: false }],
      whatWeProvide: [{ type: String, required: false }],
      instructorCertifications: [{ type: String, required: false }],
      priceNote: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export const ClassModel = mongoose.model<IClass>("Class", ClassSchema);
