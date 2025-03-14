const Joi=require('joi');
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: number;
  picture?: string;
  address?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdOn: Date;
  modifiedOn?: Date;
}



const UserSchema = new mongoose.Schema<IUser>(
    {
      name: {  type: Joi.string().required(),  },
      email:{type: Joi.string(),required: true,unique: true},
      mobile:{  type: Joi.string(), required: true  },
      password:{  type: Joi.string(), required: true  },
      role:{type:Number, required: true},
      picture:{ type: Joi.string(), },
      address:{type:String},
      isActive:{type: Joi.boolean(),default:true},
      isDeleted:{type: Joi.boolean(),default:false},
      createdOn:{
        type: Date,
        default: Date.now
      },
      modifiedOn:{ type:Date },
    },    
  );

 export const User=mongoose.model<IUser>('Users',UserSchema)



 
export const AddressSchema={
  address:{type:String},
  state:{type:String},
  city:{type:String},
  zipCode:{type:String},  
}



