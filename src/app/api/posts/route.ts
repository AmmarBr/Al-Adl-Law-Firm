import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    try {
        const posts = await BlogPost.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const body = await req.json();
        // Auto-generate slug if not provided? Ideally done on client or here.
        // For simplicity, assume client provides unique slug or we rely on validation error.
        const post = await BlogPost.create({
            ...body,
            author: session.user.id // Link to creator
        });
        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || 'Failed to create post' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const post = await BlogPost.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: post });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || 'Failed to update post' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const deletedPost = await BlogPost.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 400 });
    }
}
