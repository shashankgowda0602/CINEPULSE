import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { useApp } from '../context/AppContext';

interface Top10RowProps {
  title: string;
  movies: Movie[];
}

export const Top10Row: React.FC<Top10RowProps> = ({ title, movies }) => {
  const { openMovieDetails } = useApp();
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Sort by top10Rank
  const sortedMovies = [...movies]
    .filter((m) => m.top10Rank)
    .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99))
    .slice(0, 10);

  if (sortedMovies.length === 0) return null;

  return (
    <section className="relative py-4 sm:py-6 group/row">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-baseline justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover/row:text-[#e50914] transition-colors">
          {title}
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-28 sm:h-36 bg-black/75 hover:bg-black/95 text-white flex items-center justify-center rounded-r-lg backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer border border-neutral-700/50 shadow-2xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-1"
        >
          {sortedMovies.map((movie, index) => {
            const rank = index + 1;
            return (
              <div
                key={movie.id}
                onClick={() => openMovieDetails(movie)}
                className="relative flex items-end shrink-0 cursor-pointer group/card select-none"
              >
                {/* Large Netflix-style SVG / Font Rank Number */}
                <div className="relative z-0 select-none">
                  <span
                    className="font-cinema text-7xl sm:text-8xl md:text-9xl font-black leading-none block transform translate-x-2 sm:translate-x-4 transition-transform duration-300 group-hover/card:scale-110"
                    style={{
                      WebkitTextStroke: '3px #595959',
                      color: '#0b0c10',
                      textShadow: '0 4px 15px rgba(0,0,0,0.8)',
                    }}
                  >
                    {rank}
                  </span>
                </div>

                {/* Movie Poster overlapping the number */}
                <div className="relative z-10 w-28 sm:w-36 md:w-44 aspect-[2/3] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl group-hover/card:scale-105 group-hover/card:border-neutral-500 transition-all duration-300">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <p className="text-[11px] sm:text-xs font-semibold text-white truncate drop-shadow">
                      {movie.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-28 sm:h-36 bg-black/75 hover:bg-black/95 text-white flex items-center justify-center rounded-l-lg backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer border border-neutral-700/50 shadow-2xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </div>
    </section>
  );
};
