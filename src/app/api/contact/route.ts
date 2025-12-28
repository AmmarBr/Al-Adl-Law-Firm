import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactMessage, { IContactMessage } from '@/models/ContactMessage';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    // Public endpoint for submitting contact forms
    await dbConnect();
    try {
        const body = await req.json();
        const message = await ContactMessage.create(body) as unknown as IContactMessage;

        // TODO: Send email notification here (using Nodemailer or Resend)

        return NextResponse.json({ success: true, data: { id: message._id } }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 400 });
    }
}
