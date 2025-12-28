import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'new' | 'in-progress' | 'closed';
}

const ContactMessageSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        subject: { type: String },
        message: { type: String, required: true },
        status: { type: String, enum: ['new', 'in-progress', 'closed'], default: 'new' },
    },
    { timestamps: true }
);

const ContactMessage: Model<IContactMessage> = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);

export default ContactMessage;
