
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Galeri from '@/models/Galeri';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '6');

    const galeri = await Galeri.find({ status: 'published' })
      .sort({ tanggal_kegiatan: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: galeri }, { status: 200 });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Server Error', error: errorMessage }, { status: 500 });
  }
}
