
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Berita from '@/models/Berita';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');

    const berita = await Berita.find({ status: 'published' })
      .sort({ tanggal_publish: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: berita }, { status: 200 });
  } catch (error) {
    console.error("Error fetching berita:", error);
    // Ensure error is a standard Error object
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Server Error', error: errorMessage }, { status: 500 });
  }
}
