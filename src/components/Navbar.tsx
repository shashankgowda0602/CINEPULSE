import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, X, ChevronDown, UserCheck, LogOut, Film, Menu } from 'lucide-react';
import { useApp, NavTab } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    currentProfile,
    profiles,
    switchProfile,
    logout,
    setIsAuthModalOpen,
    setAuthMode,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    setIsProfileModalOpen,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'mylist', label: 'My List' },
    { id: 'categories', label: 'Categories' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0c10]/95 backdrop-blur-md border-b border-neutral-800/60 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-[#0b0c10]/90 via-[#0b0c10]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 md:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveTab('home');
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#b81d24] to-[#e50914] flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
                <Film className="w-4 h-4 text-white" />
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-cinema">
                CINE<span className="text-[#e50914]">PULSE</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Clean Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id && !searchQuery;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className={`whitespace-nowrap shrink-0 transition-colors duration-200 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e50914] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Controls (Search, Notifications, Profile) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Input Box / Trigger */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-neutral-900/90 border border-neutral-700/80 rounded-full px-3 py-1.5 w-44 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, people, genres..."
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="p-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-full transition-colors cursor-pointer"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileMenuOpen(false);
                }}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-full transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e50914] rounded-full ring-2 ring-[#0b0c10]" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#14151f] border border-neutral-800 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Notifications
                    </span>
                    <span className="text-[11px] text-[#e50914] font-medium cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="space-y-3 pt-3">
                    <div className="flex gap-3 text-xs">
                      <div className="w-12 h-16 rounded overflow-hidden shrink-0 bg-neutral-800">
                        <img
                          src="/src/assets/images/hero_cinematic_scifi_1793730119431.jpg"
                          alt="Aura"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">Now Streaming: Aura</p>
                        <p className="text-neutral-400 text-[11px] mt-0.5 line-clamp-2">
                          The IMAX space thriller is now available in Dolby Atmos 4K.
                        </p>
                        <span className="text-[10px] text-neutral-500 mt-1 block">2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div className="w-12 h-16 rounded overflow-hidden shrink-0 bg-neutral-800">
                        <img
                          src="/src/assets/images/poster_neo_noir_1793730120525.jpg"
                          alt="Night Falls"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">New Season: Silicon Shadows</p>
                        <p className="text-neutral-400 text-[11px] mt-0.5 line-clamp-2">
                          Season 2 is now available. Watch the four new episodes.
                        </p>
                        <span className="text-[10px] text-neutral-500 mt-1 block">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Auth Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsNotificationOpen(false);
                  }}
                  className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none"
                >
                  <img
                    src={currentProfile.avatarUrl}
                    alt={currentProfile.name}
                    className="w-8 h-8 rounded-md object-cover ring-1 ring-neutral-700 group-hover:ring-[#e50914] transition-all"
                    referrerPolicy="no-referrer"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors hidden sm:block" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#14151f] border border-neutral-800 rounded-xl shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-neutral-800 mb-1">
                      <p className="text-xs text-neutral-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    </div>

                    <div className="py-1">
                      <p className="px-3 py-1 text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                        Switch Profile
                      </p>
                      {profiles.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            switchProfile(p.id);
                            setIsProfileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                            p.id === currentProfile.id
                              ? 'bg-neutral-800/80 text-white font-medium'
                              : 'text-neutral-300 hover:bg-neutral-800/40 hover:text-white'
                          }`}
                        >
                          <img
                            src={p.avatarUrl}
                            alt={p.name}
                            className="w-5 h-5 rounded object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span>{p.name}</span>
                          {p.isKids && (
                            <span className="text-[10px] text-amber-400 font-semibold ml-auto">
                              KIDS
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-neutral-800 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setIsProfileModalOpen(true);
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/40 rounded-lg transition-colors cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Manage Profiles</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign out of CinePulse</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#e50914] hover:bg-[#b81d24] rounded-md transition-colors shadow-md shadow-red-900/30 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white md:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0e1017] border-b border-neutral-800 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setSearchQuery('');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  activeTab === link.id ? 'text-[#e50914] font-bold' : 'text-neutral-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
