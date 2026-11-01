import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import MusicHero from "../components/music/MusicHero";
import MusicPlayer from "../components/music/MusicPlayer";
import MusicOverview from "../components/music/MusicOverview";
import PlaylistCollection from "../components/music/PlaylistCollection";
import RecentlyPlayed from "../components/music/RecentlyPlayed";
import FavoriteTracks from "../components/music/FavoriteTracks";
import AllTracks from "../components/music/AllTracks";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { tracksData } from "../data/music/musicData";

export default function Music() {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("all");
  const [toast, setToast] = useState(null);

  const { playTrack } = useAudioPlayer();

  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSelectPlaylist = (playlistId) => {
    const nextId = selectedPlaylistId === playlistId ? "all" : playlistId;
    setSelectedPlaylistId(nextId);

    // Scroll to All Tracks section so the user immediately sees the matching tracks
    const section = document.getElementById("all-tracks-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePlayFeatured = () => {
    playTrack(tracksData[0]);
    setToast("Loaded featured flow track: Cyberpunk Ambient Drone 432Hz");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* Toast Feedback Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 sm:right-8 left-4 sm:left-auto max-w-md z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest border border-surface-container-highest/80 text-on-surface shadow-2xl backdrop-blur-lg"
          >
            <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
            <span className="text-sm font-medium">{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 p-1 rounded-lg text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Music Hero & Overview (Hero + Continuous Flow Player + Overview Cards) */}
      <div className="space-y-8">
        <MusicHero onPlayFeatured={handlePlayFeatured} />
        <MusicPlayer />
        <MusicOverview
          onSelectTab={(tabId) => {
            if (tabId === "all-tracks") {
              setSelectedGenre("all");
              setSelectedPlaylistId("all");
              const section = document.getElementById("all-tracks-section");
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }}
        />
      </div>

      {/* 2. Playlist Collection */}
      <PlaylistCollection
        selectedPlaylistId={selectedPlaylistId}
        onSelectPlaylist={handleSelectPlaylist}
      />

      {/* 3. Recently Played (Full width with 3-col responsive TrackCard grid) */}
      <RecentlyPlayed />

      {/* 4. Favorite Tracks (Full width with 3-col responsive TrackCard grid) */}
      <FavoriteTracks />

      {/* 5. All Tracks (Heading + Search + Genre/Category Filters + Playlist Filter + Track Count + Track Grid) */}
      <AllTracks
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        selectedPlaylistId={selectedPlaylistId}
        onSelectPlaylist={setSelectedPlaylistId}
      />
    </motion.div>
  );
}
