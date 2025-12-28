import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
    slug: string;
    title: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    icon?: string; // Icon name from a library like lucide-react
    order: number;
}

const ServiceSchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        description: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        icon: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
