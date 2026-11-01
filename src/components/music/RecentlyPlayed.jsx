import { History, Sparkles } from "lucide-react";
import { tracksData } from "../../data/music/musicData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import TrackCard from "./TrackCard";

export default function RecentlyPlayed() {
  const {
    recentlyPlayed,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    favoriteIds,
    toggleFavorite,
  } = useAudioPlayer();

  // Map recently played IDs to track objects
  const recentTracks = recentlyPlayed
    .map((id) => tracksData.find((t) => t.id === id))
    .filter(Boolean)
    .slice(0, 6);

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
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <History size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Session History
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Recently Played
            </h2>
          </div>
        </div>

        <span className="text-xs text-outline font-medium px-3 py-1 rounded-full bg-surface-container">
          {recentTracks.length} tracks logged
        </span>
      </div>

      {/* Empty State */}
      {recentTracks.length === 0 ? (
        <div className="rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 p-6 sm:p-10 text-center space-y-2">
          <Sparkles size={32} className="mx-auto text-outline opacity-50" />
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            No recently played tracks
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto text-xs">
            Start any focus track or playlist to build your session history.
          </p>
        </div>
      ) : (
        /* Responsive Track Cards Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
          {recentTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onPlay={handlePlayTrack}
              isCurrent={currentTrack?.id === track.id}
              isPlaying={isPlaying}
              isFavorite={favoriteIds.includes(track.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
