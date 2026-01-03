import { useState } from "react";
import { useOrganization, OrganizationProfile } from "@clerk/clerk-react";

import { DashboardLayout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Building2,
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
  CreditCard,
  Settings,
  DollarSign,
  Check,
  Heart,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function InstitutePage() {
  const [showPlans, setShowPlans] = useState(false);
  const { organization } = useOrganization();

  const metadata = organization?.publicMetadata ?? {};
  const activePlan = (metadata.plan as string) ?? "starter";
  const price = (metadata.price as string) ?? "—";
  const maxStudents = (metadata.maxStudents as number) ?? 0;
  const features = (metadata.features as string[]) ?? [];

  /* ================= SETTINGS VIEW ================= */
  if (showPlans) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary" />
                Organization Settings
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your institute profile & billing
              </p>
            </div>

            <Button variant="outline" onClick={() => setShowPlans(false)}>
              Back to Dashboard
            </Button>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="general" className="gap-2">
                <Settings className="w-4 h-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <DollarSign className="w-4 h-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <OrganizationProfile
                    routing="virtual"
                    appearance={{
                      elements: {
                        navbar: "hidden",
                        card: "border-0 shadow-none bg-transparent",
                        pageScrollBox: "p-0",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-6 space-y-6">
              <Card variant="premium">
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription>Managed via Clerk</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-info/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold capitalize">
                          {activePlan} plan
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {price} • Up to {maxStudents} students
                        </p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>

                  {features.length > 0 && (
                    <ul className="space-y-2">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button variant="outline" className="w-full gap-2">
                    <CreditCard className="w-4 h-4" />
                    Manage Billing (Clerk)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* FOOTER */}
        <Footer />
      </DashboardLayout>
    );
  }

  /* ================= MAIN DASHBOARD ================= */
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              Institute Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              B2B health analytics for coaching institutes
            </p>
          </div>

          <Badge variant="premium" className="capitalize">
            {activePlan} plan
          </Badge>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: maxStudents || "—", icon: Users },
            { label: "Health Checks", value: "—", icon: BarChart3 },
            { label: "Avg. Health Score", value: "—", icon: TrendingUp },
            { label: "Scheduled Checkups", value: "—", icon: Calendar },
          ].map((stat, i) => (
            <Card key={i} variant="premium">
              <CardContent className="pt-6">
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="premium">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Billing handled by Clerk</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => setShowPlans(true)}
            >
              <Settings className="w-4 h-4" />
              Organization Settings
            </Button>

            <Button
              variant="default"
              className="flex-1 gap-2"
              onClick={() => setShowPlans(true)}
            >
              <DollarSign className="w-4 h-4" />
              Billing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FOOTER */}
      <Footer />
    </DashboardLayout>
  );
}

/* ================= FOOTER COMPONENT ================= */
function Footer() {
  return (
    <footer className="mt-16 rounded-3xl border bg-card shadow-2xl">
      <div className="p-10 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SAHAYAK</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Institutional healthcare analytics powered by privacy-first design.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>Institute Dashboard</li>
            <li>Health Reports</li>
            <li>Student Monitoring</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Compliance</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" /> support@sahayak.health
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" /> sahayak.health
          </p>
        </div>
      </div>

      <div className="border-t px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SAHAYAK. All rights reserved.
        </p>
        <div className="flex gap-3">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <Icon
              key={i}
              className="w-4 h-4 text-muted-foreground hover:text-primary"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
