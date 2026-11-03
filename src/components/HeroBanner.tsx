import React, { useState } from 'react';
import { Play, Info, Volume2, VolumeX, Check, Plus } from 'lucide-react';
import { Movie } from '../types/movie';
import { useApp } from '../context/AppContext';

interface HeroBannerProps {
  movie: Movie;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  const { openMovieDetails, startPlaying, toggleMyList, isInMyList } = useApp();
  const [isMuted, setIsMuted] = useState(true);

  const inList = isInMyList(movie.id);

  return (
    <div className="relative w-full h-[75vh] sm:h-[82vh] lg:h-[88vh] overflow-hidden select-none">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured Contrast Scrims (Vertical and Horizontal vignetting) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/60 to-transparent w-full md:w-3/4" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0b0c10]/80 to-transparent" />
      </div>

      {/* Hero Content Information Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          {/* Brand Original Kicker */}
          {movie.isOriginal && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#e50914] uppercase">
                A CINEPULSE ORIGINAL FILM
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-wide uppercase font-cinema leading-[0.95] drop-shadow-xl">
            {movie.title}
          </h1>

          {/* Clean Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-neutral-300 font-medium">
            <span className="text-emerald-400 font-bold">{movie.matchScore}% Match</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{movie.releaseYear}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="border border-neutral-600/70 px-1 py-0.2 rounded text-[11px] text-neutral-300">
              {movie.maturityRating}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{movie.duration || `${movie.seasonsCount} Seasons`}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400 border border-neutral-700/60 px-1 py-0.2 rounded text-[10px] tracking-wider uppercase font-semibold">
              {movie.quality}
            </span>
          </div>

          {/* Overview Prose */}
          <p className="text-sm sm:text-base text-neutral-300 line-clamp-3 leading-relaxed drop-shadow max-w-xl">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => startPlaying(movie)}
              className="flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm sm:text-base rounded-lg transition-all transform active:scale-95 shadow-xl cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>

            <button
              onClick={() => openMovieDetails(movie)}
              className="flex items-center gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 bg-neutral-800/80 hover:bg-neutral-700 text-white font-semibold text-sm sm:text-base rounded-lg backdrop-blur-md transition-all active:scale-95 border border-neutral-700/60 cursor-pointer"
            >
              <Info className="w-5 h-5 text-neutral-300" />
              <span>More Info</span>
            </button>

            <button
              onClick={() => toggleMyList(movie.id)}
              className={`p-2.5 sm:p-3 rounded-full border transition-all cursor-pointer ${
                inList
                  ? 'bg-[#e50914] text-white border-[#e50914] shadow-lg shadow-red-900/40'
                  : 'bg-neutral-900/60 hover:bg-neutral-800 text-white border-neutral-700/80 backdrop-blur-md'
              }`}
              title={inList ? 'In My List' : 'Add to My List'}
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
            >
              {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Right Controls (Sound toggle and Maturity rating strip) */}
      <div className="absolute right-0 bottom-24 sm:bottom-28 z-20 flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full border border-neutral-500/60 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-all cursor-pointer"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div className="bg-neutral-900/70 backdrop-blur-md border-l-2 border-neutral-400 py-1 pl-3 pr-6 text-xs font-semibold text-neutral-200">
          <span>{movie.maturityRating}</span>
        </div>
      </div>
    </div>
  );
};
