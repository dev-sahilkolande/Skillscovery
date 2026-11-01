import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { audioData } from "../../data/dashboard/audioData";
import { tracksData } from "../../data/music/musicData";

export default function AudioDock() {
  const { modeBadge, soundscapes } = audioData;
  const {
    currentTrack,
    isPlaying,
    currentTimeFormatted,
    totalTimeFormatted,
    progressPercent,
    volume,
    isMuted,
    setVolume,
    toggleMute,
    togglePlay,
    nextTrack,
    prevTrack,
    playTrack,
    seek,
  } = useAudioPlayer();

  const handleSeekClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(clickX / rect.width, 1));
    const duration = currentTrack?.durationSeconds || 240;
    seek(ratio * duration);
  };

  const handleSoundscapeClick = (soundscape) => {
    // Find matching track from musicData or fallback to track
    const match = tracksData.find((t) =>
      t.title.toLowerCase().includes(soundscape.title.toLowerCase().split(" ")[0])
    ) || tracksData[0];
    playTrack(match);
  };

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-3.5 sm:p-6 shadow-2xl space-y-4 sm:space-y-6 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">
              headphones
            </span>
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
              Binaural & Focus Audio
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
              Cognitive Flow State Deck
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 max-w-full">
            <span className={`w-2 h-2 rounded-full bg-tertiary ${isPlaying ? "animate-pulse" : ""} shrink-0`}></span>
            <span className="truncate">{modeBadge}</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center min-w-0">
        {/* Active Playing Mini Deck (Spotify Player Style) - 7 cols */}
        <div className="lg:col-span-7 bg-surface-container/70 rounded-xl p-3 sm:p-5 shadow-inner space-y-3.5 sm:space-y-4 min-w-0">
          <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
              {/* Animated Soundwave or album cover */}
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-surface-container-highest overflow-hidden shrink-0 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-tr ${currentTrack?.gradient || "from-secondary-container to-tertiary-container"} opacity-80`}></div>
                {/* Mini sound bars */}
                <div className="relative z-10 flex items-end gap-1 h-5 sm:h-6">
                  <span
                    className={`w-1 bg-white rounded-full ${isPlaying ? "animate-bounce h-3" : "h-2"}`}
                    style={{ animationDelay: "0.1s" }}
                  ></span>
                  <span
                    className={`w-1 bg-white rounded-full ${isPlaying ? "animate-bounce h-5" : "h-3"}`}
                    style={{ animationDelay: "0.3s" }}
                  ></span>
                  <span
                    className={`w-1 bg-white rounded-full ${isPlaying ? "animate-bounce h-5 sm:h-6" : "h-3 sm:h-4"}`}
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className={`w-1 bg-white rounded-full ${isPlaying ? "animate-bounce h-4" : "h-2"}`}
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <h4 className="font-label-md text-label-md font-bold text-on-surface truncate min-w-0">
                    {currentTrack?.title}
                  </h4>
                  <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[10px] font-bold shrink-0">
                    {currentTrack?.qualityBadge || "LOSSLESS"}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-outline truncate">
                  {currentTrack?.artist}
                </p>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={() => prevTrack()}
                className="p-1 sm:p-2 text-outline hover:text-on-surface transition-colors cursor-pointer"
                type="button"
                aria-label="Previous Track"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  skip_previous
                </span>
              </button>
              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-secondary-container to-tertiary-container text-on-background flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
              <button
                onClick={() => nextTrack()}
                className="p-1 sm:p-2 text-outline hover:text-on-surface transition-colors cursor-pointer"
                type="button"
                aria-label="Next Track"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  skip_next
                </span>
              </button>
            </div>
          </div>
          {/* Scrubber Track & Volume */}
          <div className="space-y-1.5">
            <div
              role="slider"
              tabIndex={0}
              aria-label="Audio scrubber"
              aria-valuemin="0"
              aria-valuemax={currentTrack?.durationSeconds || 240}
              aria-valuenow={Math.round(((progressPercent || 0) / 100) * (currentTrack?.durationSeconds || 240))}
              aria-valuetext={`${currentTimeFormatted} of ${totalTimeFormatted}`}
              onClick={handleSeekClick}
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
              className="w-full h-1.5 rounded-full bg-surface-container-highest cursor-pointer relative group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-secondary to-tertiary relative transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="w-3 h-3 rounded-full bg-white absolute right-0 -top-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
              <span>{currentTimeFormatted}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center p-0.5"
                  aria-label={isMuted || volume === 0 ? "Unmute audio" : "Mute audio"}
                  title={isMuted || volume === 0 ? "Unmute" : "Mute"}
                >
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    {isMuted || volume === 0
                      ? "volume_off"
                      : volume < 0.5
                      ? "volume_down"
                      : "volume_up"}
                  </span>
                </button>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Volume level"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const ratio = Math.max(0, Math.min(clickX / rect.width, 1));
                    setVolume(ratio);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                      e.preventDefault();
                      setVolume(Math.min(1, volume + 0.05));
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                      e.preventDefault();
                      setVolume(Math.max(0, volume - 0.05));
                    }
                  }}
                  className="w-16 h-1.5 rounded-full bg-surface-container-highest cursor-pointer relative group focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <div
                    className="h-full rounded-full bg-outline group-hover:bg-primary transition-colors"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span>{totalTimeFormatted}</span>
            </div>
          </div>
        </div>
        {/* Quick Play List - 5 cols */}
        <div className="lg:col-span-5 space-y-2 min-w-0">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-1">
            Recommended Soundscapes
          </span>
          {soundscapes.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => handleSoundscapeClick(track)}
              aria-label={`Play soundscape: ${track.title}`}
              className="w-full text-left p-2.5 rounded-xl bg-surface-container/40 hover:bg-surface-container transition-all flex items-center justify-between gap-3 group cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <span className="material-symbols-outlined text-outline group-hover:text-tertiary transition-colors text-lg shrink-0" aria-hidden="true">
                  {track.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-label-md text-label-md font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    {track.title}
                  </p>
                  <p className="font-body-sm text-body-sm text-outline text-xs truncate">
                    {track.subtitle}
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-outline shrink-0">
                {track.duration}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
