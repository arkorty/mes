import mongoose from "mongoose";
import { TEnquiry } from "../types/models";

const enquirySchema = new mongoose.Schema<TEnquiry>(
  {
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    message: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Enquiry = mongoose.model("enquiries", enquirySchema);

export default Enquiry;
