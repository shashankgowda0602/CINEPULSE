import React, { useState } from 'react';
import { Layers, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOVIES_DATABASE, CATEGORIES } from '../data/movies';
import { MovieCard } from './MovieCard';

const GENRE_HIGHLIGHTS = [
  { name: 'Sci-Fi', color: 'from-cyan-950 via-slate-900 to-black', desc: 'Cosmic odysseys, neural networks & futuristic frontiers' },
  { name: 'Action', color: 'from-amber-950 via-neutral-900 to-black', desc: 'High-octane pursuits, explosive clashes & martial mastery' },
  { name: 'Drama', color: 'from-indigo-950 via-neutral-900 to-black', desc: 'Human stories, poignant triumphs & profound revelations' },
  { name: 'Crime', color: 'from-red-950 via-neutral-900 to-black', desc: 'Gritty investigations, underworld syndicates & dark secrets' },
  { name: 'Mystery', color: 'from-purple-950 via-neutral-900 to-black', desc: 'Twisted paradoxes, uncrackable enigmas & thrilling suspense' },
  { name: 'TV Shows', color: 'from-emerald-950 via-neutral-900 to-black', desc: 'Binge-worthy seasonal sagas & critically acclaimed series' },
];

export const CategoriesView: React.FC = () => {
  const { selectedGenre, setSelectedGenre } = useApp();
  const [sortBy, setSortBy] = useState<'match' | 'year' | 'title'>('match');

  const filteredMovies = MOVIES_DATABASE.filter((m) => {
    if (selectedGenre === 'All') return true;
    if (selectedGenre === 'TV Shows') return m.mediaType === 'tv';
    return m.genres.includes(selectedGenre);
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'year') return b.releaseYear - a.releaseYear;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh] space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-cinema">
              BROWSE <span className="text-[#e50914]">CATEGORIES</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Curated genres, cinematic collections, and seasonal showcases
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <Filter className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort by"
            className="bg-neutral-900 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#e50914] cursor-pointer"
          >
            <option value="match">Highest Match Score</option>
            <option value="year">Release Year (Newest)</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Featured Genre Highlight Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {GENRE_HIGHLIGHTS.map((g) => {
          const isSelected = selectedGenre === g.name;
          return (
            <button
              key={g.name}
              onClick={() => setSelectedGenre(isSelected ? 'All' : g.name)}
              className={`p-4 rounded-xl text-left bg-gradient-to-br ${g.color} border transition-all cursor-pointer group relative overflow-hidden ${
                isSelected
                  ? 'border-[#e50914] shadow-lg shadow-red-950/40 ring-1 ring-[#e50914]'
                  : 'border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <div className="relative z-10 space-y-1">
                <span className="text-sm font-bold text-white group-hover:text-[#e50914] transition-colors block">
                  {g.name}
                </span>
                <p className="text-[10px] text-neutral-400 line-clamp-2 leading-tight">
                  {g.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Secondary Genre Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedGenre(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedGenre === cat
                ? 'bg-[#e50914] text-white'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Showing {filteredMovies.length} title{filteredMovies.length === 1 ? '' : 's'} in {selectedGenre}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
