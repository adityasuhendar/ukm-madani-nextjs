
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Artikel from '@/models/Artikel';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');

    const artikel = await Artikel.find({ status: 'published' })
      .sort({ tanggal_publish: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: artikel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching artikel:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Server Error', error: errorMessage }, { status: 500 });
  }
}
