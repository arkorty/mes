
const mongoose=require('mongoose');

const InvoiceSchema=new mongoose.Schema({
    invoiceNo:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:'Order'},
    totalAmount:{type:Number},
    createdOn:{
        type: Date,
        default: Date.now
    },
})

export const Invoice= mongoose.model('Invoice',InvoiceSchema);