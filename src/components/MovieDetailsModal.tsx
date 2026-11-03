import React, { useEffect, useState } from 'react';
import { X, Play, Plus, Check, ThumbsUp, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOVIES_DATABASE } from '../data/movies';
import { Episode } from '../types/movie';

export const MovieDetailsModal: React.FC = () => {
  const {
    activeMovie,
    closeMovieDetails,
    startPlaying,
    toggleMyList,
    isInMyList,
    toggleLike,
    isLiked,
    openMovieDetails,
  } = useApp();

  const [isMuted, setIsMuted] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMovieDetails();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMovieDetails]);

  if (!activeMovie) return null;

  const inList = isInMyList(activeMovie.id);
  const liked = isLiked(activeMovie.id);

  // Filter similar recommendations
  const recommendations = MOVIES_DATABASE.filter(
    (m) =>
      m.id !== activeMovie.id &&
      (m.genres.some((g) => activeMovie.genres.includes(g)) || m.mediaType === activeMovie.mediaType)
  ).slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center p-0 sm:p-4 md:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={closeMovieDetails}
    >
      <div
        className="relative w-full max-w-4xl bg-[#14151f] rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 text-neutral-100 my-auto pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeMovieDetails}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors cursor-pointer border border-neutral-700/60"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Backdrop Visual Header */}
        <div className="relative aspect-[16/9] max-h-[480px] w-full overflow-hidden select-none bg-neutral-950">
          <img
            src={activeMovie.backdropUrl || activeMovie.posterUrl}
            alt={activeMovie.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151f] via-[#14151f]/40 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

          {/* Action Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="space-y-3 max-w-lg">
              {activeMovie.isOriginal && (
                <div className="flex items-center gap-1.5 text-xs text-[#e50914] font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CINEPULSE ORIGINAL</span>
                </div>
              )}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-cinema tracking-wide leading-tight">
                {activeMovie.title}
              </h2>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    closeMovieDetails();
                    startPlaying(activeMovie);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold rounded-lg transition-transform active:scale-95 shadow cursor-pointer text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Play</span>
                </button>

                <button
                  onClick={() => toggleMyList(activeMovie.id)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    inList
                      ? 'bg-[#e50914] text-white border-[#e50914]'
                      : 'border-neutral-500 hover:border-white text-white hover:bg-neutral-800/80 bg-neutral-900/60'
                  }`}
                  title={inList ? 'In My List' : 'Add to My List'}
                >
                  {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => toggleLike(activeMovie.id)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    liked
                      ? 'bg-neutral-800 text-[#e50914] border-[#e50914]'
                      : 'border-neutral-500 hover:border-white text-white hover:bg-neutral-800/80 bg-neutral-900/60'
                  }`}
                  title="Like"
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full border border-neutral-600 bg-neutral-900/80 text-white flex items-center justify-center hover:border-white transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="px-6 sm:px-10 pt-6 space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left 2 Cols: Main Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-neutral-300 font-medium">
                <span className="text-emerald-400 font-bold">{activeMovie.matchScore}% Match</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>{activeMovie.releaseYear}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[11px] text-neutral-200">
                  {activeMovie.maturityRating}
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>{activeMovie.duration || `${activeMovie.seasonsCount} Seasons`}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="border border-neutral-700 px-1 py-0.5 rounded text-[10px] text-neutral-400 font-semibold">
                  {activeMovie.quality}
                </span>
              </div>

              {activeMovie.tagline && (
                <p className="text-sm font-semibold text-neutral-200 italic">
                  "{activeMovie.tagline}"
                </p>
              )}

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {activeMovie.overview}
              </p>
            </div>

            {/* Right 1 Col: Cast, Director, Audio Tags */}
            <div className="space-y-3 text-xs sm:text-sm text-neutral-400 border-l border-neutral-800/80 pl-0 md:pl-6">
              <div>
                <span className="text-neutral-500 font-medium block">Cast:</span>
                <p className="text-neutral-200 mt-0.5">{activeMovie.cast.join(', ')}</p>
              </div>

              <div>
                <span className="text-neutral-500 font-medium block">Director:</span>
                <p className="text-neutral-200 mt-0.5">{activeMovie.director}</p>
              </div>

              <div>
                <span className="text-neutral-500 font-medium block">Genres:</span>
                <p className="text-neutral-200 mt-0.5">{activeMovie.genres.join(', ')}</p>
              </div>

              <div>
                <span className="text-neutral-500 font-medium block">Audio:</span>
                <p className="text-neutral-200 mt-0.5">{activeMovie.audioFeatures.join(' · ')}</p>
              </div>
            </div>
          </div>

          {/* TV Shows: Episodes Section */}
          {activeMovie.episodes && activeMovie.episodes.length > 0 && (
            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight">Episodes</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Season:</span>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    aria-label="Select season"
                    className="bg-neutral-900 border border-neutral-700 text-xs rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#e50914] cursor-pointer"
                  >
                    {Array.from({ length: activeMovie.seasonsCount || 1 }, (_, i) => i + 1).map((s) => (
                      <option key={s} value={s}>
                        Season {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {activeMovie.episodes.map((ep: Episode) => (
                  <div
                    key={ep.id}
                    onClick={() => {
                      closeMovieDetails();
                      startPlaying(activeMovie);
                    }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-xl bg-neutral-900/40 hover:bg-neutral-800/60 border border-neutral-800/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-neutral-500 w-6 text-center group-hover:text-white transition-colors">
                        {ep.episodeNumber}
                      </span>
                      <div className="relative w-28 sm:w-36 aspect-video rounded-lg overflow-hidden bg-neutral-800 shrink-0">
                        <img
                          src={ep.thumbnail}
                          alt={ep.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-5 h-5 text-white fill-current" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-[#e50914] transition-colors">
                            {ep.title}
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {ep.overview}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-400 font-medium shrink-0 self-end sm:self-center">
                      {ep.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This (Recommendations) */}
          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">More Like This</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => openMovieDetails(rec)}
                  className="bg-neutral-900/60 rounded-xl overflow-hidden border border-neutral-800/80 hover:border-neutral-600 transition-all cursor-pointer group"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                    <img
                      src={rec.backdropUrl || rec.posterUrl}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 text-xs font-bold text-white bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      {rec.duration || `${rec.seasonsCount} S`}
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">{rec.matchScore}% Match</span>
                      <span className="text-[10px] border border-neutral-700 px-1 rounded text-neutral-400">
                        {rec.maturityRating}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white truncate">{rec.title}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {rec.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About This Title Information Box */}
          <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-400 space-y-2">
            <h4 className="text-sm font-bold text-neutral-200">About {activeMovie.title}</h4>
            <div className="space-y-1">
              <p>
                <span className="text-neutral-500">Director: </span>
                <span className="text-neutral-300">{activeMovie.director}</span>
              </p>
              <p>
                <span className="text-neutral-500">Cast: </span>
                <span className="text-neutral-300">{activeMovie.cast.join(', ')}</span>
              </p>
              <p>
                <span className="text-neutral-500">Genres: </span>
                <span className="text-neutral-300">{activeMovie.genres.join(', ')}</span>
              </p>
              <p>
                <span className="text-neutral-500">Maturity Rating: </span>
                <span className="text-neutral-300">
                  {activeMovie.maturityRating} · Recommended for audiences based on intense themes and cinematic action.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
