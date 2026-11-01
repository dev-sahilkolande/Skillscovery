import { useState } from "react";
import {
  Music,
  Search,
  X,
  Filter,
  Disc3,
  Coffee,
  Waves,
  Zap,
  Wind,
} from "lucide-react";
import { tracksData, playlistsData, genresData } from "../../data/music/musicData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import TrackCard from "./TrackCard";

const genreIconMap = {
  Disc3: Disc3,
  Coffee: Coffee,
  Waves: Waves,
  Music: Music,
  Guitar: Music,
  Zap: Zap,
  Wind: Wind,
};

export default function AllTracks({
  selectedGenre = "all",
  onSelectGenre,
  selectedPlaylistId = "all",
  onSelectPlaylist,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    favoriteIds,
    toggleFavorite,
  } = useAudioPlayer();

  // Multi-criteria filter: Search query, Genre, Playlist
  const filteredTracks = tracksData.filter((track) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query);

    const matchesGenre =
      !selectedGenre || selectedGenre === "all" || track.genre === selectedGenre;

    const matchesPlaylist =
      !selectedPlaylistId ||
      selectedPlaylistId === "all" ||
      track.playlistId === selectedPlaylistId;

    return matchesSearch && matchesGenre && matchesPlaylist;
  });

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    onSelectGenre && onSelectGenre("all");
    onSelectPlaylist && onSelectPlaylist("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (selectedGenre && selectedGenre !== "all") ||
    (selectedPlaylistId && selectedPlaylistId !== "all");

  return (
    <section id="all-tracks-section" className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* 1. All Tracks Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <Music size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Comprehensive Audio Catalog
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              All Tracks
            </h2>
          </div>
        </div>

        {/* Track Count Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-container text-outline">
            Showing {filteredTracks.length} of {tracksData.length} tracks
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm"
              type="button"
            >
              <Filter size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Unified Search & Playlist Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input by track title or artist */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks by title or artist name..."
            aria-label="Search tracks by title or artist name"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface placeholder:text-outline text-sm focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer p-1"
              type="button"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Playlist Filter Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedPlaylistId || "all"}
            onChange={(e) => onSelectPlaylist && onSelectPlaylist(e.target.value)}
            aria-label="Filter tracks by playlist"
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">All Playlists & Channels</option>
            {playlistsData.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.title} ({pl.trackCount} tracks)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Genre/Category Filter Pills immediately above track listing */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs text-outline">
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Filter by Genre
          </span>
          {selectedGenre !== "all" && (
            <button
              onClick={() => onSelectGenre && onSelectGenre("all")}
              className="text-primary hover:underline cursor-pointer"
              type="button"
            >
              View All Genres
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap w-full max-w-full min-w-0" role="group" aria-label="Genre filters">
          {genresData.map((genre) => {
            const Icon = genreIconMap[genre.icon] || Disc3;
            const isSelected = selectedGenre === genre.id;
            const count =
              genre.id === "all"
                ? tracksData.length
                : tracksData.filter((t) => t.genre === genre.id).length;

            return (
              <button
                key={genre.id}
                onClick={() => onSelectGenre && onSelectGenre(genre.id)}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Filter by ${genre.label} (${count} tracks)`}
                className={`px-3.5 py-2 rounded-xl font-label-sm text-label-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-on-primary shadow-[0_0_16px_rgba(128,131,255,0.4)] scale-105"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest hover:text-primary"
                }`}
              >
                <Icon size={15} />
                <span>{genre.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-black/30 text-white font-bold"
                      : "bg-surface-container text-outline"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Filtered Track Grid / Empty State */}
      {filteredTracks.length === 0 ? (
        <div className="py-16 text-center rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 space-y-3">
          <Disc3 size={40} className="mx-auto text-outline opacity-50" />
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            No tracks found matching your filters
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto text-xs">
            {searchQuery
              ? `We couldn't find any tracks matching "${searchQuery}". Try adjusting your keywords or selected genre.`
              : "No tracks match the selected genre and playlist combination."}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-semibold transition-all cursor-pointer shadow-md"
            type="button"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        /* Redesigned Responsive Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2 w-full min-w-0">
          {filteredTracks.map((track) => (
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
