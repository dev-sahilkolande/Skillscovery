import { FileText, FileCode, Cpu, Terminal, ExternalLink } from "lucide-react";
import { recentResourcesData } from "../../data/learning/learningData";

const resourceIconMap = {
  FileText: FileText,
  FileCode: FileCode,
  Cpu: Cpu,
  Terminal: Terminal,
};

export default function RecentlyAccessed() {
  return (
    <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6 w-full min-w-0 max-w-full">
      <div className="flex items-center justify-between min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Quick Retrieval
          </span>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Recently Accessed
          </h2>
        </div>
        <span className="font-label-sm text-label-sm text-outline">
          {recentResourcesData.length} items
        </span>
      </div>

      <div className="space-y-3">
        {recentResourcesData.map((res) => {
          const Icon = resourceIconMap[res.icon] || FileText;

          return (
            <div
              key={res.id}
              className="p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container border border-surface-container-highest/30 transition-all flex items-center justify-between gap-3 group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-outline group-hover:text-primary transition-colors flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                      {res.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-outline font-body-sm text-body-sm text-xs mt-0.5">
                    <span className="text-secondary font-medium">{res.tag}</span>
                    <span>·</span>
                    <span>{res.type}</span>
                    <span>·</span>
                    <span>{res.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-2 text-outline group-hover:text-on-surface transition-colors flex-shrink-0">
                <ExternalLink size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
