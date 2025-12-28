import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
    slug: string;
    title: {
        en: string;
        ar: string;
    };
    excerpt: {
        en: string;
        ar: string;
    };
    content: {
        en: string;
        ar: string;
    };
    coverImage?: string;
    author?: mongoose.Types.ObjectId;
    tags: string[];
    isPublished: boolean;
    publishedAt?: Date;
}

const BlogPostSchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        excerpt: {
            en: { type: String },
            ar: { type: String },
        },
        content: {
            en: { type: String, required: true }, // Rich text / HTML
            ar: { type: String, required: true },
        },
        coverImage: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        tags: [{ type: String }],
        isPublished: { type: Boolean, default: false },
        publishedAt: { type: Date },
    },
    { timestamps: true }
);

const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
