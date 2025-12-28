import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeamMember extends Document {
    name: {
        en: string;
        ar: string;
    };
    role: {
        en: string;
        ar: string;
    };
    bio: {
        en: string;
        ar: string;
    };
    image?: string;
    languages: string[];
    order: number;
}

const TeamMemberSchema: Schema = new Schema(
    {
        name: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        role: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        bio: {
            en: { type: String },
            ar: { type: String },
        },
        image: { type: String },
        languages: [{ type: String }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const TeamMember: Model<ITeamMember> = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember;
