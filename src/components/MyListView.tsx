import React from 'react';
import { Bookmark, Play, Plus, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOVIES_DATABASE } from '../data/movies';
import { MovieCard } from './MovieCard';

export const MyListView: React.FC = () => {
  const { myList, setActiveTab, currentProfile } = useApp();

  const savedMovies = MOVIES_DATABASE.filter((m) => myList.includes(m.id));

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-cinema">
              MY <span className="text-[#e50914]">LIST</span>
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-semibold">
              {savedMovies.length} title{savedMovies.length === 1 ? '' : 's'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Personalized watchlist for {currentProfile.name}
          </p>
        </div>

        {savedMovies.length > 0 && (
          <div className="text-xs text-neutral-400">
            Titles you save will stay synchronized across your devices.
          </div>
        )}
      </div>

      {/* Grid of Saved Movies */}
      {savedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-24 text-center max-w-md mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
            <Bookmark className="w-8 h-8 text-[#e50914]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Your list is empty</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Explore our trending movies and TV series, and click the plus button on any title to save it to your personal watchlist.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('home')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e50914] hover:bg-[#b81d24] text-white text-xs sm:text-sm font-bold rounded-lg transition-all shadow-lg shadow-red-900/30 cursor-pointer"
          >
            <Film className="w-4 h-4" />
            <span>Browse Trending Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
