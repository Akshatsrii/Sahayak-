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
  FileText,
  Brain,
  Stethoscope,
  Calendar,
  Download,
  ChevronRight,
  Activity,
  Pill,
  Clock,
  Filter,
  Heart,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ================= DATA ================= */

const timelineData = [
  {
    date: "Jan 1, 2026",
    type: "assessment",
    title: "AI Health Assessment",
    description: "Routine health check - Risk: Low",
    icon: Brain,
    iconBg: "bg-primary/10 text-primary",
    details: "Overall health score: 92/100. No concerning symptoms detected.",
  },
  {
    date: "Dec 28, 2025",
    type: "consultation",
    title: "Video Consultation",
    description: "Dr. Sarah Chen - General Check-up",
    icon: Stethoscope,
    iconBg: "bg-info/10 text-info",
    details:
      "Discussed stress management and sleep patterns. Follow-up in 2 weeks.",
  },
  {
    date: "Dec 15, 2025",
    type: "prescription",
    title: "Prescription Issued",
    description: "Vitamin D Supplement",
    icon: Pill,
    iconBg: "bg-success/10 text-success",
    details: "Vitamin D3 1000 IU daily for 3 months.",
  },
];

const reports = [
  { month: "December 2025", score: 92 },
  { month: "November 2025", score: 88 },
  { month: "October 2025", score: 85 },
];

const iconMap: any = {
  Brain,
  Stethoscope,
  Pill,
  FileText,
};

/* ================= COMPONENT ================= */

export default function MedicalHistory() {
  const [historyItems, setHistoryItems] = useState(timelineData);

  useEffect(() => {
    const saved = localStorage.getItem("medical_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validItems = parsed.map((item: any) => ({
          ...item,
          icon: iconMap[item.icon] || Brain,
        }));
        setHistoryItems([...validItems, ...timelineData]);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              Medical History
            </h1>
            <p className="text-muted-foreground mt-1">
              Your complete health timeline and medical records
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="hero" className="gap-2">
              <Download className="w-4 h-4" />
              Export Records
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* TIMELINE */}
          <div className="lg:col-span-2">
            <Card variant="premium">
              <CardHeader>
                <CardTitle>Health Timeline</CardTitle>
                <CardDescription>
                  Your medical history in chronological order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {historyItems.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        {index < historyItems.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.date}
                          </span>
                        </div>
                        <div className="mt-2 p-3 rounded-xl bg-accent/50 text-sm text-muted-foreground">
                          {item.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <Card variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-success/10 to-primary/10">
                  <div className="text-4xl font-bold text-primary">92</div>
                  <p className="text-sm text-muted-foreground">
                    Current Health Score
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="premium">
              <CardHeader>
                <CardTitle>Monthly Reports</CardTitle>
                <CardDescription>Download summaries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {reports.map((report, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-accent/50"
                  >
                    <div>
                      <p className="text-sm font-medium">{report.month}</p>
                      <p className="text-xs text-muted-foreground">
                        Score: {report.score}/100
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
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

          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SAHAYAK</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A secure digital healthcare platform for tracking medical history,
              reports, and consultations.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Medical History</li>
              <li>AI Health Reports</li>
              <li>Doctor Consultations</li>
              <li>Prescriptions</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-3">
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" /> support@sahayak.com
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
            {[Facebook, Twitter, Instagram, Linkedin, Youtube, Github].map(
              (Icon, i) => (
                <Icon key={i} className="w-4 h-4 text-muted-foreground" />
              )
            )}
          </div>
        </div>
      </footer>
      {/* =============== END FOOTER =============== */}

    </DashboardLayout>
  );
}
