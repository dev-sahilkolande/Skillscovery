import {
  Play,
  Bookmark,
  Clock,
  CheckCircle2,
  Flame,
} from "lucide-react";

const difficultyColors = {
  Beginner: "bg-secondary-container/40 text-secondary border-secondary/30",
  Intermediate: "bg-primary-container/30 text-primary border-primary/30",
  Advanced: "bg-tertiary-container/30 text-tertiary border-tertiary/30",
};

export default function VideoCard({
  video,
  onOpenVideo,
  onToggleWatchLater,
}) {
  const isCompleted = video.status === "completed";
  const isInProgress = video.status === "in_progress";

  const handleCardClick = () => {
    onOpenVideo && onOpenVideo(video);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleWatchLater && onToggleWatchLater(video.id);
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
      aria-label={`${video.title} workshop by ${video.instructor}, ${video.difficulty}`}
      className="group relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer bg-surface-container-high/60 border-surface-container-highest/40 hover:bg-surface-container-high hover:border-surface-container-highest shadow-md hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0 w-full"
    >
      <div className="space-y-4 min-w-0">
        {/* Thumbnail Area with Prominent Play Button */}
        <div
          className={`relative w-full h-44 rounded-xl bg-gradient-to-tr ${video.gradient} p-4 flex flex-col justify-between overflow-hidden shadow-inner`}
        >
          {/* Subtle ambient blur */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

          {/* Top Bar: Difficulty badge & Watch Later bookmark */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                {video.category}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full border backdrop-blur-md text-[10px] font-bold ${
                  difficultyColors[video.difficulty] || "text-white"
                }`}
              >
                {video.difficulty}
              </span>
            </div>

            {/* Bookmark Watch Later Button */}
            <button
              onClick={handleBookmarkClick}
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                video.isWatchLater
                  ? "bg-black/60 text-secondary scale-110"
                  : "bg-black/30 text-white/80 hover:text-white hover:bg-black/50"
              }`}
              type="button"
              aria-pressed={Boolean(video.isWatchLater)}
              aria-label={video.isWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
              title={video.isWatchLater ? "In Watch Later" : "Watch Later"}
            >
              <Bookmark size={16} fill={video.isWatchLater ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Center Play Button Overlay */}
          <div className="flex items-center justify-center z-10 my-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="w-13 h-13 rounded-full bg-white text-black shadow-2xl transition-all transform group-hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
              type="button"
              aria-label={`Play ${video.title}`}
            >
              <Play size={22} fill="currentColor" className="ml-1 text-black" />
            </button>
          </div>

          {/* Bottom Row on Thumbnail: Duration & Progress Badge */}
          <div className="flex items-center justify-between z-10 mt-auto">
            <div className="flex items-center gap-1.5">
              {isCompleted && (
                <span className="px-2 py-0.5 rounded-md bg-secondary/90 text-on-secondary text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
                  <CheckCircle2 size={11} />
                  <span>Watched</span>
                </span>
              )}
              {isInProgress && (
                <span className="px-2 py-0.5 rounded-md bg-tertiary-container/80 text-tertiary text-[10px] font-bold backdrop-blur-md flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  <span>{video.progress}%</span>
                </span>
              )}
            </div>

            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono font-semibold text-white/90 flex items-center gap-1">
              <Clock size={11} />
              {video.duration}
            </span>
          </div>

          {/* Bottom Edge Progress Bar */}
          {video.progress > 0 && (
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/40">
              <div
                className={`h-full transition-all duration-300 ${
                  isCompleted ? "bg-secondary" : "bg-gradient-to-r from-primary to-tertiary"
                }`}
                style={{ width: `${video.progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Video Information: Title & Instructor */}
        <div className="space-y-1.5 min-w-0">
          <h4 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {video.title}
          </h4>
          <p className="font-body-sm text-body-sm text-outline line-clamp-1 text-xs">
            {video.instructor}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {video.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-surface-container text-outline font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Status & Views/Last Watched */}
      <div className="pt-3.5 mt-4 border-t border-surface-container-highest/40 flex items-center justify-between text-xs text-outline min-w-0">
        <div className="flex items-center gap-1.5 font-medium">
          {isCompleted && (
            <span className="text-secondary flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Completed</span>
            </span>
          )}
          {isInProgress && (
            <span className="text-tertiary flex items-center gap-1">
              <Flame size={13} />
              <span>In Progress ({video.progress}%)</span>
            </span>
          )}
          {!isCompleted && !isInProgress && (
            <span className="text-outline">Ready to Watch</span>
          )}
        </div>

        <span className="text-on-surface-variant text-[11px]">
          {video.lastWatched !== "Not started" ? video.lastWatched : `${video.viewsCount} views`}
        </span>
      </div>
    </article>
  );
}
