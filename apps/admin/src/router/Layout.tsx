import React, { useState, Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Topbar, Sidebar } from "@nevo/design-system";
import { ADMIN_NAVIGATION } from "../config/navigation";

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract current route from pathname
  const currentRoute = location.pathname.slice(1) || "dashboard";

  const handleNavigate = (route: string) => {
    navigate(`/${route}`);
    setSidebarOpen(false); // Close mobile sidebar on navigation
  };

  return (
    <div className="h-screen flex flex-col bg-page text-primary overflow-hidden">
      <Topbar onMenu={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          navigation={ADMIN_NAVIGATION}
          route={currentRoute}
          onNavigate={handleNavigate}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
