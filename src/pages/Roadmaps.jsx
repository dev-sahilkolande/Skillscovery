import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import RoadmapsHero from "../components/roadmaps/RoadmapsHero";
import ActiveRoadmapsList from "../components/roadmaps/ActiveRoadmapsList";
import MilestoneTracker from "../components/roadmaps/MilestoneTracker";
import RecommendedRoadmaps from "../components/roadmaps/RecommendedRoadmaps";
import CompletedRoadmaps from "../components/roadmaps/CompletedRoadmaps";
import { activeRoadmapsData } from "../data/roadmaps/roadmapsData";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "../utils/storage";

export default function Roadmaps() {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.ROADMAP_SELECTED_ID,
      "dist-sys",
      (v) => typeof v === "string" && activeRoadmapsData.some((r) => r.id === v)
    )
  );

  const handleSelectRoadmap = (id) => {
    setSelectedRoadmapId(id);
    setStoredItem(STORAGE_KEYS.ROADMAP_SELECTED_ID, id);
  };

  const selectedRoadmap = useMemo(() => {
    return (
      activeRoadmapsData.find((r) => r.id === selectedRoadmapId) ||
      activeRoadmapsData[0]
    );
  }, [selectedRoadmapId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* 1. Roadmaps Hero Section */}
      <RoadmapsHero />

      {/* 2. Active Roadmaps Cards */}
      <ActiveRoadmapsList
        selectedRoadmapId={selectedRoadmapId}
        onSelectRoadmap={handleSelectRoadmap}
      />

      {/* 3. Detailed Milestone Tracking for Selected Roadmap */}
      <MilestoneTracker selectedRoadmap={selectedRoadmap} />

      {/* 4. Recommended Roadmaps across Engineering Categories */}
      <RecommendedRoadmaps />

      {/* 5. Completed Roadmaps & Verified Credentials */}
      <CompletedRoadmaps />
    </motion.div>
  );
}
