import { useState } from "react";
import { CheckCircle2, Award, ShieldCheck, FileCheck } from "lucide-react";
import { completedRoadmapsData } from "../../data/roadmaps/roadmapsData";
import CredentialModal from "./CredentialModal";

export default function CompletedRoadmaps() {
  const [activeCredential, setActiveCredential] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCredential = (item) => {
    setActiveCredential(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="space-y-5 w-full min-w-0 max-w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Verified Achievements
          </span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            Completed Roadmaps
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-semibold shrink-0">
          <ShieldCheck size={14} className="text-secondary" />
          <span>{completedRoadmapsData.length} Verified Certificates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
        {completedRoadmapsData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenCredential(item)}
            className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 shadow-xl border border-secondary/20 hover:border-secondary/40 transition-all flex flex-col justify-between space-y-4 min-w-0 cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 font-label-sm text-label-sm font-semibold text-secondary">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold">
                  <CheckCircle2 size={14} className="text-tertiary" />
                  {item.grade}
                </span>
              </div>

              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container/60 border border-surface-container-highest/30 flex items-center justify-between text-xs font-label-sm">
                <span className="text-on-surface font-medium">{item.milestonesSummary}</span>
                <span className="text-outline">Finished {item.completedDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container-highest/30 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline flex items-center gap-1 font-mono text-[11px]">
                <Award size={13} className="text-secondary" />
                ID: {item.certificateId}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCredential(item);
                }}
                aria-label={`View credential for ${item.title}`}
                className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                type="button"
              >
                <FileCheck size={14} className="text-secondary" />
                <span>View Credential</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Credential Certificate Modal */}
      <CredentialModal
        credential={activeCredential}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
