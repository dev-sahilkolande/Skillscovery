import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import VideosHero from "../components/videos/VideosHero";
import VideoOverview from "../components/videos/VideoOverview";
import VideoCatalog from "../components/videos/VideoCatalog";
import RecentlyWatched from "../components/videos/RecentlyWatched";
import WatchLater from "../components/videos/WatchLater";
import VideoPlayerModal from "../components/videos/VideoPlayerModal";
import {
  initialVideosData,
  initialRecentlyWatchedIds,
} from "../data/videos/videoData";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "../utils/storage";

function loadStoredVideos() {
  const stored = getStoredItem(STORAGE_KEYS.VIDEOS_DATA, null, (arr) => Array.isArray(arr));
  if (!stored) {
    // Check for legacy watch later IDs if present
    const legacyWatchLater = getStoredItem("skillscovery_watch_later_ids", null, (arr) => Array.isArray(arr));
    if (legacyWatchLater) {
      return initialVideosData.map((v) => ({
        ...v,
        isWatchLater: legacyWatchLater.includes(v.id) || v.isWatchLater,
      }));
    }
    return initialVideosData;
  }

  const storedMap = new Map(stored.map((v) => [v.id, v]));
  return initialVideosData.map((v) => {
    const saved = storedMap.get(v.id);
    if (!saved) return v;
    return {
      ...v,
      progress: typeof saved.progress === "number" ? saved.progress : v.progress,
      status: saved.status || v.status,
      isWatchLater: typeof saved.isWatchLater === "boolean" ? saved.isWatchLater : v.isWatchLater,
    };
  });
}

export default function Videos() {
  const [videos, setVideos] = useState(loadStoredVideos);
  const [recentlyWatchedIds, setRecentlyWatchedIds] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.VIDEOS_RECENTLY_WATCHED,
      initialRecentlyWatchedIds,
      (arr) => Array.isArray(arr)
    )
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Persist videos and recently watched queue
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.VIDEOS_DATA, videos);
  }, [videos]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.VIDEOS_RECENTLY_WATCHED, recentlyWatchedIds);
  }, [recentlyWatchedIds]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (text) => {
    setToast(text);
  };

  const handleOpenVideo = (video) => {
    setActiveVideo(video);
    setIsPlayerOpen(true);

    // Update Recently Watched queue (prepend video ID without duplicates)
    setRecentlyWatchedIds((prev) => [
      video.id,
      ...prev.filter((id) => id !== video.id),
    ]);

    // If video was not started, update to in_progress with initial progress
    if (video.status === "not_started") {
      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id
            ? { ...v, status: "in_progress", progress: Math.max(v.progress, 5) }
            : v
        )
      );
    }

    showToast(`Loaded workshop: "${video.title}"`);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setActiveVideo(null);
  };

  const handleToggleWatchLater = (videoId) => {
    let targetTitle = "";
    let willBookmark = false;

    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          targetTitle = v.title;
          willBookmark = !v.isWatchLater;
          return { ...v, isWatchLater: willBookmark };
        }
        return v;
      })
    );

    // Also synchronize active video if currently open
    setActiveVideo((prev) => {
      if (prev && prev.id === videoId) {
        return { ...prev, isWatchLater: willBookmark };
      }
      return prev;
    });

    showToast(
      willBookmark
        ? `Added "${targetTitle}" to Watch Later`
        : `Removed "${targetTitle}" from Watch Later`
    );
  };

  const handleUpdateProgress = (videoId, newProgress, newStatus) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? { ...v, progress: newProgress, status: newStatus }
          : v
      )
    );

    setActiveVideo((prev) => {
      if (prev && prev.id === videoId) {
        return { ...prev, progress: newProgress, status: newStatus };
      }
      return prev;
    });

    if (newStatus === "completed") {
      showToast("Marked workshop as completed!");
    }
  };

  const handleFeaturedPlay = () => {
    const featured = videos[0] || initialVideosData[0];
    handleOpenVideo(featured);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* Toast Notification Feedback */}
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

      {/* 1. Video Library Hero Header */}
      <VideosHero onFeaturedPlay={handleFeaturedPlay} />

      {/* 2. Overview KPI Cards */}
      <VideoOverview
        videos={videos}
        onSelectFilter={(statusFilter) => {
          if (statusFilter === "completed" || statusFilter === "in_progress") {
            const section = document.getElementById("all-videos-catalog");
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }}
      />

      {/* 3. Recently Watched Videos */}
      <RecentlyWatched
        videos={videos}
        recentlyWatchedIds={recentlyWatchedIds}
        onOpenVideo={handleOpenVideo}
        onToggleWatchLater={handleToggleWatchLater}
      />

      {/* 4. Watch Later Queue */}
      <WatchLater
        videos={videos}
        onOpenVideo={handleOpenVideo}
        onToggleWatchLater={handleToggleWatchLater}
      />

      {/* 5. Comprehensive All Videos Catalog with Multi-Filters */}
      <VideoCatalog
        videos={videos}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenVideo={handleOpenVideo}
        onToggleWatchLater={handleToggleWatchLater}
      />

      {/* 6. Dedicated Video Player Modal Interface */}
      <VideoPlayerModal
        video={activeVideo}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        onUpdateProgress={handleUpdateProgress}
        onToggleWatchLater={handleToggleWatchLater}
      />
    </motion.div>
  );
}
