import { ShieldAlert, AlertTriangle, LogOut, X } from "lucide-react";
import { useModalA11y } from "../../hooks/useModalA11y";

export default function DemoLogoutModal({ isOpen, onClose, onConfirm }) {
  const dialogRef = useModalA11y({
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity cursor-pointer"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-desc"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-low/95 border border-surface-container-highest/60 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl space-y-5 cursor-default"
      >
        {/* Header Icon & Close */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-xl bg-error-container/30 text-error flex items-center justify-center shrink-0">
            <LogOut size={24} />
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title and Description */}
        <div className="space-y-2">
          <h2
            id="logout-dialog-title"
            className="text-xl font-bold text-on-surface"
          >
            Sign Out of Demo Session?
          </h2>
          <p
            id="logout-dialog-desc"
            className="text-sm text-on-surface-variant leading-relaxed"
          >
            Skillscovery is a <strong>client-side prototype demo</strong> without a backend authentication server. Signing out will stop any running focus timer, reset the active session state, and return you to the Dashboard.
          </p>
        </div>

        {/* Honest Architecture Notice */}
        <div className="p-3.5 rounded-xl bg-surface-container/80 border border-surface-container-highest/50 flex items-start gap-3 text-xs text-outline">
          <ShieldAlert size={18} className="text-tertiary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-on-surface block">
              Your Local Data Remains Safe
            </span>
            <p className="leading-relaxed">
              Your planner sessions, music favorites, watch history, and appearance preferences will remain safely preserved in your browser's local storage.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-error text-on-error hover:bg-error/90 font-label-md text-label-md font-semibold transition-colors shadow-lg shadow-error/20 flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <AlertTriangle size={16} />
            <span>Confirm Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
