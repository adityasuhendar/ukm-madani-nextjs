'use client';

import { useEffect, useState } from 'react';
import { formatTanggalIndonesia } from '@/utils/dateFormat';
import { generatePlaceholder } from '@/utils/imageUtils';
import { Berita, Artikel, Galeri } from '@/types';
import MobileMenu from '@/components/MobileMenu';

export default function HomePage() {
  const [beritaTerbaru, setBeritaTerbaru] = useState<Berita[]>([]);
  const [artikelTerbaru, setArtikelTerbaru] = useState<Artikel[]>([]);
  const [galeriTerbaru, setGaleriTerbaru] = useState<Galeri[]>([]);
  
  const [loadingBerita, setLoadingBerita] = useState(true);
  const [loadingArtikel, setLoadingArtikel] = useState(true);
  const [loadingGaleri, setLoadingGaleri] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchBerita();
    fetchArtikel();
    fetchGaleri();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      
      setScrollProgress(progress);
      setHeaderScrolled(scrollTop > 100);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Teks berhasil disalin: ${text}`);
    }).catch(err => {
      console.error('Gagal menyalin teks: ', err);
    });
  };

  const fetchBerita = async () => {
    setLoadingBerita(true);
    try {
      const response = await fetch('/api/berita?limit=3');
      if (!response.ok) throw new Error('Failed to fetch berita');
      const data = await response.json();
      if (data.success) {
        setBeritaTerbaru(data.data);
      }
    } catch (error) {
      console.error('Error fetching berita:', error);
    } finally {
      setLoadingBerita(false);
    }
  };

  const fetchArtikel = async () => {
    setLoadingArtikel(true);
    try {
      const response = await fetch('/api/artikel?limit=3');
      if (!response.ok) throw new Error('Failed to fetch artikel');
      const data = await response.json();
      if (data.success) {
        setArtikelTerbaru(data.data);
      }
    } catch (error) {
      console.error('Error fetching artikel:', error);
    } finally {
      setLoadingArtikel(false);
    }
  };

  const fetchGaleri = async () => {
    setLoadingGaleri(true);
    try {
      const response = await fetch('/api/galeri?limit=6');
      if (!response.ok) throw new Error('Failed to fetch galeri');
      const data = await response.json();
      if (data.success) {
        setGaleriTerbaru(data.data);
      }
    } catch (error) {
      console.error('Error fetching galeri:', error);
    } finally {
      setLoadingGaleri(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        headerScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-lg border-b-2 border-green-800' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
      }`}>
        <nav className={`container mx-auto px-4 transition-all duration-300 ${
          headerScrolled ? 'py-3' : 'py-4'
        }`}>
          <div className="flex justify-between items-center">
            <a href="#home" className="flex items-center gap-3 text-green-800 font-serif text-xl font-bold">
              <img 
                src="/images/logo-madani.png" 
                alt="UKM Madani Logo"
                className={`float-animation object-contain transition-all duration-300 ${
                  headerScrolled ? 'w-8 h-8' : 'w-10 h-10'
                }`}
              />
              <span>UKM MADANI</span>
            </a>
            
            <div className="hidden lg:flex items-center space-x-2">
              <a href="#home" className="px-4 py-2 text-gray-800 hover:text-green-800 transition-colors uppercase text-sm font-semibold">Beranda</a>
              <a href="#about" className="px-4 py-2 text-gray-800 hover:text-green-800 transition-colors uppercase text-sm font-semibold">Tentang</a>
              <a href="#news" className="px-4 py-2 text-gray-800 hover:text-green-800 transition-colors uppercase text-sm font-semibold">Berita</a>
              <a href="#articles" className="px-4 py-2 text-gray-800 hover:text-green-800 transition-colors uppercase text-sm font-semibold">Artikel</a>
              <a href="#gallery" className="px-4 py-2 text-gray-800 hover:text-green-800 transition-colors uppercase text-sm font-semibold">Galeri</a>
              <a href="#donation" className="px-4 py-2 text-gray-800 hover:text-green-800 transition-colors uppercase text-sm font-semibold">Infaq</a>
            </div>
            
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className="block w-full h-0.5 bg-gray-800"></span>
                <span className="block w-full h-0.5 bg-gray-800"></span>
                <span className="block w-full h-0.5 bg-gray-800"></span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all duration-300 z-40 ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <main>
        <section id="home" className="min-h-screen flex items-center relative text-white"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 95, 63, 0.9) 0%, rgba(45, 134, 89, 0.8) 100%), url(/images/anggota-ukm.jpg) center/cover no-repeat',
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-serif italic text-2xl text-yellow-400 mb-4" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
              <h1 className="text-6xl font-black uppercase mb-4" style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>MADANI ITERA</h1>
              <p className="text-2xl font-semibold text-yellow-300 mb-6">Mahasiswa Peradaban Islam</p>
              <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90 leading-relaxed">
                Membangun generasi muslim yang berakhlak mulia, berilmu, dan berperadaban melalui pendidikan, dakwah, dan pemberdayaan masyarakat
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/tentang" className="inline-flex items-center gap-2 bg-yellow-500 text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider border-2 border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400 transition-all">
                  <i className="fas fa-info-circle"></i>
                  Tentang Kami
                </a>
                <a href="#footer" className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider border-2 border-white hover:bg-white hover:text-green-800 transition-all">
                  <i className="fas fa-envelope"></i>
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800">Tentang UKM Madani</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3"><i className="fas fa-eye text-yellow-500"></i> Visi</h3>
                  <p className="text-gray-600 leading-relaxed">Menjadikan LDK Madani itera sebagai rumah dan sarana dakwah berkelanjutan yang aktif, inovatif, dan inklusif untuk mewujudkan kader yang berkualitas dan berintegritas berlandaskan Al-Quran dan Sunnah.</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3"><i className="fas fa-bullseye text-yellow-500"></i> Misi</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start"><span className="text-yellow-500 mr-3 mt-1">✦</span>Menjadikan Alquran dan Sunnah sebagai landasan utama LDK Madani ITERA dalam kehidupan sehari-hari.</li>
                    <li className="flex items-start"><span className="text-yellow-500 mr-3 mt-1">✦</span>Menguatkan ukhuwah islamiyah sehingga tercipta rasa komitmen dalam setiap kader untuk menjalankan perannya</li>
                    <li className="flex items-start"><span className="text-yellow-500 mr-3 mt-1">✦</span>Meningkatkan sistem pembinaan yang berkualitas dan terstruktur.</li>
                    <li className="flex items-start"><span className="text-yellow-500 mr-3 mt-1">✦</span>Mengembangkan metode dakwah melalui proses penuntutan ilmu, pengamalan konsisten dan penyampaian ilmu yang tepat sasaran.</li>
                    <li className="flex items-start"><span className="text-yellow-500 mr-3 mt-1">✦</span>Memperluas jaringan kolaborasi dakwah baik internal maupun eksternal.</li>
                    <li className="flex items-start"><span className="text-yellow-500 mr-3 mt-1">✦</span>Memberikan kontribusi terhadap isu permasalahan Islam baik dari cakupan lokal maupun global.</li>
                  </ul>
                </div>
                <a href="/tentang" className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-green-700 transition-all">
                  <i className="fas fa-users"></i>
                  Kenalan Lebih Dalam
                </a>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-[clamp(200px,40vw,300px)] h-[clamp(200px,40vw,300px)] bg-gradient-to-br from-green-800 to-green-600 rounded-full flex items-center justify-center p-10 shadow-xl">
                  <img src="/images/logo-madani.png" alt="UKM Madani Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="news" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800">Berita Terbaru</h2>
              <p className="text-lg text-gray-500 mt-2">Informasi terkini seputar kegiatan dan perkembangan UKM Madani</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingBerita ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : (
                beritaTerbaru.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                    <div className="overflow-hidden h-48">
                      <img src={item.gambar || generatePlaceholder('berita', item.judul)} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{formatTanggalIndonesia(item.tanggal_publish)}</div>
                      <h3 className="font-bold text-lg mb-4 text-gray-800 h-14">{item.judul}</h3>
                      <a href={`/berita/${item._id}`} className="font-semibold text-green-800 hover:text-yellow-500 transition-colors">Baca Selengkapnya &rarr;</a>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <a href="/berita" className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-green-700 transition-all">
                <i className="fas fa-newspaper"></i>
                Lihat Semua Berita
              </a>
            </div>
          </div>
        </section>

        <section id="articles" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800">Artikel Pilihan</h2>
              <p className="text-lg text-gray-500 mt-2">Tulisan-tulisan inspiratif seputar Islam, pendidikan, dan kehidupan</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingArtikel ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : (
                artikelTerbaru.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                    <div className="overflow-hidden h-48">
                      <img src={item.gambar || generatePlaceholder('artikel', item.judul)} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{formatTanggalIndonesia(item.tanggal_publish)}</div>
                      <h3 className="font-bold text-lg mb-4 text-gray-800 h-14">{item.judul}</h3>
                      <a href={`/artikel/${item._id}`} className="font-semibold text-green-800 hover:text-yellow-500 transition-colors">Baca Artikel &rarr;</a>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <a href="/artikel" className="inline-flex items-center gap-2 bg-yellow-500 text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-yellow-400 transition-all">
                <i className="fas fa-book-open"></i>
                Lihat Semua Artikel
              </a>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800">Galeri Kegiatan</h2>
              <p className="text-lg text-gray-500 mt-2">Dokumentasi kegiatan dan momen-momen berharga UKM Madani</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loadingGaleri ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                ))
              ) : (
                galeriTerbaru.map((item) => (
                  <a key={item._id} href={item.gambar[0]} target="_blank" rel="noopener noreferrer" className="block relative rounded-lg overflow-hidden h-64 group">
                    <img src={item.gambar[0] || generatePlaceholder('galeri', item.judul)} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300 flex flex-col justify-end p-4">
                      <h3 className="font-bold text-white text-lg">{item.judul}</h3>
                      <p className="text-sm text-gray-300">{formatTanggalIndonesia(item.tanggal_kegiatan)}</p>
                    </div>
                  </a>
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <a href="/galeri" className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-green-700 transition-all">
                <i className="fas fa-images"></i>
                Lihat Semua Galeri
              </a>
            </div>
          </div>
        </section>

        <section id="donation" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800">Infaq Madani</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Kritik & Saran Website</h3>
                <p className="text-gray-500 mb-6">Masukan Anda sangat berharga bagi perkembangan website kami.</p>
                <iframe 
                  src="https://forms.gle/QwkuV5RcX61eqcN2A" 
                  width="100%" 
                  height="400" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  className="rounded-md"
                >Loading…</iframe>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Informasi Rekening</h3>
                <p className="text-gray-500 mb-6">Transfer ke salah satu rekening berikut:</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <i className="fas fa-university text-2xl text-blue-600"></i>
                      <div>
                        <h4 className="font-bold text-gray-800">Bank BRI</h4>
                        <p className="font-mono text-gray-700">3267 0105 1866 539</p>
                        <p className="text-sm text-gray-500">a.n. Dewi Hotimatur Romdoni</p>
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard('326701051866539')} className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors">
                      <i className="fas fa-copy"></i> Salin
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <i className="fab fa-whatsapp text-2xl text-green-500"></i>
                      <div>
                        <h4 className="font-bold text-gray-800">DANA</h4>
                        <p className="font-mono text-gray-700">+62 815-3986-0169</p>
                        <p className="text-sm text-gray-500">a.n. Dio Rizky Pratama</p>
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard('081539860169')} className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors">
                      <i className="fas fa-copy"></i> Salin
                    </button>
                  </div>
                </div>
                <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2"><i className="fas fa-info-circle"></i> Catatan Penting</h4>
                  <p className="text-sm text-green-700">Setelah transfer, kirimkan bukti ke nomor WhatsApp berikut:</p>
                  <div className="mt-2 space-y-1">
                    <a href="https://wa.me/6281539860169" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-700 hover:underline">
                      <i className="fab fa-whatsapp"></i>
                      <span>Ikhwan: +62 815-3986-0169</span>
                    </a>
                    <a href="https://wa.me/6285269359166" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-700 hover:underline">
                      <i className="fab fa-whatsapp"></i>
                      <span>Akhwat: +62 852-6935-9166</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <div className="mb-4 flex justify-center md:justify-start">
                  <img src="/images/logo-madani.png" alt="UKM Madani Logo" className="w-[60px] h-[60px]" />
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">UKM Madani</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mahasiswa Peradaban Islam yang berkomitmen membangun generasi muslim yang berakhlak mulia, berilmu, dan berperadaban.
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-6">
                <a href="https://www.facebook.com/MadaniItera/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-blue-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/madaniitera/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-pink-600 transition-colors"><i className="fab fa-instagram"></i></a>
                <a href="https://x.com/madaniitera" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-blue-400 transition-colors"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/c/MadaniItera" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-red-600 transition-colors"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Tentang</a></li>
                <li><a href="#news" className="text-gray-400 hover:text-white transition-colors">Berita</a></li>
                <li><a href="#articles" className="text-gray-400 hover:text-white transition-colors">Artikel</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Galeri</a></li>
                <li><a href="#donation" className="text-gray-400 hover:text-white transition-colors">Infaq</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Program Kami</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">ONFIRE</li>
                <li className="text-gray-400">ABATA (Aksi Bina TPA)</li>
                <li className="text-gray-400">GEMAR (Gerakan Menutup Aurat)</li>
                <li className="text-gray-400">Madani Goes To School</li>
                <li className="text-gray-400">SAKURA (Seminar Kemuslimahan)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak Info</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-center md:justify-start gap-3"><i className="fas fa-map-marker-alt text-yellow-400"></i><span className="text-gray-400">Institut Teknologi Sumatera</span></li>
                <li className="flex items-center justify-center md:justify-start gap-3"><i className="fas fa-phone text-yellow-400"></i><span className="text-gray-400">+62 878-8945-2909</span></li>
                <li className="flex items-center justify-center md:justify-start gap-3"><i className="fas fa-envelope text-yellow-400"></i><span className="text-gray-400">madani@lk.itera.ac.id</span></li>
                <li className="flex items-center justify-center md:justify-start gap-3"><i className="fas fa-clock text-yellow-400"></i><span className="text-gray-400">Sen-Jum: 08:00 - 17:00</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} UKM Madani ITERA. All rights reserved. Created with ❤️ by Madani Web Division.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}