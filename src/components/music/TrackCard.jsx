import { Play, Pause, Heart, Clock } from "lucide-react";

export default function TrackCard({
  track,
  onPlay,
  isCurrent = false,
  isPlaying = false,
  isFavorite = false,
  onToggleFavorite,
}) {
  const isThisPlaying = isCurrent && isPlaying;

  const handleCardClick = () => {
    onPlay && onPlay(track);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite(track.id);
  };

  return (
    <article
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`${track.title} by ${track.artist}, ${track.genre}`}
      className={`group relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0 w-full ${
        isCurrent
          ? "bg-surface-container border-primary/60 shadow-[0_0_20px_rgba(128,131,255,0.2)] ring-1 ring-primary/40"
          : "bg-surface-container-high/60 border-surface-container-highest/40 hover:bg-surface-container-high hover:border-surface-container-highest shadow-md hover:shadow-xl"
      }`}
    >
      <div className="space-y-4 min-w-0">
        {/* Cover Artwork Banner with Play Button Overlay */}
        <div
          className={`relative w-full h-36 rounded-xl bg-gradient-to-tr ${track.gradient} p-4 flex flex-col justify-between overflow-hidden shadow-inner`}
        >
          {/* Subtle background ambient blur */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-lg pointer-events-none"></div>

          {/* Top Row: Genre badge, Quality tag & Favorite Button */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                {track.genre}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-md text-[9px] font-bold text-tertiary">
                {track.qualityBadge}
              </span>
            </div>

            {/* Favorite Heart Button */}
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isFavorite
                  ? "bg-black/50 text-tertiary scale-110"
                  : "bg-black/30 text-white/80 hover:text-white hover:bg-black/50"
              }`}
              type="button"
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Bottom Row: Animated Equalizer & Prominent Play Button */}
          <div className="flex items-center justify-between z-10 mt-auto">
            {/* Equalizer Frequency Bars */}
            <div className="flex items-end gap-1 h-5 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
              <span
                className={`w-1 bg-white rounded-full transition-all ${
                  isThisPlaying ? "animate-bounce h-4" : "h-2"
                }`}
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className={`w-1 bg-white rounded-full transition-all ${
                  isThisPlaying ? "animate-bounce h-5" : "h-3"
                }`}
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className={`w-1 bg-white rounded-full transition-all ${
                  isThisPlaying ? "animate-bounce h-3" : "h-1.5"
                }`}
                style={{ animationDelay: "0.2s" }}
              />
            </div>

            {/* Prominent Play Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer ${
                isThisPlaying
                  ? "bg-primary text-on-primary ring-2 ring-white/50"
                  : "bg-white text-black hover:bg-white/95"
              }`}
              type="button"
              aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
            >
              {isThisPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Track Title and Artist */}
        <div className="space-y-1 min-w-0">
          <h4
            className={`font-title-md text-title-md font-bold line-clamp-2 leading-snug ${
              isCurrent
                ? "text-primary"
                : "text-on-surface group-hover:text-primary transition-colors"
            }`}
          >
            {track.title}
          </h4>
          <p className="font-body-sm text-body-sm text-outline line-clamp-1 text-xs">
            {track.artist}
          </p>
        </div>
      </div>

      {/* Footer Metadata: Playlist Name & Duration */}
      <div className="pt-3 mt-4 border-t border-surface-container-highest/40 flex items-center justify-between text-xs text-outline min-w-0">
        <span className="text-secondary font-medium truncate max-w-[65%]">
          {track.playlistName}
        </span>
        <span className="font-mono flex items-center gap-1 text-on-surface-variant font-medium shrink-0">
          <Clock size={12} className="text-outline" />
          {track.duration}
        </span>
      </div>
    </article>
  );
}
