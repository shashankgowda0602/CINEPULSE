import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VideoPlayerModal: React.FC = () => {
  const { playingMovie, stopPlaying } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(142); // 2:22
  const [totalTime] = useState(8280); // 2h 18m
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const controlsTimeoutRef = useRef<number | null>(null);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = window.setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopPlaying();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'ArrowLeft') {
        setCurrentTime((prev) => Math.max(0, prev - 10));
      } else if (e.key === 'ArrowRight') {
        setCurrentTime((prev) => Math.min(totalTime, prev + 10));
      } else if (e.key === 'm') {
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stopPlaying, totalTime]);

  // Tick simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalTime) {
          setIsPlaying(false);
          return totalTime;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalTime]);

  if (!playingMovie) return null;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / totalTime) * 100;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden cursor-default">
      {/* Cinematic Simulated Video Background with Motion Ambience */}
      <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
        <img
          src={playingMovie.backdropUrl || playingMovie.posterUrl}
          alt={playingMovie.title}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isPlaying ? 'scale-105 filter brightness-95' : 'scale-100 filter brightness-75'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Ambient Film Grain and Vignette */}
        <div className="absolute inset-0 bg-radial-vignette from-transparent via-black/20 to-black/80 pointer-events-none" />

        {/* Simulated Active Subtitles */}
        {subtitlesEnabled && isPlaying && (
          <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none px-6">
            <span className="bg-black/75 backdrop-blur-sm text-yellow-300 px-4 py-1.5 rounded-lg text-sm sm:text-lg font-medium tracking-wide shadow-2xl text-center max-w-2xl border border-yellow-500/20">
              "When the resonance frequency matches the core, the orbital anchor will stabilize."
            </span>
          </div>
        )}

        {/* Large Play/Pause Central Tap Overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none flex items-center justify-center group"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {!isPlaying && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transform transition-transform group-hover:scale-110 shadow-2xl">
              <Play className="w-10 h-10 fill-current ml-1" />
            </div>
          )}
        </button>
      </div>

      {/* Top Header Bar */}
      <div
        className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={stopPlaying}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Back to browse"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {playingMovie.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
              <span className="text-[#e50914] font-bold">4K ULTRA HD</span>
              <span aria-hidden="true">·</span>
              <span>{playingMovie.audioFeatures[0] || 'Dolby Atmos'}</span>
              <span aria-hidden="true">·</span>
              <span>{playingMovie.maturityRating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 rounded-full border border-neutral-700 text-xs text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-[#e50914]" />
            <span>CinePulse High Bitrate</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 z-20 space-y-4 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Progress Bar */}
        <div className="relative group/scrubber flex items-center cursor-pointer">
          <input
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            aria-label="Timeline scrubber"
            className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#e50914] group-hover/scrubber:h-2.5 transition-all"
            style={{
              background: `linear-gradient(to right, #e50914 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
            }}
          />
        </div>

        {/* Primary Controls Row */}
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-neutral-300 transition-transform active:scale-95 cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
            </button>

            <button
              onClick={() => setCurrentTime((prev) => Math.max(0, prev - 10))}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => setCurrentTime((prev) => Math.min(totalTime, prev + 10))}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Forward 10 seconds"
              aria-label="Forward 10 seconds"
            >
              <RotateCw className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                aria-label="Volume slider"
                className="w-16 sm:w-20 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-[#e50914]"
              />
            </div>

            {/* Time stamps */}
            <div className="text-xs sm:text-sm font-medium text-neutral-400 font-mono">
              <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(totalTime)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Speed Selector */}
            <button
              onClick={() => {
                const speeds = [0.75, 1, 1.25, 1.5];
                const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                setPlaybackSpeed(speeds[nextIdx]);
              }}
              className="text-xs font-bold px-2 py-1 bg-neutral-800/80 hover:bg-neutral-700 rounded text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
              title="Playback speed"
            >
              {playbackSpeed}x
            </button>

            {/* Subtitles Toggle */}
            <button
              onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                subtitlesEnabled ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white'
              }`}
              title="Toggle Subtitles"
              aria-label="Toggle Subtitles"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Audio Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Settings"
                aria-label="Playback settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 bottom-12 w-52 bg-neutral-900 border border-neutral-800 rounded-xl p-3 shadow-2xl text-xs space-y-2 z-50">
                  <div className="font-semibold text-white pb-1 border-b border-neutral-800">
                    Audio & Subtitles
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-1">Audio Track:</span>
                    <span className="text-emerald-400 font-medium">English [Original] (Dolby Atmos)</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-1">Subtitles:</span>
                    <span className="text-white">{subtitlesEnabled ? 'English [CC]' : 'Off'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
