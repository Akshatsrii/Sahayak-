import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Activity,
  FileText,
  Stethoscope,
  Heart,
  AlertTriangle,
  Building2,
  BarChart3,
  Settings,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Shield,
  Leaf,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: MessageSquare, label: "Symptom Checker", path: "/symptom-checker" },
  { icon: Leaf, label: "Ayurveda Guide", path: "/ayurveda" },
  { icon: FileText, label: "Medical History", path: "/medical-history" },
  { icon: Stethoscope, label: "Consultations", path: "/consultations" },
  { icon: Heart, label: "Women's Health", path: "/womens-health" },
  { icon: AlertTriangle, label: "Emergency", path: "/emergency" },
  { icon: Building2, label: "Institute Portal", path: "/institute" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo (CLICKABLE → DASHBOARD) */}
      <Link
        to="/dashboard"
        className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border hover:bg-sidebar-accent transition-colors"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg text-sidebar-foreground">
              SAHAYAK
            </span>
            <span className="text-xs text-muted-foreground"></span>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive && "text-primary"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Quick Emergency Button */}
      {!collapsed && (
        <div className="px-3 pb-4">
          <Link to="/emergency">
            <Button variant="emergency" className="w-full gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </Button>
          </Link>
        </div>
      )}

      {/* Footer Actions */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {/* LOGOUT (CLERK CONNECTED) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={cn(
            "w-full gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Logout</span>}
        </Button>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
