import HeroBanner from "../components/dashboard/HeroBanner";
import MilestonesAnalytics from "../components/dashboard/MilestonesAnalytics";
import DailySchedule from "../components/dashboard/DailySchedule";
import CourseCarousel from "../components/dashboard/CourseCarousel";
import AudioDock from "../components/dashboard/AudioDock";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-6 sm:space-y-8">
      {/* SECTION 1: HERO / WELCOME & LEARNING STREAK BANNER */}
      <HeroBanner />

      {/* SECTION 2: DYNAMIC SPLIT (60% Analytics & Milestones / 40% Spaced Repetition & Day Schedule) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
        <MilestonesAnalytics />
        <DailySchedule />
      </section>

      {/* SECTION 3: CONTINUE LEARNING & VIDEO LIBRARY (Netflix Style Carousel) */}
      <CourseCarousel />

      {/* SECTION 4: RECENTLY PLAYED & FOCUS AUDIO HUB (Spotify-style Dock) */}
      <AudioDock />
    </div>
  );
}
