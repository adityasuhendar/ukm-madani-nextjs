import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Artikel from '@/models/Artikel';
import Berita from '@/models/Berita';
import Galeri from '@/models/Galeri';

export async function GET() {
  try {
    // Test database connection
    await connectDB();
    
    // Count documents in each collection
    const artikelCount = await Artikel.countDocuments();
    const beritaCount = await Berita.countDocuments();
    const galeriCount = await Galeri.countDocuments();
    
    // Get sample data
    const sampleArtikel = await Artikel.find().limit(1);
    const sampleBerita = await Berita.find().limit(1);
    
    return NextResponse.json({
      success: true,
      database: 'Connected successfully',
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
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
