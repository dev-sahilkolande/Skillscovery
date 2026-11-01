import { useState } from "react";
import {
  Check,
  RotateCw,
  Lock,
  ChevronDown,
  ChevronUp,
  Tag,
  Clock,
  Sparkles,
} from "lucide-react";

export default function MilestoneTracker({ selectedRoadmap }) {
  const [expandedNodes, setExpandedNodes] = useState({});

  if (!selectedRoadmap) return null;

  const toggleNode = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const { title, category, completedMilestones, totalMilestones, milestones } =
    selectedRoadmap;

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Path Milestones Tracker
            </span>
            <span>·</span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              {category}
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
            <Sparkles size={14} className="text-tertiary" />
            {completedMilestones} of {totalMilestones} Completed
          </span>
        </div>
      </div>

      {/* Stepper with Spine */}
      <div className="relative py-2">
        {/* Connecting Line */}
        <div className="absolute left-5 sm:left-6 top-8 bottom-8 w-0.5 bg-surface-container-highest pointer-events-none"></div>

        <div className="space-y-6 relative">
          {milestones.map((node) => {
            const isExpanded = !!expandedNodes[node.id];

            if (node.status === "completed") {
              return (
                <div key={node.id} className="flex items-start gap-3 sm:gap-4 group">
                  {/* Step Node Marker */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_12px_rgba(76,215,246,0.3)]">
                    <Check size={20} className="stroke-[2.5]" />
                  </div>

                  {/* Node Body Card */}
                  <div className="flex-1 bg-surface-container/70 p-4 sm:p-5 rounded-xl border border-surface-container-highest/30 group-hover:bg-surface-container transition-colors min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wide uppercase">
                          Milestone {node.step} · Completed
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-medium">
                          {node.score}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
                        <Clock size={12} />
                        {node.estTime}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {node.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                      {node.summary}
                    </p>

                    {/* Expandable Topics Toggle */}
                    <div className="mt-3 pt-3 border-t border-surface-container-highest/40 flex items-center justify-between">
                      <button
                        onClick={() => toggleNode(node.id)}
                        className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors"
                        type="button"
                      >
                        <Tag size={13} />
                        <span>Key Focus Topics ({node.topics.length})</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-1">
                        {node.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm text-xs"
                          >
                            ✓ {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (node.status === "current") {
              return (
                <div key={node.id} className="flex items-start gap-3 sm:gap-4 group">
                  {/* Active Spinner Marker */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-secondary-container to-primary text-on-background flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_20px_rgba(96,1,209,0.5)]">
                    <RotateCw size={18} className="animate-spin" style={{ animationDuration: "5s" }} />
                  </div>

                  {/* Node Body Card */}
                  <div className="flex-1 bg-surface-container p-4 sm:p-5 rounded-xl shadow-lg border-l-4 border-l-secondary border-t border-r border-b border-surface-container-highest/40 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wide uppercase">
                          Milestone {node.step} · In Progress ({node.progress}%)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm font-semibold">
                          {node.badge}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
                        <Clock size={12} />
                        {node.estTime}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {node.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                      {node.summary}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-surface-container-highest mt-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary"
                        style={{ width: `${node.progress}%` }}
                      ></div>
                    </div>

                    {/* Topics and Continue Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-surface-container-highest/40">
                      <button
                        onClick={() => toggleNode(node.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`topics-${node.id}`}
                        className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors cursor-pointer"
                        type="button"
                      >
                        <Tag size={13} />
                        <span>Key Focus Topics ({node.topics.length})</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <button
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary text-on-background font-label-sm text-label-sm font-semibold hover:brightness-110 shadow-md transition-all cursor-pointer"
                        type="button"
                      >
                        Resume Milestone
                      </button>
                    </div>

                    {isExpanded && (
                      <div id={`topics-${node.id}`} className="flex flex-wrap gap-2 mt-3 pt-1">
                        {node.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm text-xs font-medium"
                          >
                            ● {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            // Upcoming / Locked
            return (
              <div key={node.id} className="flex items-start gap-3 sm:gap-4 opacity-70 group hover:opacity-100 transition-opacity">
                {/* Step Marker */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-highest text-outline flex items-center justify-center flex-shrink-0 z-10 font-label-md text-label-md font-bold">
                  {node.step}
                </div>

                {/* Node Body Card */}
                <div className="flex-1 bg-surface-container/40 p-4 sm:p-5 rounded-xl border border-surface-container-highest/20 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-label-sm text-label-sm text-outline font-semibold uppercase flex items-center gap-1.5">
                      <Lock size={12} />
                      Milestone {node.step} · Upcoming
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">{node.estTime}</span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    {node.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {node.summary}
                  </p>

                  <div className="mt-3 pt-3 border-t border-surface-container-highest/20 flex items-center justify-between">
                    <button
                      onClick={() => toggleNode(node.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`topics-locked-${node.id}`}
                      className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors cursor-pointer"
                      type="button"
                    >
                      <Tag size={13} />
                      <span>Preview Topics ({node.topics.length})</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div id={`topics-locked-${node.id}`} className="flex flex-wrap gap-2 mt-3 pt-1">
                      {node.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-outline font-label-sm text-label-sm text-xs"
                        >
                          ○ {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
