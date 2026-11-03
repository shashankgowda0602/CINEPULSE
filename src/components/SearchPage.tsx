import React, { useState, useMemo } from 'react';
import { Search, Film, Tv, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOVIES_DATABASE, CATEGORIES } from '../data/movies';
import { MovieCard } from './MovieCard';

export const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();
  const [selectedMediaType, setSelectedMediaType] = useState<'all' | 'movie' | 'tv'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const filteredMovies = useMemo(() => {
    return MOVIES_DATABASE.filter((movie) => {
      // Media type filter
      if (selectedMediaType !== 'all' && movie.mediaType !== selectedMediaType) {
        return false;
      }

      // Genre filter
      if (selectedGenre !== 'All' && !movie.genres.includes(selectedGenre)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(query);
        const matchesOverview = movie.overview.toLowerCase().includes(query);
        const matchesCast = movie.cast.some((c) => c.toLowerCase().includes(query));
        const matchesDirector = movie.director.toLowerCase().includes(query);
        const matchesGenres = movie.genres.some((g) => g.toLowerCase().includes(query));
        return matchesTitle || matchesOverview || matchesCast || matchesDirector || matchesGenres;
      }

      return true;
    });
  }, [searchQuery, selectedMediaType, selectedGenre]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      {/* Search Header & Filter Controls */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Search className="w-6 h-6 text-[#e50914]" />
              <span>
                {searchQuery ? `Results for "${searchQuery}"` : 'Browse & Search Catalog'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Found {filteredMovies.length} title{filteredMovies.length === 1 ? '' : 's'} matching your filters
            </p>
          </div>

          {/* Quick Clear Search */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors self-start cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear query</span>
            </button>
          )}
        </div>

        {/* Filter Bar: Media Type Segmented Control and Genre Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Segmented Media Filter Buttons */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setSelectedMediaType('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedMediaType === 'all'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>All Titles</span>
            </button>
            <button
              onClick={() => setSelectedMediaType('movie')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedMediaType === 'movie'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[#e50914]" />
              <span>Movies</span>
            </button>
            <button
              onClick={() => setSelectedMediaType('tv')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedMediaType === 'tv'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-blue-400" />
              <span>TV Shows</span>
            </button>
          </div>

          {/* Genre Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.slice(0, 8).map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedGenre === genre
                    ? 'bg-[#e50914] text-white shadow-md shadow-red-900/30'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 mx-auto border border-neutral-800">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No matches found</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Your search for "{searchQuery}" did not have any matching titles. Try searching for an actor, director, genre, or title keyword.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('All');
                setSelectedMediaType('all');
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#e50914] hover:bg-[#b81d24] rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
