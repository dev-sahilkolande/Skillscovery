import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  Info,
  Radio,
} from "lucide-react";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

export default function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTimeFormatted,
    totalTimeFormatted,
    progressPercent,
    volume,
    isMuted,
    isShuffle,
    isRepeat,
    isCurrentTrackFavorite,
    togglePlay,
    seek,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleFavorite,
  } = useAudioPlayer();

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(clickX / rect.width, 1));
    const duration = currentTrack?.durationSeconds || 240;
    seek(ratio * duration);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <section className="rounded-2xl bg-surface-container-low/95 backdrop-blur-2xl border border-surface-container-highest/60 p-4 sm:p-6 lg:p-8 shadow-2xl space-y-5 sm:space-y-6 w-full min-w-0 max-w-full">
      {/* Top Disclaimer / Mode Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-highest/40 pb-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
            <Radio size={16} />
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block truncate">
              Continuous Flow Deck
            </span>
            <span className="text-sm font-bold text-on-surface truncate block">
              {currentTrack?.playlistName || "Deep Focus Channel"}
            </span>
          </div>
        </div>

        {/* Clear Mock Playback Disclaimer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-semibold self-start sm:self-auto shrink-0">
          <Info size={13} className="flex-shrink-0" />
          <span className="hidden sm:inline">Demo Player · Simulated Playback (Audio assets not bundled)</span>
          <span className="sm:hidden">Demo Player · Simulated</span>
        </div>
      </div>

      {/* Main Player Body: 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full min-w-0">
        {/* Left: Track Artwork & Meta (4 cols) */}
        <div className="lg:col-span-4 flex items-center gap-4 min-w-0">
          {/* Cover Art with Animated Equalizer Bars */}
          <div
            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-tr ${
              currentTrack?.gradient || "from-secondary-container to-tertiary-container"
            } flex-shrink-0 flex items-center justify-center overflow-hidden shadow-lg`}
          >
            {/* Equalizer Frequency Bars */}
            <div className="relative z-10 flex items-end gap-1 h-8">
              <span
                className={`w-1.5 bg-white rounded-full ${
                  isPlaying ? "animate-bounce h-4" : "h-2"
                }`}
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className={`w-1.5 bg-white rounded-full ${
                  isPlaying ? "animate-bounce h-7" : "h-3"
                }`}
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className={`w-1.5 bg-white rounded-full ${
                  isPlaying ? "animate-bounce h-8" : "h-5"
                }`}
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className={`w-1.5 bg-white rounded-full ${
                  isPlaying ? "animate-bounce h-5" : "h-2"
                }`}
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Titles & Quality Badge */}
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                {currentTrack?.title}
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-outline truncate text-xs">
              {currentTrack?.artist}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[10px] font-bold">
                {currentTrack?.qualityBadge || "LOSSLESS"}
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium">
                {currentTrack?.genre}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Playback Controls & Scrubber (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-3 w-full min-w-0">
          {/* Control Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Shuffle */}
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isShuffle ? "text-primary" : "text-outline hover:text-on-surface"
              }`}
              type="button"
              title="Shuffle"
              aria-pressed={isShuffle}
              aria-label={isShuffle ? "Disable Shuffle" : "Enable Shuffle"}
            >
              <Shuffle size={16} />
            </button>

            {/* Previous Track */}
            <button
              onClick={() => prevTrack()}
              className="p-2 text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack size={20} />
            </button>

            {/* Play / Pause Primary Button */}
            <button
              onClick={togglePlay}
              className="w-13 h-13 rounded-full bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container text-on-background flex items-center justify-center shadow-[0_0_20px_rgba(96,1,209,0.4)] hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
              type="button"
              aria-label={isPlaying ? `Pause ${currentTrack?.title || "track"}` : `Play ${currentTrack?.title || "track"}`}
            >
              {isPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={() => nextTrack()}
              className="p-2 text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward size={20} />
            </button>

            {/* Repeat */}
            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isRepeat ? "text-secondary" : "text-outline hover:text-on-surface"
              }`}
              type="button"
              title="Repeat Track"
              aria-pressed={isRepeat}
              aria-label={isRepeat ? "Disable Repeat" : "Enable Repeat"}
            >
              <Repeat size={16} />
            </button>
          </div>

          {/* Seek Scrubber Progress Bar */}
          <div className="w-full flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-mono text-xs text-outline w-10 text-right shrink-0">
              {currentTimeFormatted}
            </span>

            <div
              role="slider"
              tabIndex={0}
              aria-label="Track playback position"
              aria-valuemin="0"
              aria-valuemax={currentTrack?.durationSeconds || 240}
              aria-valuenow={Math.round(((progressPercent || 0) / 100) * (currentTrack?.durationSeconds || 240))}
              aria-valuetext={`${currentTimeFormatted} of ${totalTimeFormatted}`}
              onClick={handleSeek}
              onKeyDown={(e) => {
                const dur = currentTrack?.durationSeconds || 240;
                const currentSec = ((progressPercent || 0) / 100) * dur;
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  seek(Math.min(dur, currentSec + 5));
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  seek(Math.max(0, currentSec - 5));
                }
              }}
              className="flex-1 min-w-0 h-2 rounded-full bg-surface-container-highest cursor-pointer relative group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-secondary to-tertiary relative transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-white absolute right-0 -top-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
              </div>
            </div>

            <span className="font-mono text-xs text-outline w-10 shrink-0">
              {totalTimeFormatted}
            </span>
          </div>
        </div>

        {/* Right: Volume & Favorite Actions (3 cols) */}
        <div className="lg:col-span-3 flex items-center justify-center lg:justify-end gap-4 w-full min-w-0">
          {/* Favorite Toggle */}
          <button
            onClick={() => currentTrack && toggleFavorite(currentTrack.id)}
            className={`p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer ${
              isCurrentTrackFavorite ? "text-tertiary" : "text-outline hover:text-on-surface"
            }`}
            type="button"
            title={isCurrentTrackFavorite ? "Remove from Favorites" : "Add to Favorites"}
            aria-pressed={isCurrentTrackFavorite}
            aria-label={isCurrentTrackFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart size={18} fill={isCurrentTrackFavorite ? "currentColor" : "none"} />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              aria-pressed={isMuted || volume === 0}
              aria-label={isMuted || volume === 0 ? "Unmute audio" : "Mute audio"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={18} className="text-error" />
              ) : (
                <Volume2 size={18} />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-primary cursor-pointer h-1.5 bg-surface-container-highest rounded-lg"
              aria-label="Volume slider"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
              aria-valuetext={`${Math.round((isMuted ? 0 : volume) * 100)}% volume`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
