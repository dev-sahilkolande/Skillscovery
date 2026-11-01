import { Disc3, Coffee, Waves, Music, Zap, Wind } from "lucide-react";
import { genresData, tracksData } from "../../data/music/musicData";

const iconMap = {
  Disc3: Disc3,
  Coffee: Coffee,
  Waves: Waves,
  Music: Music,
  Guitar: Music,
  Zap: Zap,
  Wind: Wind,
};

export default function MusicCategories({ selectedGenre, onSelectGenre }) {
  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-6 lg:p-8 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-4">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Acoustic Profiles
          </span>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Music Genres & Categories
          </h2>
        </div>
        <span className="text-xs text-outline font-medium">
          Select genre to filter track library
        </span>
      </div>

      {/* Category Pills Grid */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {genresData.map((genre) => {
          const Icon = iconMap[genre.icon] || Disc3;
          const isSelected = selectedGenre === genre.id;
          const count =
            genre.id === "all"
              ? tracksData.length
              : tracksData.filter((t) => t.genre === genre.id).length;

          return (
            <button
              key={genre.id}
              onClick={() => onSelectGenre(genre.id)}
              className={`px-4 py-2.5 rounded-xl font-label-sm text-label-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary shadow-[0_0_16px_rgba(128,131,255,0.4)] scale-105"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest hover:text-primary"
              }`}
              type="button"
            >
              <Icon size={16} />
              <span>{genre.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
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
    </section>
  );
}
