import { History, Sparkles } from "lucide-react";
import VideoCard from "./VideoCard";

export default function RecentlyWatched({
  videos = [],
  recentlyWatchedIds = [],
  onOpenVideo,
  onToggleWatchLater,
}) {
  // Map recently watched IDs to video objects
  const recentVideos = recentlyWatchedIds
    .map((id) => videos.find((v) => v.id === id))
    .filter(Boolean)
    .slice(0, 6);

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
              Resume Learning
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Recently Watched Videos
            </h2>
          </div>
        </div>

        <span className="text-xs text-outline font-medium px-3 py-1 rounded-full bg-surface-container">
          {recentVideos.length} videos in history
        </span>
      </div>

      {/* Empty State */}
      {recentVideos.length === 0 ? (
        <div className="rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 p-6 sm:p-10 text-center space-y-2">
          <Sparkles size={32} className="mx-auto text-outline opacity-50" />
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            No recently watched videos
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto text-xs">
            Open any lecture or live workshop to build your study history.
          </p>
        </div>
      ) : (
        /* Responsive Video Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
          {recentVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onOpenVideo={onOpenVideo}
              onToggleWatchLater={onToggleWatchLater}
            />
          ))}
        </div>
      )}
    </section>
  );
}
