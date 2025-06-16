import mongoose, { Schema, Document } from "mongoose";

export interface IInstructor extends Document {
  name: string;
  bio?: string;
  image?: string;
  certifications?: string[];
  mobile: string;
  email: string;
}

const InstructorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, "Bio cannot be more than 1000 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
    certifications: {
      type: [String],
      default: [],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9+\s()-]{8,15}$/, "Please enter a valid mobile number"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const InstructorModel = mongoose.model<IInstructor>(
  "Instructor",
  InstructorSchema
);
