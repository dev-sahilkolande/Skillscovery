import { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RouteLoadingFallback from "../components/RouteLoadingFallback";
import { initAppearance } from "../utils/theme";

export default function MainLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initialize theme, accent color, and display density from storage on mount
  useEffect(() => {
    initAppearance();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      {/* Accessible Skip Link for Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <div className="pl-0 lg:pl-72 flex flex-col min-h-screen transition-[padding] duration-300 w-full min-w-0 max-w-full">
        <Topbar
          isMobileMenuOpen={isMobileSidebarOpen}
          onToggleMobileMenu={() => setIsMobileSidebarOpen((prev) => !prev)}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className="w-full max-w-full min-w-0 pt-18 sm:pt-24 px-3 sm:px-6 lg:px-8 flex-1 bg-background overflow-x-hidden outline-none"
        >
          <Suspense fallback={<RouteLoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
