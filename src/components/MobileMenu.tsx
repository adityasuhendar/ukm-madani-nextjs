'use client';

import { useState, useEffect } from 'react';

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
    { label: 'Beranda', href: '#home' },
    { label: 'Tentang', href: '#about' },
    { label: 'Berita', href: '#news' },
    { label: 'Artikel', href: '#articles' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Donasi', href: '#donation' }
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
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo-madani.png" 
              alt="UKM Madani Logo"
              className="w-10 h-10"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-green-600 rounded-full flex items-center justify-center hidden">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-green-800 font-serif">UKM MADANI</span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl text-gray-600">✕</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(item.href)}
              className="w-full px-6 py-4 text-left text-lg text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors flex items-center justify-between group"
            >
              <span>{item.label}</span>
              <span className="text-gray-400 group-hover:text-green-600 transition-colors">→</span>
            </button>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-green-50 border-t border-green-100">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Hubungi Kami</p>
            <a 
              href="https://wa.me/6281234567890" 
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <span>💬</span>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}