import { Disc3, Play, Pause, Clock, Brain, Coffee, Waves, Music, Moon } from "lucide-react";
import { playlistsData, tracksData } from "../../data/music/musicData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

const iconMap = {
  Brain: Brain,
  Coffee: Coffee,
  Waves: Waves,
  Music: Music,
  Moon: Moon,
};

export default function PlaylistCollection({ onSelectPlaylist, selectedPlaylistId }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioPlayer();

  const handlePlayPlaylist = (playlist, e) => {
    e.stopPropagation();
    const playlistTracks = tracksData.filter((t) => t.playlistId === playlist.id);
    if (playlistTracks.length === 0) return;

    // If currently playing a track from this playlist, toggle play/pause
    if (currentTrack?.playlistId === playlist.id) {
      togglePlay();
    } else {
      playTrack(playlistTracks[0]);
    }
  };

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
            <Disc3 size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Sonic Channels
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Curated Playlist Collections
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
          <span>{playlistsData.length} Study Channels</span>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
        {playlistsData.map((playlist) => {
          const Icon = iconMap[playlist.artworkIcon] || Disc3;
          const isThisPlaylistPlaying = currentTrack?.playlistId === playlist.id && isPlaying;
          const isSelected = selectedPlaylistId === playlist.id;

          return (
            <article
              key={playlist.id}
              tabIndex={0}
              aria-label={`Select playlist ${playlist.title}, ${playlist.trackCount} tracks, ${playlist.duration}`}
              onClick={() => onSelectPlaylist && onSelectPlaylist(playlist.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectPlaylist && onSelectPlaylist(playlist.id);
                }
              }}
              className={`group relative rounded-2xl border transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0 ${
                isSelected
                  ? "bg-surface-container border-primary shadow-[0_0_24px_rgba(128,131,255,0.25)] ring-1 ring-primary"
                  : "bg-surface-container-high/60 border-surface-container-highest/40 hover:bg-surface-container-high hover:border-surface-container-highest shadow-md hover:shadow-xl"
              }`}
            >
              <div className="space-y-4">
                {/* Artwork Banner */}
                <div
                  className={`relative w-full h-44 rounded-xl bg-gradient-to-br ${playlist.coverGradient} p-5 flex flex-col justify-between overflow-hidden shadow-inner`}
                >
                  {/* Decorative soundwave or circles */}
                  <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                      {playlist.genre}
                    </span>
                    <span className="text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock size={11} />
                      {playlist.duration}
                    </span>
                  </div>

                  {/* Center Icon & Play Button Hover Overlay */}
                  <div className="flex items-center justify-between z-10 mt-auto">
                    <div className="w-12 h-12 rounded-xl bg-black/30 backdrop-blur-md flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>

                    <button
                      onClick={(e) => handlePlayPlaylist(playlist, e)}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                      type="button"
                      aria-label={`Play ${playlist.title}`}
                    >
                      {isThisPlaylistPlaying ? (
                        <Pause size={20} fill="currentColor" />
                      ) : (
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Playlist Info */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-lg text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {playlist.title}
                    </h3>
                    <span className="text-xs text-outline font-semibold">
                      {playlist.trackCount} tracks
                    </span>
                  </div>
                  <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
                    {playlist.subtitle}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                    {playlist.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 mt-4 border-t border-surface-container-highest/40 flex items-center justify-between">
                <span className="text-xs text-outline">
                  {isSelected ? "Filter Active" : "Click to view tracks"}
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                  Explore Channel →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
