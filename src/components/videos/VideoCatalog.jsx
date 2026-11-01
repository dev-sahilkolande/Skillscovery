import { useState } from "react";
import {
  Video,
  Search,
  X,
  Filter,
  Layers,
  Code2,
  Globe,
  Network,
  Brain,
  Cpu,
  Cloud,
} from "lucide-react";
import { videoCategories } from "../../data/videos/videoData";
import VideoCard from "./VideoCard";

const categoryIconMap = {
  Layers: Layers,
  Code2: Code2,
  Globe: Globe,
  Network: Network,
  Brain: Brain,
  Cpu: Cpu,
  Cloud: Cloud,
};

export default function VideoCatalog({
  videos = [],
  selectedCategory = "all",
  onSelectCategory,
  onOpenVideo,
  onToggleWatchLater,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recommended");

  // Multi-criteria filtering: Search (title, instructor, tags), Category, Difficulty, Status
  const filteredVideos = videos
    .filter((video) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        video.title.toLowerCase().includes(query) ||
        video.instructor.toLowerCase().includes(query) ||
        video.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        !selectedCategory ||
        selectedCategory === "all" ||
        video.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "all" || video.difficulty === selectedDifficulty;

      const matchesStatus =
        selectedStatus === "all" || video.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    })
    .sort((a, b) => {
      if (selectedSort === "progress") {
        return (b.progress || 0) - (a.progress || 0);
      }
      if (selectedSort === "duration-desc") {
        return (b.durationSeconds || 0) - (a.durationSeconds || 0);
      }
      if (selectedSort === "duration-asc") {
        return (a.durationSeconds || 0) - (b.durationSeconds || 0);
      }
      // Default: recommended / original order
      return 0;
    });

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
    setSelectedStatus("all");
    setSelectedSort("recommended");
    onSelectCategory && onSelectCategory("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (selectedCategory && selectedCategory !== "all") ||
    selectedDifficulty !== "all" ||
    selectedStatus !== "all" ||
    selectedSort !== "recommended";

  return (
    <section id="all-videos-catalog" className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* 1. Header & Quick Filter Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <Video size={20} />
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block truncate">
              Curriculum Video Index
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
              All Videos & Workshops
            </h2>
          </div>
        </div>

        {/* Video Count & Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-container text-outline">
            Showing {filteredVideos.length} of {videos.length} videos
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

      {/* 2. Unified Search & Multi-Filter Control Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full min-w-0">
        {/* Search input (by title, instructor, or tags) - 5 cols */}
        <div className="md:col-span-5 relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, instructor, or tags (e.g. Raft, Go, eBPF)..."
            aria-label="Search videos by title, instructor, or tags"
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

        {/* Difficulty Filter - 2 cols */}
        <div className="md:col-span-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            aria-label="Filter videos by difficulty"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Status Filter - 2 cols */}
        <div className="md:col-span-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter videos by status"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Sort Options - 3 cols */}
        <div className="md:col-span-3">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            aria-label="Sort videos by"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="progress">Sort: Highest Progress</option>
            <option value="duration-desc">Sort: Longest Duration</option>
            <option value="duration-asc">Sort: Shortest Duration</option>
          </select>
        </div>
      </div>

      {/* 3. Category Filter Pills immediately above video cards */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs text-outline">
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Filter by Category
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => onSelectCategory && onSelectCategory("all")}
              className="text-primary hover:underline cursor-pointer"
              type="button"
            >
              View All Categories
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap w-full max-w-full min-w-0" role="group" aria-label="Video category filters">
          {videoCategories.map((category) => {
            const Icon = categoryIconMap[category.icon] || Layers;
            const isSelected = selectedCategory === category.id;
            const count =
              category.id === "all"
                ? videos.length
                : videos.filter((v) => v.category === category.id).length;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory && onSelectCategory(category.id)}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Filter by ${category.label} (${count} videos)`}
                className={`px-3.5 py-2 rounded-xl font-label-sm text-label-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-on-primary shadow-[0_0_16px_rgba(128,131,255,0.4)] scale-105"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest hover:text-primary"
                }`}
              >
                <Icon size={15} />
                <span>{category.label}</span>
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

      {/* 4. Filtered Video Grid / Empty State */}
      {filteredVideos.length === 0 ? (
        <div className="py-16 text-center rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 space-y-3">
          <Video size={40} className="mx-auto text-outline opacity-50" />
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            No videos found matching your filters
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto text-xs">
            {searchQuery
              ? `We couldn't find any videos matching "${searchQuery}". Try adjusting your keywords, difficulty level, or category.`
              : "No videos match the selected category, difficulty, and status combination."}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 w-full min-w-0">
          {filteredVideos.map((video) => (
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
