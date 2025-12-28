import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
    key: string; // Singleton key, usually 'site-config'
    siteName: { en: string; ar: string };
    contactEmail?: string;
    contactPhone?: string;
    whatsapp?: string;
    address?: { en: string; ar: string };
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
}

const SettingSchema: Schema = new Schema(
    {
        key: { type: String, default: 'site-config', unique: true },
        siteName: {
            en: { type: String, default: 'Oman Law Firm' },
            ar: { type: String, default: 'مكتب محاماة عمان' },
        },
        contactEmail: String,
        contactPhone: String,
        whatsapp: String,
        address: {
            en: String,
            ar: String,
        },
        socialLinks: {
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String,
        },
    },
    { timestamps: true }
);

const Setting: Model<ISetting> = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);

export default Setting;
