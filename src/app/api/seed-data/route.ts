import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Berita from '@/models/Berita';
import Artikel from '@/models/Artikel';
import Galeri from '@/models/Galeri';

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing data (optional, for fresh seeding)
    await Berita.deleteMany({});
    await Artikel.deleteMany({});
    await Galeri.deleteMany({});

    // Dummy Berita Data
    const dummyBerita = [
      {
        judul: "Kegiatan Kajian Rutin UKM Madani",
        konten: "UKM Madani ITERA mengadakan kajian rutin setiap minggu untuk membahas berbagai topik keislaman dan peradaban. Kajian ini terbuka untuk umum.",
        gambar: "https://via.placeholder.com/400x250/1a5f3f/ffffff?text=Kajian+Rutin",
        status: "published",
        tanggal_publish: new Date("2025-08-20T10:00:00Z"),
        penulis: "Tim Media Madani",
        views: 1200
      },
      {
        judul: "Program Pemberdayaan Masyarakat",
        konten: "Bakti sosial dan program pemberdayaan masyarakat di sekitar kampus ITERA sebagai wujud pengabdian kepada masyarakat. Fokus pada pendidikan dan kesehatan.",
        gambar: "https://via.placeholder.com/400x250/1a5f3f/ffffff?text=Pemberdayaan",
        status: "published",
        tanggal_publish: new Date("2025-08-15T14:30:00Z"),
        penulis: "Divisi Sosial",
        views: 950
      },
      {
        judul: "Workshop Desain Grafis Islami",
        konten: "Workshop intensif tentang desain grafis dengan nuansa Islami, mengajarkan teknik dasar hingga lanjutan. Peserta diajak membuat karya dakwah visual.",
        gambar: "https://via.placeholder.com/400x250/1a5f3f/ffffff?text=Workshop+Desain",
        status: "published",
        tanggal_publish: new Date("2025-08-10T09:00:00Z"),
        penulis: "Divisi Kreatif",
        views: 780
      }
    ];

    // Dummy Artikel Data
    const dummyArtikel = [
      {
        judul: "Menjadi Mahasiswa yang Berkarakter Islami",
        konten: "Bagaimana membangun karakter Islami di tengah tantangan kehidupan kampus modern. Artikel ini membahas tips dan trik untuk menjaga identitas Muslim.",
        gambar: "https://via.placeholder.com/400x250/d4af37/ffffff?text=Karakter+Islami",
        status: "published",
        tanggal_publish: new Date("2025-07-25T11:00:00Z"),
        penulis: "Ustadz Fulan",
        kategori: "Pengembangan Diri",
        views: 1500
      },
      {
        judul: "Mengelola Waktu dengan Prinsip Islam",
        konten: "Time management menurut Islam dan aplikasinya dalam kehidupan sehari-hari. Pelajari cara mengatur prioritas dan memanfaatkan waktu secara efektif.",
        gambar: "https://via.placeholder.com/400x250/d4af37/ffffff?text=Manajemen+Waktu",
        status: "published",
        tanggal_publish: new Date("2025-07-20T13:00:00Z"),
        penulis: "Dr. Aisyah",
        kategori: "Lifestyle",
        views: 1100
      },
      {
        judul: "Dakwah di Era Digital",
        konten: "Strategi dan etika berdakwah melalui media sosial dan platform digital. Membahas tantangan dan peluang dakwah di era modern.",
        gambar: "https://via.placeholder.com/400x250/d4af37/ffffff?text=Dakwah+Digital",
        status: "published",
        tanggal_publish: new Date("2025-07-18T09:30:00Z"),
        penulis: "Ust. Budi",
        kategori: "Dakwah",
        views: 1800
      }
    ];

    // Dummy Galeri Data
    const dummyGaleri = [
      {
        judul: "Kajian Rutin Mingguan",
        deskripsi: "Dokumentasi kajian rutin mingguan UKM Madani yang membahas berbagai tema keislaman.",
        gambar: [
          "https://via.placeholder.com/400x250/2d8659/ffffff?text=Galeri+Kajian+1",
          "https://via.placeholder.com/400x250/2d8659/ffffff?text=Galeri+Kajian+2"
        ],
        tanggal_kegiatan: new Date("2025-08-22T16:00:00Z"),
        status: "published",
        google_drive_link: "https://photos.app.goo.gl/dummykajian",
        total_foto: 25,
        lokasi: "Masjid Kampus ITERA"
      },
      {
        judul: "Bakti Sosial Ramadhan",
        deskripsi: "Kegiatan bakti sosial selama bulan Ramadhan, berbagi kebahagiaan dengan masyarakat sekitar.",
        gambar: [
          "https://via.placeholder.com/400x250/2d8659/ffffff?text=Galeri+Baksos+1",
          "https://via.placeholder.com/400x250/2d8659/ffffff?text=Galeri+Baksos+2"
        ],
        tanggal_kegiatan: new Date("2025-08-05T08:00:00Z"),
        status: "published",
        google_drive_link: "https://photos.app.goo.gl/dummybaksos",
        total_foto: 40,
        lokasi: "Desa Sukamaju"
      },
      {
        judul: "Acara Maulid Nabi",
        deskripsi: "Perayaan Maulid Nabi Muhammad SAW dengan ceramah inspiratif dan shalawat bersama.",
        gambar: [
          "https://via.placeholder.com/400x250/2d8659/ffffff?text=Galeri+Maulid+1",
          "https://via.placeholder.com/400x250/2d8659/ffffff?text=Galeri+Maulid+2"
        ],
        tanggal_kegiatan: new Date("2025-07-10T19:00:00Z"),
        status: "published",
        google_drive_link: "https://photos.app.goo.gl/dummymauid",
        total_foto: 30,
        lokasi: "Auditorium ITERA"
      }
    ];

    await Berita.insertMany(dummyBerita);
    await Artikel.insertMany(dummyArtikel);
    await Galeri.insertMany(dummyGaleri);

    return NextResponse.json({ success: true, message: 'Dummy data seeded successfully!' }, { status: 200 });
  } catch (error) {
    console.error("Error seeding data:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to seed dummy data', error: errorMessage }, { status: 500 });
  }
}
