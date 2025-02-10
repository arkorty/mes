const Joi=require('joi');
const mongoose=require('mongoose');

export const AddressSchema={
  address:{type:String},
  state:{type:String},
  city:{type:String},
  zipCode:{type:String},  
}


const UserSchema = new mongoose.Schema(
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

 export const User=mongoose.model('Users',UserSchema)



