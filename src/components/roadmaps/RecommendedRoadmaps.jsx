import { useState, useMemo } from "react";
import { Search, Compass, Clock, Star, Layers, PlusCircle } from "lucide-react";
import {
  roadmapCategories,
  recommendedRoadmapsData,
} from "../../data/roadmaps/roadmapsData";

export default function RecommendedRoadmaps() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoadmaps = useMemo(() => {
    return recommendedRoadmapsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categorySlug === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="space-y-6 w-full min-w-0 max-w-full">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Expand Your Competencies
          </span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            Recommended Roadmaps
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-3 text-outline pointer-events-none" />
          <input
            type="text"
            placeholder="Search pathways, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container/70 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full min-w-0" role="group" aria-label="Roadmap category filters">
        {roadmapCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={isSelected}
              aria-label={`Filter by ${cat.label}`}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary font-semibold shadow-md"
                  : "bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
              type="button"
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      {filteredRoadmaps.length === 0 ? (
        <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-10 text-center space-y-3">
          <Compass size={36} className="mx-auto text-outline opacity-60" />
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            No roadmaps match your criteria
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-highest transition-colors"
            type="button"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
          {filteredRoadmaps.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 shadow-xl border border-surface-container-highest/40 hover:border-surface-container-highest hover:-translate-y-1 transition-all flex flex-col justify-between min-w-0"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm font-semibold text-secondary">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-secondary font-medium">
                    <Star size={13} className="fill-secondary text-secondary" />
                    {item.rating}
                  </span>
                </div>

                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 text-outline font-label-sm text-label-sm pt-2">
                  <span className="flex items-center gap-1">
                    <Layers size={13} />
                    {item.milestoneCount} Milestones
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {item.estimatedHours}
                  </span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-surface-container-highest/30">
                <button
                  className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center justify-center gap-2"
                  type="button"
                >
                  <PlusCircle size={15} className="text-primary" />
                  <span>Enroll in Pathway</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
