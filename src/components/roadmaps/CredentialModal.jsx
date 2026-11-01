import { useEffect, useMemo } from "react";
import {
  X,
  Printer,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  FileCheck2,
} from "lucide-react";
import { useModalA11y } from "../../hooks/useModalA11y";
import { STORAGE_KEYS, getStoredItem } from "../../utils/storage";
import { defaultProfileData } from "../../data/settings/settingsData";

export default function CredentialModal({ credential, isOpen, onClose }) {
  const modalRef = useModalA11y({
    isOpen,
    onClose,
  });

  // Prevent background scrolling while modal is active
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Read recipient name reactively from profile storage
  const recipientName = useMemo(() => {
    const profile = getStoredItem(
      STORAGE_KEYS.SETTINGS_PROFILE,
      defaultProfileData,
      (data) => typeof data === "object" && data !== null
    );
    return profile?.fullName || "Elena Vance";
  }, []);

  if (!isOpen || !credential) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto cursor-pointer"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="credential-modal-title"
        aria-describedby="credential-modal-desc"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-surface-container border border-surface-container-highest shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col outline-none min-w-0 cursor-default"
      >
        {/* Modal Top Header (Screen Only - Hidden in Print) */}
        <div className="no-print flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-surface-container-highest/60 bg-surface-container-low min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-secondary-container/30 text-secondary">
              <Award size={18} />
            </span>
            <div className="min-w-0">
              <h2
                id="credential-modal-title"
                className="font-headline-sm text-sm sm:text-base font-bold text-on-surface truncate"
              >
                Verified Engineering Credential
              </h2>
              <p className="text-[11px] text-outline truncate font-mono">
                ID: {credential.certificateId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              type="button"
              aria-label="Print certificate"
              title="Print Certificate (or Save as PDF)"
              className="px-3 py-1.5 rounded-xl bg-surface-container-highest hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-surface-container-highest"
            >
              <Printer size={15} className="text-secondary" />
              <span className="hidden sm:inline">Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close credential modal"
              className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 min-w-0 flex-1">
          {/* Printable Certificate Document Frame */}
          <div className="certificate-document relative rounded-2xl bg-gradient-to-b from-surface-container-low/95 via-surface-container-low/90 to-surface-container-lowest border-2 border-secondary/30 p-6 sm:p-10 shadow-2xl overflow-hidden min-w-0">
            {/* Ambient Background Aura */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Inner Border Inset */}
            <div className="relative border border-surface-container-highest/60 rounded-xl p-5 sm:p-8 space-y-6 text-center min-w-0">
              {/* Certificate Header Banner */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary-container to-tertiary-container flex items-center justify-center text-white shadow-xl border border-white/20">
                  <ShieldCheck size={36} className="text-white" />
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-xs font-mono uppercase tracking-[0.2em] text-secondary font-semibold">
                    Skillscovery · Verified Credential
                  </span>
                  <h3 className="font-headline-md text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
                    Certificate of Mastery
                  </h3>
                </div>
              </div>

              {/* Recipient Announcement */}
              <div className="space-y-1 pt-2 border-t border-surface-container-highest/40">
                <p className="text-xs uppercase tracking-wider text-outline">
                  This certifies that
                </p>
                <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-inverse-primary to-tertiary py-1">
                  {recipientName}
                </div>
                <p className="text-xs text-outline max-w-md mx-auto leading-relaxed">
                  has demonstrated rigorous technical comprehension and successfully completed all
                  assessment criteria for the verified engineering roadmap:
                </p>
              </div>

              {/* Roadmap Title & Category Badge */}
              <div className="space-y-2 py-2">
                <h4 className="font-headline-md text-lg sm:text-2xl font-bold text-on-surface">
                  {credential.title}
                </h4>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-semibold border border-secondary/30 flex items-center gap-1.5">
                    <Layers size={13} />
                    <span>{credential.category}</span>
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary text-xs font-semibold border border-tertiary/30 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>{credential.grade}</span>
                  </span>
                </div>
              </div>

              {/* Skills / Description Summary */}
              {credential.description && (
                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/40 text-left space-y-1.5 max-w-xl mx-auto">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block">
                    Curriculum Competencies Verified
                  </span>
                  <p
                    id="credential-modal-desc"
                    className="text-xs text-on-surface-variant leading-relaxed font-body-sm"
                  >
                    {credential.description}
                  </p>
                  <p className="text-[11px] font-mono text-tertiary pt-1">
                    ✓ {credential.milestonesSummary}
                  </p>
                </div>
              )}

              {/* Certificate Signatures & Verification Meta */}
              <div className="pt-6 border-t border-surface-container-highest/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left sm:text-center text-xs">
                {/* Date */}
                <div className="space-y-0.5">
                  <span className="text-outline uppercase tracking-wider text-[10px] block flex items-center sm:justify-center gap-1">
                    <Calendar size={12} className="text-secondary" />
                    <span>Completion Date</span>
                  </span>
                  <span className="font-semibold text-on-surface font-mono">
                    {credential.completedDate}
                  </span>
                </div>

                {/* Performance */}
                <div className="space-y-0.5">
                  <span className="text-outline uppercase tracking-wider text-[10px] block flex items-center sm:justify-center gap-1">
                    <FileCheck2 size={12} className="text-tertiary" />
                    <span>Assessment Grade</span>
                  </span>
                  <span className="font-semibold text-tertiary font-mono">
                    {credential.grade}
                  </span>
                </div>

                {/* Certificate ID */}
                <div className="space-y-0.5">
                  <span className="text-outline uppercase tracking-wider text-[10px] block flex items-center sm:justify-center gap-1">
                    <Award size={12} className="text-primary" />
                    <span>Credential ID</span>
                  </span>
                  <span className="font-semibold text-on-surface font-mono">
                    {credential.certificateId}
                  </span>
                </div>
              </div>

              {/* Cryptographic Seal Footnote */}
              <div className="pt-4 text-center">
                <p className="text-[11px] text-outline font-mono">
                  🔒 Cryptographically Verified · Stored in Skillscovery Registry
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Row (Screen Only) */}
        <div className="no-print p-4 sm:p-5 border-t border-surface-container-highest/60 bg-surface-container-low flex items-center justify-between gap-3 min-w-0">
          <span className="text-xs text-outline font-mono hidden sm:inline truncate">
            Certificate ID: {credential.certificateId}
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-highest text-outline hover:text-on-surface text-sm font-medium transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-secondary text-on-secondary hover:brightness-110 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
