import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TeamMember from '@/models/TeamMember';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    try {
        const team = await TeamMember.find({}).sort({ order: 1 });
        return NextResponse.json({ success: true, data: team });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch team' }, { status: 500 });
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
        const member = await TeamMember.create(body);
        return NextResponse.json({ success: true, data: member }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 400 });
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

        const member = await TeamMember.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

        if (!member) {
            return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: member });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 400 });
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

        const deletedMember = await TeamMember.findByIdAndDelete(id);

        if (!deletedMember) {
            return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete team member' }, { status: 400 });
    }
}
