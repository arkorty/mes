import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  type: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  spotsLeft: number;
  tags?: string[];
  details?: {
    whatToBring?: string[];
    whatWeProvide?: string[];
    priceNote?: string;
  };
}

const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
    tags: [{ type: String, required: false }],
    details: {
      whatToBring: [{ type: String, required: false }],
      whatWeProvide: [{ type: String, required: false }],
      priceNote: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);
