import React, { useState } from 'react';
import { Globe, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();
  const [language, setLanguage] = useState('English');

  const footerLinks = [
    { label: 'FAQ & Help Center', action: () => alert('Help Center: Streaming available in 4K HDR across all supported devices.') },
    { label: 'Audio & Subtitles', action: () => alert('Dolby Atmos, 5.1 Surround, and Closed Captions supported.') },
    { label: 'Media Center', action: () => alert('CinePulse Press & Media inquiries: press@cinepulse.io') },
    { label: 'Investor Relations', action: () => alert('Investor Relations & Annual Filings available.') },
    { label: 'Terms of Use', action: () => alert('CinePulse Terms of Service apply to all active accounts.') },
    { label: 'Privacy Statement', action: () => alert('Your data is protected with end-to-end security.') },
    { label: 'Cookie Preferences', action: () => alert('Cookie settings configured for optimum playback performance.') },
    { label: 'Corporate Information', action: () => alert('CinePulse Entertainment Inc. Global Streaming.') },
  ];

  return (
    <footer className="w-full bg-[#08090d] border-t border-neutral-800/80 text-neutral-400 text-xs py-14 px-4 sm:px-6 lg:px-8 mt-12 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#b81d24] to-[#e50914] flex items-center justify-center">
            <Film className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-wider uppercase font-cinema">
            CINE<span className="text-[#e50914]">PULSE</span>
          </span>
          <span className="text-neutral-500 text-xs ml-2">Questions? Call 1-800-CINE-PULSE</span>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
          {footerLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer hover:underline"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Language selector button */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700/80 rounded px-3 py-1.5 text-xs text-neutral-300">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Language selector"
              className="bg-transparent text-xs text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="English" className="bg-neutral-900">English</option>
              <option value="Español" className="bg-neutral-900">Español</option>
              <option value="Français" className="bg-neutral-900">Français</option>
              <option value="Deutsch" className="bg-neutral-900">Deutsch</option>
              <option value="日本語" className="bg-neutral-900">日本語</option>
            </select>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-[11px] text-neutral-500 pt-2">
          © {new Date().getFullYear()} CinePulse Streaming Platform. All film trademarks and titles are property of their respective production studios. Designed for high fidelity cinematic streaming.
        </div>
      </div>
    </footer>
  );
};
