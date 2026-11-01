import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { telemetryData, roadmapData } from "../../data/dashboard/milestonesData";

export default function MilestonesAnalytics() {
  const navigate = useNavigate();
  const { tabs, weeklyVelocity, categoryBreakdown } = telemetryData;
  const { title: roadmapTitle, milestones } = roadmapData;

  const [selectedTab, setSelectedTab] = useState("Week");

  const velocityMap = {
    Day: telemetryData.dailyVelocity || weeklyVelocity,
    Week: weeklyVelocity,
    Month: telemetryData.monthlyVelocity || weeklyVelocity,
  };

  const activeVelocity = velocityMap[selectedTab] || weeklyVelocity;

  return (
    <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 min-w-0">
      {/*  Analytics Card  */}
      <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-3.5 sm:p-6 shadow-xl space-y-6 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Telemetry
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {selectedTab === "Day"
                ? "Today's Study Velocity"
                : selectedTab === "Month"
                ? "Monthly Study Velocity"
                : "Weekly Study Velocity"}
            </h2>
          </div>
          {/*  Timeframe selector tabs  */}
          <div className="flex items-center gap-1 p-1 bg-surface-container-highest/60 rounded-xl overflow-x-auto max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={
                  tab === selectedTab
                    ? "px-3 py-1 rounded-lg font-label-sm text-label-sm bg-surface-container-high text-on-surface font-semibold shadow-sm shrink-0 cursor-pointer"
                    : "px-3 py-1 rounded-lg font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors shrink-0 cursor-pointer"
                }
                type="button"
                aria-label={`Show ${tab} study velocity`}
                aria-pressed={tab === selectedTab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/*  Weekly Chart SVG Visualization  */}
        <div className="relative w-full h-56 bg-surface-container/50 rounded-xl p-3 sm:p-4 flex flex-col justify-end overflow-hidden">
          {/*  Background Grid lines  */}
          <div className="absolute inset-x-4 top-4 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full h-px bg-outline"></div>
            <div className="w-full h-px bg-outline"></div>
            <div className="w-full h-px bg-outline"></div>
            <div className="w-full h-px bg-outline"></div>
          </div>
          {/*  Area & Bar Hybrid Chart  */}
          <div className="relative z-10 w-full h-40 flex items-end justify-between px-1 sm:px-2 pt-4">
            {activeVelocity.map((item, idx) => {
              if (item.isDisabled) {
                return (
                  <div
                    key={idx}
                    className="group flex flex-col items-center flex-1 h-full justify-end opacity-40 min-w-0"
                  >
                    <div className="w-6 sm:w-8 md:w-9 max-w-[36px] rounded-t-lg bg-surface-container-high h-[20%] relative flex items-center justify-center"></div>
                    <span className="mt-2 text-[10px] sm:text-xs font-label-sm text-outline">
                      {item.day}
                    </span>
                  </div>
                );
              }
              if (item.peak) {
                return (
                  <div
                    key={idx}
                    className="group flex flex-col items-center flex-1 h-full justify-end min-w-0"
                  >
                    <div className="w-6 sm:w-8 md:w-9 max-w-[36px] rounded-t-lg bg-gradient-to-t from-secondary-container via-primary-container to-tertiary shadow-[0_0_18px_rgba(76,215,246,0.3)] transition-all h-[95%] relative flex items-center justify-center">
                      <span className="opacity-100 absolute -top-7 px-1.5 sm:px-2 py-0.5 rounded bg-surface-container-highest text-tertiary text-[10px] sm:text-xs font-label-sm font-bold shadow-lg">
                        {item.hours}
                      </span>
                    </div>
                    <span className="mt-2 text-[10px] sm:text-xs font-label-sm text-on-surface font-bold">
                      {item.day}
                    </span>
                  </div>
                );
              }
              if (item.isHighlighted) {
                return (
                  <div
                    key={idx}
                    className="group flex flex-col items-center flex-1 h-full justify-end min-w-0"
                  >
                    <div className="w-6 sm:w-8 md:w-9 max-w-[36px] rounded-t-lg bg-secondary-container/60 group-hover:bg-secondary-container transition-all h-[80%] relative flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 px-1.5 sm:px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] sm:text-xs font-label-sm font-bold shadow-lg">
                        {item.hours}
                      </span>
                    </div>
                    <span className="mt-2 text-[10px] sm:text-xs font-label-sm text-primary font-bold">
                      {item.day}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center flex-1 h-full justify-end min-w-0"
                >
                  <div
                    className="w-6 sm:w-8 md:w-9 max-w-[36px] rounded-t-lg bg-surface-container-high group-hover:bg-primary/40 transition-all relative flex items-center justify-center"
                    style={{ height: item.height }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 px-1.5 sm:px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] sm:text-xs font-label-sm font-bold shadow-lg">
                      {item.hours}
                    </span>
                  </div>
                  <span className="mt-2 text-[10px] sm:text-xs font-label-sm text-outline">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/*  Breakdown category pills  */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="bg-surface-container p-2.5 sm:p-3 rounded-xl min-w-0">
              <div className={`flex items-center gap-1.5 ${cat.textColor} mb-1 min-w-0`}>
                <span className={`w-2 h-2 rounded-full ${cat.dotColor} shrink-0`}></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium truncate">
                  {cat.name}
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {cat.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/*  Roadmap Timeline Card  */}
      <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-3.5 sm:p-6 shadow-xl space-y-6 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="min-w-0 flex-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
              Roadmap Milestone Path
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
              {roadmapTitle}
            </h2>
          </div>
          <button
            onClick={() => navigate("/roadmaps")}
            className="text-tertiary hover:text-tertiary-fixed font-label-md text-label-md font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            type="button"
            aria-label="Explore interactive curriculum roadmaps"
          >
            <span>Explore Map</span>
            <span className="material-symbols-outlined text-base">
              east
            </span>
          </button>
        </div>
        {/*  Stepper Visualizer  */}
        <div className="relative py-4 min-w-0">
          {/*  Connecting Spine  */}
          <div className="absolute left-5 sm:left-6 top-8 bottom-8 w-0.5 bg-surface-container-highest"></div>
          <div className="space-y-6 relative min-w-0">
            {milestones.map((node) => {
              if (node.status === "completed") {
                return (
                  <div key={node.id} className="flex items-start gap-3 sm:gap-4 group min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_12px_rgba(76,215,246,0.3)]">
                      <span className="material-symbols-outlined text-xl sm:text-2xl font-bold">
                        check
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 bg-surface-container/70 p-3.5 sm:p-4 rounded-xl group-hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                        <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wide uppercase">
                          {node.nodeNumber}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          {node.score}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        {node.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              }
              if (node.status === "in-progress") {
                return (
                  <div key={node.id} className="flex items-start gap-3 sm:gap-4 group min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-secondary-container to-primary text-on-background flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_18px_rgba(96,1,209,0.5)]">
                      <span
                        className="material-symbols-outlined text-xl sm:text-2xl animate-spin"
                        style={{ animationDuration: "6s" }}
                      >
                        sync
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 bg-surface-container p-3.5 sm:p-4 rounded-xl shadow-md border-l-4 border-l-secondary">
                      <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                        <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wide uppercase">
                          {node.nodeNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm">
                          {node.badge}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        {node.title}
                      </h3>
                      <div className="w-full h-1.5 rounded-full bg-surface-container-highest mt-3 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-secondary-container to-primary"
                          style={{ width: `${node.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-3 min-w-0">
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate min-w-0 flex-1">
                          {node.nextModule}
                        </span>
                        <button
                          onClick={() => navigate("/learning")}
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container hover:text-on-primary transition-all cursor-pointer w-full sm:w-auto shrink-0 text-center"
                          type="button"
                          aria-label={`Resume learning module: ${node.nextModule || node.title}`}
                        >
                          Resume Module
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              if (node.status === "next-up") {
                return (
                  <div key={node.id} className="flex items-start gap-3 sm:gap-4 group min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-highest text-outline flex items-center justify-center flex-shrink-0 z-10">
                      <span className="font-label-md text-label-md font-bold">
                        {node.id}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 bg-surface-container/40 p-3.5 sm:p-4 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                        <span className="font-label-sm text-label-sm text-outline font-semibold uppercase">
                          {node.nodeNumber}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          {node.estTime}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        {node.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              }
              // Locked
              return (
                <div key={node.id} className="flex items-start gap-3 sm:gap-4 opacity-50 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container text-outline flex items-center justify-center flex-shrink-0 z-10">
                    <span className="material-symbols-outlined text-lg sm:text-xl">
                      lock
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 bg-surface-container/20 p-3.5 sm:p-4 rounded-xl">
                    <span className="font-label-sm text-label-sm text-outline font-semibold uppercase">
                      {node.nodeNumber}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm font-medium text-on-surface">
                      {node.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
