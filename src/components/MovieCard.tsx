import React, { useState } from 'react';
import { Play, Plus, Check, ThumbsUp, ChevronDown, Film } from 'lucide-react';
import { Movie } from '../types/movie';
import { useApp } from '../context/AppContext';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, rank }) => {
  const { openMovieDetails, startPlaying, toggleMyList, isInMyList, toggleLike, isLiked } = useApp();
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const inList = isInMyList(movie.id);
  const liked = isLiked(movie.id);

  return (
    <div
      className="relative shrink-0 w-36 sm:w-44 md:w-52 lg:w-56 group select-none transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image Container */}
      <div
        onClick={() => openMovieDetails(movie)}
        className="relative aspect-[2/3] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer shadow-md group-hover:shadow-2xl group-hover:border-neutral-600 transition-all duration-300 transform group-hover:scale-[1.03]"
      >
        {imageLoaded ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageLoaded(false)}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Styled Resilient CSS/SVG Fallback Container */
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-[#181a24] to-[#120a10] p-4 flex flex-col justify-between border border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-neutral-800/90 flex items-center justify-center text-[#e50914]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-[#e50914] font-bold uppercase block mb-1">
                {movie.genres[0]}
              </span>
              <p className="text-sm font-bold text-white line-clamp-2 leading-tight">
                {movie.title}
              </p>
            </div>
          </div>
        )}

        {/* Top 10 Red Badge Ribbon if applicable */}
        {movie.isTop10 && rank && (
          <div className="absolute top-2 left-2 bg-[#e50914] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow">
            TOP 10
          </div>
        )}

        {/* CinePulse Original "N"-style Red Accent Ribbon */}
        {movie.isOriginal && !rank && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-neutral-700/50">
            <span className="w-1.5 h-1.5 bg-[#e50914] rounded-full" />
            <span className="text-[10px] font-bold tracking-wider text-neutral-200 uppercase">
              ORIGINAL
            </span>
          </div>
        )}

        {/* Vignette Shadow on Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Quiet Bottom Title on Card */}
        <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
          <p className="text-xs font-semibold text-white truncate drop-shadow">
            {movie.title}
          </p>
        </div>
      </div>

      {/* Floating Expanded Hover Preview Card (Netflix-style quick flyout) */}
      {isHovered && (
        <div className="hidden md:block absolute -top-8 left-0 right-0 z-40 bg-[#161822] rounded-xl shadow-2xl border border-neutral-700/80 overflow-hidden transform -translate-y-2 scale-105 transition-all duration-200">
          {/* Quick Backdrop preview */}
          <div
            onClick={() => openMovieDetails(movie)}
            className="relative aspect-video w-full overflow-hidden bg-neutral-900 cursor-pointer"
          >
            <img
              src={movie.backdropUrl || movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161822] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 right-3">
              <p className="text-xs font-bold text-white line-clamp-1 drop-shadow">
                {movie.title}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons & Info */}
          <div className="p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startPlaying(movie)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow"
                  title="Play"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
                <button
                  onClick={() => toggleMyList(movie.id)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    inList
                      ? 'bg-[#e50914] text-white border-[#e50914]'
                      : 'border-neutral-600 hover:border-white text-white hover:bg-neutral-800'
                  }`}
                  title={inList ? 'Remove from My List' : 'Add to My List'}
                >
                  {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleLike(movie.id)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    liked
                      ? 'bg-neutral-800 text-[#e50914] border-[#e50914]'
                      : 'border-neutral-600 hover:border-white text-white hover:bg-neutral-800'
                  }`}
                  title={liked ? 'Liked' : 'Like'}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => openMovieDetails(movie)}
                className="w-8 h-8 rounded-full border border-neutral-600 hover:border-white text-white flex items-center justify-center hover:bg-neutral-800 transition-all cursor-pointer"
                title="More info"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Match score & details */}
            <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-300">
              <span className="text-emerald-400 font-bold">{movie.matchScore}% Match</span>
              <span className="border border-neutral-600 px-1 py-0.2 rounded text-[10px]">
                {movie.maturityRating}
              </span>
              <span>{movie.duration || `${movie.seasonsCount} S`}</span>
              <span className="border border-neutral-700 px-1 py-0.2 rounded text-[9px] text-neutral-400">
                {movie.quality}
              </span>
            </div>

            {/* Clean unboxed genres list */}
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 line-clamp-1">
              {movie.genres.slice(0, 3).map((genre, idx) => (
                <React.Fragment key={genre}>
                  <span>{genre}</span>
                  {idx < Math.min(movie.genres.length - 1, 2) && (
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
