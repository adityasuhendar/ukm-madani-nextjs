import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Berita from '@/models/Berita';

export async function GET() {
  try {
    await connectDB();
    
    // Test insert sample data
    const sampleBerita = new Berita({
      judul: 'Test Berita - Database Connection',
      konten: 'Ini adalah test koneksi database MongoDB Atlas dengan Next.js',
      status: 'published'
    });
    
    await sampleBerita.save();
    
    // Test fetch data
    const beritaList = await Berita.find().limit(5);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: beritaList
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}