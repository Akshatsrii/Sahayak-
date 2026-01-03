import { DashboardLayout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  User,
  Shield,
  Bell,
  Trash2,
  Heart,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function SettingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return null;

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const email = user.primaryEmailAddress?.emailAddress || "";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" />
          Settings
        </h1>

        {/* PROFILE */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue={firstName} />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue={lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={email} disabled />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* PRIVACY */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" /> Privacy & Data
            </CardTitle>
            <CardDescription>
              Control how your health data is used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Share data with healthcare providers",
                desc: "Allow doctors to access your health history",
                checked: true,
              },
              {
                label: "Anonymous research contribution",
                desc: "Help improve AI models (fully anonymized)",
                checked: false,
              },
              {
                label: "Marketing communications",
                desc: "Receive health tips and updates",
                checked: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-accent/50"
              >
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.checked} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* NOTIFICATIONS */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Email notifications",
              "Push notifications",
              "SMS alerts for emergencies",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-accent/50"
              >
                <p className="font-medium text-sm">{item}</p>
                <Switch defaultChecked={i < 2} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* DANGER ZONE */}
        <Card variant="emergency">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>

      {/* ================= FOOTER ================= */}
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
              Secure health platform with privacy-first design.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Settings</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Profile Management</li>
              <li>Privacy Controls</li>
              <li>Notifications</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Security</li>
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
      {/* =============== END FOOTER =============== */}
    </DashboardLayout>
  );
}
