import { Bookmark, Sparkles } from "lucide-react";
import VideoCard from "./VideoCard";

export default function WatchLater({
  videos = [],
  onOpenVideo,
  onToggleWatchLater,
}) {
  const watchLaterVideos = videos.filter((v) => v.isWatchLater);

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
            <Bookmark size={20} fill="currentColor" />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Saved Queue
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Watch Later Queue
            </h2>
          </div>
        </div>

        <span className="text-xs text-outline font-medium px-3 py-1 rounded-full bg-surface-container">
          {watchLaterVideos.length} videos queued
        </span>
      </div>

      {/* Empty State */}
      {watchLaterVideos.length === 0 ? (
        <div className="rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 p-6 sm:p-10 text-center space-y-2">
          <Sparkles size={32} className="mx-auto text-outline opacity-50" />
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            Your Watch Later queue is empty
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto text-xs">
            Bookmark any lecture, architecture breakdown, or code workshop to queue it here for future study.
          </p>
        </div>
      ) : (
        /* Responsive Video Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
          {watchLaterVideos.map((video) => (
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
