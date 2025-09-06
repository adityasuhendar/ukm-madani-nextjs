'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();

  const maxAttempts = 5;
  const remainingAttempts = maxAttempts - attempts;

  useEffect(() => {
    // Focus on username field when component mounts
    document.getElementById('username')?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password) {
      setError('Username dan password harus diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Login gagal. Silakan coba lagi.');
        setAttempts(prev => prev + 1);
        
        // Clear password field on failed attempt
        setPassword('');
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setAttempts(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='islamic-pattern' patternUnits='userSpaceOnUse' width='50' height='50'%3E%3Ccircle cx='25' cy='25' r='20' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3Cpath d='M25,5 L30,20 L45,20 L33,30 L38,45 L25,35 L12,45 L17,30 L5,20 L20,20 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23islamic-pattern)'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-md text-center relative border border-white/20">
        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-float">🕌</div>
          <h1 className="text-3xl font-bold text-green-800 font-serif mb-2">ADMIN PANEL</h1>
          <p className="text-gray-600 text-sm">UKM Madani Institut Teknologi Sumatera</p>
        </div>

        {/* Security Info */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6 text-sm text-green-800">
          <i className="fas fa-shield-alt mr-2"></i>
          Area terbatas - Hanya untuk admin yang berwenang
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-4 flex items-center gap-2 text-sm animate-shake">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        {/* Attempts Counter */}
        {attempts > 0 && remainingAttempts > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 flex items-center justify-center gap-2 text-sm">
            <i className="fas fa-exclamation-circle"></i>
            Sisa percobaan: {remainingAttempts} dari {maxAttempts}
          </div>
        )}

        {/* Warning for low attempts */}
        {remainingAttempts <= 2 && remainingAttempts > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
            <i className="fas fa-warning"></i>
            Peringatan: Akun akan dikunci setelah {remainingAttempts} percobaan gagal lagi
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-0 focus:outline-none transition-colors bg-white/90 focus:bg-white"
                placeholder="Masukkan username"
                required
                maxLength={50}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-0 focus:outline-none transition-colors bg-white/90 focus:bg-white"
                placeholder="Masukkan password"
                required
                maxLength={100}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || remainingAttempts <= 0}
            className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
          >
            <span className="relative z-10">
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Memproses...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </form>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 text-green-800 hover:text-yellow-600 font-medium px-4 py-2 rounded-full hover:bg-yellow-50 transition-all duration-300 hover:transform hover:-translate-y-1"
        >
          <i className="fas fa-arrow-left"></i>
          Kembali ke Website
        </Link>

        {/* Security Features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-green-800 text-sm font-medium mb-4 flex items-center justify-center gap-2">
            <i className="fas fa-shield-alt"></i>
            Fitur Keamanan
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">CSRF Protection</span>
            <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">Rate Limiting</span>
            <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">Session Security</span>
            <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">IP Monitoring</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}