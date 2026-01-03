import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Stethoscope,
  Search,
  Star,
  Calendar,
  Video,
  MessageSquare,
  Clock,
  CheckCircle,
  Filter,
  MapPin,
  Award,
  Heart,
  Users,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  FileText,
  Download,
  TrendingUp,
  X,
  AlertCircle,
  Zap,
  Shield,
  GraduationCap,
  Briefcase,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react";

/* ================= MOCK DATA ================= */

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "General Medicine",
    experience: "12 years",
    rating: 4.9,
    reviews: 234,
    available: true,
    nextSlot: "Today, 3:00 PM",
    image: "SC",
    verified: true,
    languages: ["English", "Mandarin"],
    consultationFee: "₹500",
    patients: "2,500+",
    education: "MBBS, MD - Harvard Medical School",
    about:
      "Specializes in preventive care and chronic disease management with a patient-centered approach.",
    availableSlots: ["3:00 PM", "4:30 PM", "6:00 PM"],
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Internal Medicine",
    experience: "15 years",
    rating: 4.8,
    reviews: 189,
    available: true,
    nextSlot: "Tomorrow, 10:00 AM",
    image: "JW",
    verified: true,
    languages: ["English", "Spanish"],
    consultationFee: "₹600",
    patients: "3,200+",
    education: "MBBS, MD - Johns Hopkins University",
    about:
      "Expert in complex medical conditions and diagnostic excellence.",
    availableSlots: ["10:00 AM", "11:30 AM", "2:00 PM"],
  },
];

const stats = [
  {
    label: "Total Consultations",
    value: "24",
    icon: Stethoscope,
    change: "+3 this month",
  },
  {
    label: "Upcoming",
    value: "1",
    icon: Calendar,
    change: "Next: Today 2PM",
  },
  {
    label: "Favorite Doctors",
    value: "3",
    icon: Heart,
    change: "Quick access",
  },
  {
    label: "Avg Rating Given",
    value: "4.8",
    icon: Star,
    change: "Excellent",
  },
];

/* ================= COMPONENT ================= */

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([1]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HERO */}
        <div className="relative rounded-3xl overflow-hidden min-h-[260px] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-info/80" />
          <div className="relative p-10 text-white">
            <Badge className="mb-4 bg-white/20">
              <Shield className="w-3 h-3 mr-1" />
              Trusted Healthcare Platform
            </Badge>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Stethoscope className="w-10 h-10" />
              Doctor Consultations
            </h1>
            <p className="mt-3 max-w-xl text-white/90">
              Connect with verified doctors for video and in-person consultations.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} variant="premium">
              <CardContent className="p-4">
                <stat.icon className="w-6 h-6 text-primary mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-success">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEARCH */}
        <Card variant="premium">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* DOCTOR LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} variant="premium">
              <CardContent className="p-6 flex gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-info flex items-center justify-center text-white text-2xl font-bold">
                  {doctor.image}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialty}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={favorites.includes(doctor.id) ? "default" : "outline"}
                      onClick={() => toggleFavorite(doctor.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(doctor.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="mt-3 text-sm flex gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      {doctor.rating}
                    </span>
                    <span>{doctor.experience}</span>
                    <span className="font-medium text-primary">
                      {doctor.consultationFee}
                    </span>
                  </div>

                  <Button variant="hero" className="mt-4 gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="mt-16 rounded-3xl border bg-card shadow-2xl">
        <div className="p-10 grid gap-10 md:grid-cols-4">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SAHAYAK</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A trusted healthcare platform connecting patients with verified doctors.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Doctor Consultations</li>
              <li>Video Appointments</li>
              <li>Prescriptions</li>
              <li>Health Records</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@sahayak.com
            </p>
            <p className="text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 98765 43210
            </p>
            <p className="text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" /> sahayak.health
            </p>
          </div>
        </div>

        <div className="border-t px-10 py-6 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SAHAYAK. All rights reserved.
          </p>
          <div className="flex gap-2">
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
