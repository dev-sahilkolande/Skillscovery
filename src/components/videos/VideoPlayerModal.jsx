import { useState, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Bookmark,
  Clock,
  Info,
} from "lucide-react";
import { useModalA11y } from "../../hooks/useModalA11y";

export default function VideoPlayerModal({
  video,
  isOpen,
  onClose,
  onUpdateProgress,
  onToggleWatchLater,
}) {
  const modalContainerRef = useModalA11y({
    isOpen,
    onClose,
  });

  const [prevVideoId, setPrevVideoId] = useState(video?.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(video?.progress || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreenSimulated, setIsFullscreenSimulated] = useState(false);

  // Sync state when video changes without cascading effects
  if (video && video.id !== prevVideoId) {
    setPrevVideoId(video.id);
    setProgress(video.progress || 0);
    setIsPlaying(false);
  }

  // Simulated playback ticker when modal is open and playing
  useEffect(() => {
    let timer;
    if (isPlaying && isOpen) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (video && onUpdateProgress) {
              onUpdateProgress(video.id, 100, "completed");
            }
            return 100;
          }
          const next = Math.min(100, prev + 1);
          if (video && onUpdateProgress && next % 5 === 0) {
            onUpdateProgress(video.id, next, next === 100 ? "completed" : "in_progress");
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, video, onUpdateProgress]);

  if (!isOpen || !video) return null;

  const isCompleted = video.status === "completed" || progress >= 100;

  // Calculate elapsed time formatted from durationSeconds
  const totalSeconds = video.durationSeconds || 2400;
  const currentElapsedSeconds = Math.round((progress / 100) * totalSeconds);

  const formatVideoTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    const newStatus = newProgress >= 100 ? "completed" : newProgress > 0 ? "in_progress" : "not_started";
    onUpdateProgress && onUpdateProgress(video.id, newProgress, newStatus);
  };

  const handleMarkCompleted = () => {
    setProgress(100);
    setIsPlaying(false);
    onUpdateProgress && onUpdateProgress(video.id, 100, "completed");
  };

  const handleResetProgress = () => {
    setProgress(0);
    setIsPlaying(false);
    onUpdateProgress && onUpdateProgress(video.id, 0, "not_started");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        ref={modalContainerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-player-modal-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className="relative w-full max-w-4xl rounded-2xl bg-surface-container border border-surface-container-highest shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col outline-none"
      >
        {/* Top Header Row with Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-surface-container-highest bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/30 text-primary text-xs font-semibold">
              {video.category}
            </span>
            <span className="text-xs text-outline font-medium">·</span>
            <span className="text-xs text-outline">{video.duration}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
            aria-label="Close video player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Display Screen (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black flex flex-col justify-between overflow-hidden group">
          {/* Simulated Video Canvas / Visualizer Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr ${video.gradient} opacity-40 flex items-center justify-center`}
          >
            <div className="w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
          </div>

          {/* Top Demo Disclaimer Badge */}
          <div className="relative z-20 p-3 sm:p-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-secondary text-xs font-semibold shadow-md">
              <Info size={13} className="text-secondary flex-shrink-0" />
              <span className="hidden sm:inline">Frontend Demo Player · Simulated Playback (Video assets not bundled)</span>
              <span className="sm:hidden">Demo Player · Simulated</span>
            </div>
          </div>

          {/* Center Play / Pause Action Overlay */}
          <div className="relative z-20 flex items-center justify-center my-auto">
            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 rounded-full bg-white/95 text-black hover:bg-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
              type="button"
              aria-label={isPlaying ? `Pause video: ${video.title}` : `Play video: ${video.title}`}
            >
              {isPlaying ? (
                <Pause size={28} fill="currentColor" />
              ) : (
                <Play size={28} fill="currentColor" className="ml-1 text-black" />
              )}
            </button>
          </div>

          {/* Bottom Player Overlay Bar with Seek Controls */}
          <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-2">
            {/* Scrubber Range Input */}
            <div className="w-full flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 accent-primary bg-white/30 rounded-lg cursor-pointer"
                aria-label="Video timeline scrubber"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
                aria-valuetext={`${progress}% watched`}
              />
            </div>

            {/* Time readout and controls */}
            <div className="flex items-center justify-between text-xs text-white/90 font-medium">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="hover:text-primary transition-colors cursor-pointer"
                  type="button"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  onClick={handleResetProgress}
                  className="hover:text-primary transition-colors cursor-pointer"
                  type="button"
                  title="Restart from beginning"
                  aria-label="Restart video from beginning"
                >
                  <RotateCcw size={15} />
                </button>

                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span>{formatVideoTime(currentElapsedSeconds)}</span>
                  <span className="text-white/50">/</span>
                  <span className="text-white/70">{formatVideoTime(totalSeconds)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  className="hover:text-primary transition-colors cursor-pointer"
                  type="button"
                  aria-pressed={isMuted}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  onClick={() => setIsFullscreenSimulated((prev) => !prev)}
                  className="hover:text-primary transition-colors cursor-pointer"
                  type="button"
                  aria-pressed={isFullscreenSimulated}
                  aria-label={isFullscreenSimulated ? "Exit simulated fullscreen" : "Enter simulated fullscreen"}
                  title="Simulate fullscreen mode"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Information & Progress Control Footer */}
        <div className="p-6 space-y-5 overflow-y-auto bg-surface-container">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <h2 id="video-player-modal-title" className="font-title-lg text-title-lg font-bold text-on-surface">
                {video.title}
              </h2>
              <p className="font-body-sm text-body-sm text-outline text-xs">
                Instructor: <strong className="text-on-surface font-semibold">{video.instructor}</strong>
              </p>
            </div>

            {/* Action Buttons: Mark Completed & Watch Later */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={handleMarkCompleted}
                aria-pressed={isCompleted}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCompleted
                    ? "bg-secondary text-on-secondary shadow-md"
                    : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface"
                }`}
                type="button"
              >
                <CheckCircle2 size={15} />
                <span>{isCompleted ? "Completed" : "Mark as Completed"}</span>
              </button>

              <button
                onClick={() => onToggleWatchLater && onToggleWatchLater(video.id)}
                aria-pressed={Boolean(video.isWatchLater)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  video.isWatchLater
                    ? "bg-secondary-container/40 text-secondary"
                    : "bg-surface-container-high hover:bg-surface-container-highest text-outline hover:text-on-surface"
                }`}
                type="button"
              >
                <Bookmark size={15} fill={video.isWatchLater ? "currentColor" : "none"} />
                <span>{video.isWatchLater ? "In Queue" : "Watch Later"}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {video.description}
          </p>

          {/* Progress Control Track */}
          <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-outline">Learning Progress</span>
              <span className="font-bold text-primary">{progress}% Watched</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isCompleted ? "bg-secondary" : "bg-gradient-to-r from-primary to-tertiary"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs text-outline font-medium flex items-center gap-1">
              <Clock size={12} />
              <span>Duration: {video.duration}</span>
            </span>
            <span className="text-outline text-xs">·</span>
            {video.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-0.5 rounded-lg bg-surface-container-high text-outline"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
