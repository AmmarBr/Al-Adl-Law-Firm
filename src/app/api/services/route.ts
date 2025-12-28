import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    try {
        const services = await Service.find({}).sort({ order: 1 });
        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Protect: Only Admin/Editor can create
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const body = await req.json();
        const service = await Service.create(body);
        return NextResponse.json({ success: true, data: service }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 400 });
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

        const service = await Service.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

        if (!service) {
            return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: service });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 400 });
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

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 400 });
    }
}
