import { useState } from "react";
import { CheckCircle2, Clock, Play, Layers } from "lucide-react";
import { activeRoadmapsData } from "../../data/roadmaps/roadmapsData";

export default function ActiveRoadmapsList({ selectedRoadmapId, onSelectRoadmap }) {
  const [resumingId, setResumingId] = useState(null);

  const handleContinue = (e, id) => {
    e.stopPropagation();
    setResumingId(id);
    onSelectRoadmap(id);
    setTimeout(() => {
      setResumingId(null);
    }, 1200);
  };

  return (
    <section className="space-y-5 w-full min-w-0 max-w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Enrolled Curricula
          </span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            Active Roadmaps
          </h2>
        </div>
        <span className="font-label-sm text-label-sm text-outline">
          Select a roadmap to inspect detailed milestones below
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full min-w-0" role="radiogroup" aria-label="Active roadmaps list">
        {activeRoadmapsData.map((roadmap) => {
          const isSelected = selectedRoadmapId === roadmap.id;
          const isResuming = resumingId === roadmap.id;

          return (
            <article
              key={roadmap.id}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${roadmap.title} roadmap, ${roadmap.progress}% completed`}
              onClick={() => onSelectRoadmap(roadmap.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectRoadmap(roadmap.id);
                }
              }}
              className={`rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 shadow-xl transition-all cursor-pointer flex flex-col justify-between border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0 ${
                isSelected
                  ? "border-primary shadow-[0_0_24px_rgba(128,131,255,0.25)] ring-1 ring-primary"
                  : "border-surface-container-highest/40 hover:border-surface-container-highest hover:-translate-y-1"
              }`}
            >
              <div className="space-y-3.5">
                {/* Header Badge & Hours */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${roadmap.badgeColor}`}
                  >
                    {roadmap.category}
                  </span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
                    <Clock size={13} />
                    {roadmap.estimatedTime}
                  </span>
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    {roadmap.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1.5 leading-relaxed">
                    {roadmap.description}
                  </p>
                </div>

                {/* Milestones Count & Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-secondary" />
                      {roadmap.completedMilestones} of {roadmap.totalMilestones} Milestones
                    </span>
                    <span className="text-tertiary font-bold">{roadmap.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${roadmap.accentGradient}`}
                      style={{ width: `${roadmap.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-surface-container-highest/30 flex items-center justify-between gap-3">
                <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                  <Layers size={14} />
                  {isSelected ? "Viewing Milestones" : "Click to View Nodes"}
                </span>

                <button
                  onClick={(e) => handleContinue(e, roadmap.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                    isResuming
                      ? "bg-tertiary text-on-tertiary shadow-[0_0_12px_rgba(76,215,246,0.6)]"
                      : isSelected
                      ? "bg-primary text-on-primary hover:brightness-110"
                      : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                  }`}
                  type="button"
                >
                  <Play size={12} className={isResuming ? "fill-on-tertiary" : ""} />
                  <span>{isResuming ? "Resuming..." : "Continue"}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
