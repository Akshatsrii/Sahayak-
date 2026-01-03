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
import {
  Heart,
  Calendar,
  Shield,
  BookOpen,
  Stethoscope,
  TrendingUp,
  Bell,
  ArrowRight,
  Lock,
  Activity,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ================= DATA ================= */

const cycleData = [
  { day: 1, type: "period", date: "Dec 28" },
  { day: 2, type: "period", date: "Dec 29" },
  { day: 3, type: "period", date: "Dec 30" },
  { day: 4, type: "period", date: "Dec 31" },
  { day: 5, type: "period", date: "Jan 1" },
  { day: 6, type: "normal", date: "Jan 2" },
  { day: 7, type: "normal", date: "Jan 3" },
];

const resources = [
  {
    title: "Understanding Your Cycle",
    description: "A comprehensive guide to menstrual health",
    type: "Article",
    readTime: "5 min",
  },
  {
    title: "Nutrition During Menstruation",
    description: "Foods that help manage symptoms",
    type: "Guide",
    readTime: "8 min",
  },
  {
    title: "When to See a Doctor",
    description: "Signs that warrant medical attention",
    type: "Checklist",
    readTime: "3 min",
  },
];

const specialists = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Gynecologist",
    available: true,
    nextSlot: "Today, 4:00 PM",
  },
  {
    name: "Dr. Emily Roberts",
    specialty: "Women's Health",
    available: true,
    nextSlot: "Tomorrow, 11:00 AM",
  },
];

export default function WomensHealthPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ================= HEADER ================= */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg mb-6 group">
          <div className="absolute inset-0">
            <img
              src="/images/womens-health-header.png"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Women's Health"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          </div>

          <div className="relative z-10 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500/20" />
                  Women's Health
                </h1>
                <Badge variant="premium" className="gap-1 bg-pink-50 text-pink-600 border-pink-200">
                  <Lock className="w-3 h-3" />
                  Private
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground max-w-xl">
                Your personal health dashboard with enhanced privacy protection.
              </p>
            </div>

            <Link to="/consultations">
              <Button variant="hero" className="gap-2 bg-pink-500 hover:bg-pink-600 text-white">
                <Stethoscope className="w-4 h-4" />
                Consult Specialist
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= PRIVACY NOTICE ================= */}
        <Card className="bg-pink-500/5 border-pink-500/20">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-pink-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Enhanced Privacy Protection</p>
                <p className="text-xs text-muted-foreground">
                  This section uses additional encryption. Your data is only accessible by you and your healthcare providers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cycle Tracker */}
            <Card variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-500" />
                  Cycle Tracker
                </CardTitle>
                <CardDescription>Track and predict your menstrual cycle</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cycleData.map((day, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 rounded-xl min-w-[70px] ${
                        day.type === "period"
                          ? "bg-pink-500/10 border border-pink-500/30"
                          : "bg-accent/50"
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">{day.date}</span>
                      <span className="text-lg font-bold">{day.day}</span>
                      {day.type === "period" && (
                        <span className="w-2 h-2 bg-pink-500 rounded-full mt-1" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="gap-2">
                    <Activity className="w-4 h-4" />
                    Log Today's Symptoms
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Insights */}
            <Card variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-pink-500" />
                  Health Insights
                </CardTitle>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-pink-500/10">
                  <h4 className="font-medium">Cycle Regularity</h4>
                  <p className="text-2xl font-bold text-pink-500">28 days</p>
                  <Badge variant="success">Regular</Badge>
                </div>

                <div className="p-4 rounded-xl bg-info/10">
                  <h4 className="font-medium">Symptom Trend</h4>
                  <p className="text-2xl font-bold text-info">Improving</p>
                  <Badge variant="info">+20%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card variant="premium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bell className="w-4 h-4" />
                  Set Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Activity className="w-4 h-4" />
                  Log Symptoms
                </Button>
              </CardContent>
            </Card>

            {/* Specialists */}
            <Card variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-pink-500" />
                  Specialists
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {specialists.map((doc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-accent/50">
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                    <Badge variant="success" className="mt-1">
                      Available
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-pink-500" />
                  Resources
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {resources.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-accent/50">
                    <p className="font-medium text-sm">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.description}</p>
                    <Badge variant="secondary" className="mt-1">
                      {r.readTime}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="mt-16 rounded-3xl border bg-card shadow-2xl">
        <div className="p-10 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-pink-500">SAHAYAK</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Privacy-first women’s health platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Cycle Tracking</li>
              <li>AI Health Check</li>
              <li>Doctor Consultations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Health Guides</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@sahayak.health
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 98765 43210
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" /> sahayak.health
            </p>
          </div>
        </div>

        <div className="border-t px-10 py-6 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SAHAYAK. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Icon key={i} className="w-4 h-4 text-muted-foreground hover:text-pink-500" />
            ))}
          </div>
        </div>
      </footer>
    </DashboardLayout>
  );
}
