import React from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileSelectorModal: React.FC = () => {
  const { isProfileModalOpen, setIsProfileModalOpen, profiles, currentProfile, switchProfile } = useApp();

  if (!isProfileModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsProfileModalOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-[#12131c] border border-neutral-800 rounded-2xl shadow-2xl p-8 text-center text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide uppercase font-cinema mb-2">
          Who's Watching?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mb-8">
          Select your profile to customize watch history, recommendations, and saved titles.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
          {profiles.map((p) => {
            const isCurrent = p.id === currentProfile.id;
            return (
              <button
                key={p.id}
                onClick={() => switchProfile(p.id)}
                className="group flex flex-col items-center gap-3 cursor-pointer focus:outline-none"
              >
                <div
                  className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 transition-all transform group-hover:scale-105 ${
                    isCurrent
                      ? 'border-[#e50914] shadow-lg shadow-red-900/40 ring-2 ring-[#e50914]/50'
                      : 'border-transparent group-hover:border-white'
                  }`}
                >
                  <img
                    src={p.avatarUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isCurrent && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#e50914] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  {p.isKids && (
                    <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-black text-[9px] font-black uppercase py-0.5">
                      KIDS
                    </div>
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors ${
                    isCurrent ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                  }`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => alert('Profile management is active. You can switch between any of the 4 ready profiles.')}
            className="group flex flex-col items-center gap-3 cursor-pointer focus:outline-none"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-neutral-700 group-hover:border-neutral-400 flex items-center justify-center transition-all group-hover:scale-105 bg-neutral-900/50">
              <Plus className="w-8 h-8 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-neutral-400 group-hover:text-white transition-colors">
              Add Profile
            </span>
          </button>
        </div>

        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="px-6 py-2 border border-neutral-600 hover:border-white text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
