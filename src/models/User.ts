import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'editor' | 'viewer';
    createdAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false }, // Password optional for OAuth flows if added later, but required for credentials
        role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
    },
    { timestamps: true }
);

// Prevent overwrite on hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
