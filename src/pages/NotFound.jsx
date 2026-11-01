import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8">
      <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-6 sm:p-12 shadow-xl flex flex-col items-center text-center space-y-4 min-w-0 max-w-full">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary mb-2 shadow-lg">
          <span className="material-symbols-outlined text-4xl">
            error
          </span>
        </div>
        <span className="px-3 py-1 rounded-full bg-error-container/40 text-on-error-container font-label-sm text-label-sm font-semibold tracking-wide">
          404 ERROR
        </span>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
          Page Not Found
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
          The page you are looking for doesn't exist or has been moved. Check the URL or return to your dashboard.
        </p>
        <Link
          to="/"
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container text-on-background font-label-md text-label-md font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(96,1,209,0.3)] hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_back
          </span>
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
