import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  subtitle?: string;
  onExploreMore?: () => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies, subtitle, onExploreMore }) => {
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

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative py-4 sm:py-6 group/row">
      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover/row:text-[#e50914] transition-colors">
            {title}
          </h2>
          {subtitle && (
            <span className="text-xs text-neutral-400 hidden sm:inline">
              {subtitle}
            </span>
          )}
        </div>

        {onExploreMore && (
          <button
            onClick={onExploreMore}
            className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#e50914]" />
          </button>
        )}
      </div>

      {/* Carousel Track Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-24 sm:h-32 bg-black/70 hover:bg-black/90 text-white flex items-center justify-center rounded-r-lg backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer border border-neutral-700/50 shadow-2xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-4 px-1"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-24 sm:h-32 bg-black/70 hover:bg-black/90 text-white flex items-center justify-center rounded-l-lg backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer border border-neutral-700/50 shadow-2xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </div>
    </section>
  );
};
