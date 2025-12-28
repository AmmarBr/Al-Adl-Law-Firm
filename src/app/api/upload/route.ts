import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
        const finalName = `${uniqueSuffix}-${filename}`;

        // Save to public/uploads
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        // Ensure dir exists
        await mkdir(uploadDir, { recursive: true });

        const path = join(uploadDir, finalName);
        await writeFile(path, buffer);

        return NextResponse.json({ success: true, url: `/uploads/${finalName}` });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
}
