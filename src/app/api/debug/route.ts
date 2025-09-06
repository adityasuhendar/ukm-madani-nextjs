import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Artikel from '@/models/Artikel';
import Berita from '@/models/Berita';
import Galeri from '@/models/Galeri';

export async function GET() {
  try {
    console.log('Debug API called');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    console.log('MongoDB URI starts with:', process.env.MONGODB_URI?.substring(0, 20));
    
    // Test database connection
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('MongoDB connection successful');
    
    // Count documents in each collection
    console.log('Counting documents...');
    const artikelCount = await Artikel.countDocuments();
    const beritaCount = await Berita.countDocuments();
    const galeriCount = await Galeri.countDocuments();
    
    console.log('Document counts:', { artikelCount, beritaCount, galeriCount });
    
    // Get sample data
    const sampleArtikel = await Artikel.find().limit(1);
    const sampleBerita = await Berita.find().limit(1);
    
    return NextResponse.json({
      success: true,
      database: 'Connected successfully',
      environment: process.env.NODE_ENV,
      collections: {
        artikel: {
          count: artikelCount,
          sample: sampleArtikel
        },
        berita: {
          count: beritaCount,
          sample: sampleBerita
        },
        galeri: {
          count: galeriCount
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Database debug error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      environment: process.env.NODE_ENV,
      mongodbUriExists: !!process.env.MONGODB_URI,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
