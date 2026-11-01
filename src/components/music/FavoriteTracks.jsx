import { Heart, Sparkles } from "lucide-react";
import { tracksData } from "../../data/music/musicData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import TrackCard from "./TrackCard";

export default function FavoriteTracks() {
  const {
    favoriteIds,
    toggleFavorite,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
  } = useAudioPlayer();

  const favoriteTracks = tracksData.filter((track) =>
    favoriteIds.includes(track.id)
  );

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
            <Heart size={20} fill="currentColor" />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Starred Collection
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Favorite Tracks
            </h2>
          </div>
        </div>

        <span className="text-xs text-outline font-medium px-3 py-1 rounded-full bg-surface-container">
          {favoriteTracks.length} starred tracks
        </span>
      </div>

      {/* Empty State */}
      {favoriteTracks.length === 0 ? (
        <div className="rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 p-6 sm:p-10 text-center space-y-2">
          <Sparkles size={32} className="mx-auto text-outline opacity-50" />
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            No favorite tracks yet
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto text-xs">
            Click the heart icon on any focus track to pin it here for quick cognitive recall.
          </p>
        </div>
      ) : (
        /* Responsive Track Cards Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
          {favoriteTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onPlay={handlePlayTrack}
              isCurrent={currentTrack?.id === track.id}
              isPlaying={isPlaying}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
