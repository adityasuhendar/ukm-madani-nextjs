export interface Berita {
  _id: string;
  judul: string;
  konten: string;
  gambar?: string;
  status: 'published' | 'draft';
  tanggal_publish: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Artikel {
  _id: string;
  judul: string;
  konten: string;
  gambar?: string;
  status: 'published' | 'draft';
  tanggal_publish: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Galeri {
  _id: string;
  judul: string;
  deskripsi?: string;
  gambar: string[];
  tanggal_kegiatan: Date;
  status: 'published' | 'draft';
  created_at: Date;
  updated_at: Date;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}