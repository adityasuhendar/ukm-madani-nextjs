'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalBerita: number;
  totalArtikel: number;
  totalGaleri: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalBerita: 0,
    totalArtikel: 0,
    totalGaleri: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (!response.ok) {
          router.push('/admin');
          return;
        }
        const data = await response.json();
        setUser(data.user);
        
        // Load dashboard stats
        await loadStats();
      } catch (error) {
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadStats = async () => {
    try {
      // Load all stats in parallel
      const [beritaRes, artikelRes, galeriRes] = await Promise.all([
        fetch('/api/berita'),
        fetch('/api/artikel'),
        fetch('/api/galeri')
      ]);

      const [beritaData, artikelData, galeriData] = await Promise.all([
        beritaRes.json(),
        artikelRes.json(),
        galeriRes.json()
      ]);

      setStats({
        totalBerita: beritaData.berita?.length || 0,
        totalArtikel: artikelData.artikel?.length || 0,
        totalGaleri: galeriData.galeri?.length || 0,
        totalUsers: 1 // For now, just the admin user
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="text-2xl">🕌</div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">UKM Madani Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.nama || 'Administrator'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Super Admin'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              👨‍💼
            </div>
            <div>
              <h2 className="text-2xl font-bold">Selamat Datang, {user?.nama || 'Administrator'}!</h2>
              <p className="text-green-100">Kelola konten website UKM Madani dengan mudah</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-newspaper text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Berita</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBerita}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-book-open text-yellow-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Artikel</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalArtikel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-images text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Galeri</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGaleri}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/berita"
              className="flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-plus text-blue-600"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Buat Berita</p>
                <p className="text-sm text-gray-600">Tambah berita baru</p>
              </div>
            </a>

            <a
              href="/admin/artikel"
              className="flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-plus text-yellow-600"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Buat Artikel</p>
                <p className="text-sm text-gray-600">Tambah artikel baru</p>
              </div>
            </a>

            <a
              href="/admin/galeri"
              className="flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-plus text-green-600"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Buat Galeri</p>
                <p className="text-sm text-gray-600">Tambah galeri baru</p>
              </div>
            </a>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-8">
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-green-800 hover:text-green-600 font-medium"
          >
            <i className="fas fa-external-link-alt"></i>
            Lihat Website
          </a>
        </div>
      </main>
    </div>
  );
}