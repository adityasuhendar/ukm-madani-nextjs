'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { label: 'Beranda', href: '#home', icon: 'fas fa-home' },
    { label: 'Tentang', href: '#about', icon: 'fas fa-info-circle' },
    { label: 'Berita', href: '#news', icon: 'fas fa-newspaper' },
    { label: 'Artikel', href: '#articles', icon: 'fas fa-book-open' },
    { label: 'Galeri', href: '#gallery', icon: 'fas fa-images' },
    { label: 'Infaq', href: '#donation', icon: 'fas fa-hand-holding-heart' }
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 300);
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transition-all duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Glass morphism background */}
        <div className="h-full bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl flex flex-col">
          
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-green-800 to-green-600 p-6 text-white flex-shrink-0">
            <div className="absolute inset-0 bg-[url('/images/anggota-ukm.jpg')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <Image 
                    src="/images/logo-madani.png" 
                    alt="UKM Madani Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold font-serif">UKM MADANI</h2>
                  <p className="text-xs text-white/80">Mahasiswa Peradaban Islam</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            {/* Menu Items with animations */}
            <nav className="py-4 px-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(item.href)}
                  className={`w-full group mb-2 transition-all duration-300 ${
                    isOpen ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-green-100 border border-gray-100 hover:border-green-200 hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-600 group-hover:to-green-500 transition-all duration-300">
                      <i className={`${item.icon} text-sm text-green-600 group-hover:text-white transition-colors duration-300`}></i>
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm text-gray-800 group-hover:text-green-800 font-semibold transition-colors duration-300">{item.label}</span>
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-green-500 transition-all duration-300">
                      <svg className="w-2.5 h-2.5 text-gray-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Contact Section with modern design */}
            <div className="p-4 pb-6">
              <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/anggota-ukm.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-sm mb-1">Hubungi Kami</h3>
                  <p className="text-xs text-white/80 mb-3">Mari berdiskusi dan berkolaborasi</p>
                  
                  <a 
                    href="https://wa.me/message/V63DAEQVVY7EL1" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/30 transition-all duration-300 w-full"
                  >
                    <i className="fab fa-whatsapp text-green-300"></i>
                    <span>Hubungi Kami</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}