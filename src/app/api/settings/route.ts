import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/models/Setting';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    try {
        let settings = await Setting.findOne({ key: 'site-config' });
        if (!settings) {
            settings = await Setting.create({}); // Create default if missing
        }
        return NextResponse.json({ success: true, data: settings });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const body = await req.json();
        // Prevent key modification
        delete body.key;
        delete body._id;

        const settings = await Setting.findOneAndUpdate(
            { key: 'site-config' },
            body,
            { new: true, upsert: true }
        );
        return NextResponse.json({ success: true, data: settings });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 400 });
    }
}
