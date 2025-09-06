
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Artikel from '@/models/Artikel';

export async function GET(request: Request) {
  try {
    console.log('Artikel API called');
    await connectDB();
    console.log('Database connected for artikel');
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');

    console.log('Fetching artikel with limit:', limit);
    const artikel = await Artikel.find({ status: 'published' })
      .sort({ tanggal_publish: -1 })
      .limit(limit);
    
    console.log('Artikel found:', artikel.length);
    return NextResponse.json({ success: true, data: artikel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching artikel:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ 
      success: false, 
      message: 'Server Error', 
      error: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
    }, { status: 500 });
  }
}
