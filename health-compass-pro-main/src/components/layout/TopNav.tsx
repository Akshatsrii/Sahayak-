import {
  Bell,
  Search,
  AlertTriangle,
  ChevronDown,
  Menu,
  Home,
  MessageSquare,
  FileText,
  Stethoscope,
  Heart,
  Building2,
  BarChart3,
  Settings,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/clerk-react";

interface TopNavProps {
  sidebarCollapsed?: boolean;
}

const mobileNavItems = [
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

export function TopNav({ sidebarCollapsed }: TopNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const userName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300 left-0",
        "lg:left-64",
        sidebarCollapsed && "lg:left-[72px]"
      )}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 px-4 py-5 border-b">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info">
                    <Heart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">SAHAYAK MEDICOS</span>
                  </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                  {mobileNavItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-accent"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="px-3 pb-4">
                  <Link to="/emergency" onClick={() => setOpen(false)}>
                    <Button variant="emergency" className="w-full gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Emergency
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search */}
        <div className="relative hidden sm:block w-40 sm:w-60 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 bg-background/50 text-sm" />
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden sm:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">MedCare</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/emergency" className="hidden sm:block">
            <Button variant="emergency" size="sm" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden md:inline">Emergency</span>
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
              3
            </span>
          </Button>

          {/* ===== PROFILE (CLERK CONNECTED) ===== */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-border">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 sm:w-9 sm:h-9",
                },
              }}
            />
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground">Student</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
