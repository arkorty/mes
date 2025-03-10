import mongoose, { Schema, Document } from 'mongoose';

interface IInvoice extends Document {
    invoiceNo: string;
    userId?: string; // ObjectId
    orderId?: string; // ObjectId
    totalAmount: number;
    createdOn: Date;
}

const InvoiceSchema = new mongoose.Schema<IInvoice>({
    invoiceNo: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    totalAmount: { type: Number, required: true },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
});

const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);

export default Invoice;