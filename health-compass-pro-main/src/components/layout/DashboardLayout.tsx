import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar hidden on mobile */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      <TopNav sidebarCollapsed={sidebarCollapsed} />
      <main
        className={`pt-16 transition-all duration-300 lg:pl-64 ${
          sidebarCollapsed ? "lg:pl-[72px]" : ""
        }`}
      >
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
