import { DashboardLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Calendar,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Heart,
  Clock,
  ArrowRight,
  FileText,
  Stethoscope,
  Brain,
  Sparkles,
  Target,
  Zap,
  Award,
  Bell,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  Flame,
  Droplets,
  Moon,
  Sun,
  Wind,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { useUser } from "@clerk/clerk-react";

/* ---------------- DATA ---------------- */

const healthData = [
  { day: "Mon", score: 85, steps: 8200 },
  { day: "Tue", score: 82, steps: 7500 },
  { day: "Wed", score: 88, steps: 9100 },
  { day: "Thu", score: 75, steps: 6800 },
  { day: "Fri", score: 90, steps: 10200 },
  { day: "Sat", score: 87, steps: 9500 },
  { day: "Sun", score: 92, steps: 11000 },
];

const vitalStats = [
  { name: "Heart Rate", value: 72, unit: "bpm", status: "normal", icon: Heart, color: "#ef4444" },
  { name: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", icon: Activity, color: "#3b82f6" },
  { name: "Oxygen", value: 98, unit: "%", status: "excellent", icon: Wind, color: "#10b981" },
  { name: "Hydration", value: 85, unit: "%", status: "good", icon: Droplets, color: "#06b6d4" },
];

const healthMetrics = [
  { subject: "Sleep", score: 85, fullMark: 100 },
  { subject: "Activity", score: 90, fullMark: 100 },
  { subject: "Nutrition", score: 75, fullMark: 100 },
  { subject: "Mental", score: 80, fullMark: 100 },
  { subject: "Hydration", score: 85, fullMark: 100 },
];

const wellnessScore = [
  { name: "Current", value: 92, fill: "#3b82f6" },
  { name: "Remaining", value: 8, fill: "#e5e7eb" },
];

const recentActivity = [
  {
    type: "assessment",
    title: "AI Health Check Completed",
    description: "Risk level: Low",
    time: "2 hours ago",
    icon: Brain,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    type: "consultation",
    title: "Dr. Sarah Chen",
    description: "Video consultation scheduled",
    time: "Yesterday",
    icon: Stethoscope,
    iconBg: "bg-info/10 text-info",
  },
  {
    type: "report",
    title: "Monthly Health Report",
    description: "December 2025 report ready",
    time: "3 days ago",
    icon: FileText,
    iconBg: "bg-success/10 text-success",
  },
  {
    type: "achievement",
    title: "7-Day Streak!",
    description: "You've logged your health for 7 days",
    time: "1 week ago",
    icon: Award,
    iconBg: "bg-warning/10 text-warning",
  },
];

const insights = [
  {
    title: "Sleep Pattern",
    description: "Your sleep quality has improved by 15% this week",
    trend: "+15%",
    positive: true,
    icon: Moon,
  },
  {
    title: "Stress Level",
    description: "Exam period detected - consider relaxation exercises",
    trend: "Moderate",
    positive: false,
    icon: Brain,
  },
  {
    title: "Activity Score",
    description: "You're 20% more active than last month",
    trend: "+20%",
    positive: true,
    icon: Activity,
  },
  {
    title: "Hydration Goal",
    description: "You've reached 85% of your daily water intake",
    trend: "85%",
    positive: true,
    icon: Droplets,
  },
];

const quickActions = [
  {
    title: "Symptom Checker",
    description: "AI-powered health assessment",
    icon: Brain,
    link: "/symptom-checker",
    color: "primary",
  },
  {
    title: "Book Doctor",
    description: "Schedule a consultation",
    icon: Stethoscope,
    link: "/doctors",
    color: "info",
  },
  {
    title: "Health Records",
    description: "View your medical history",
    icon: FileText,
    link: "/records",
    color: "success",
  },
  {
    title: "Medications",
    description: "Track your prescriptions",
    icon: Target,
    link: "/medications",
    color: "warning",
  },
];

const upcomingAppointments = [
  {
    doctor: "Dr. Sarah Chen",
    specialty: "General Physician",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "Video Call",
  },
  {
    doctor: "Dr. Michael Roberts",
    specialty: "Cardiologist",
    date: "Jan 10, 2026",
    time: "2:30 PM",
    type: "In-Person",
  },
];

const achievements = [
  { title: "7-Day Streak", description: "Health check completed", icon: Flame, earned: true },
  { title: "Early Bird", description: "5 morning check-ins", icon: Sun, earned: true },
  { title: "Wellness Warrior", description: "30-day health tracking", icon: Shield, earned: false },
  { title: "Health Champion", description: "90 days consistency", icon: Award, earned: false },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

/* ---------------- COMPONENT ---------------- */

export default function StudentDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;

  const userName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8">
        {/* Welcome Banner - Enhanced */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          <div className="absolute inset-0">
            <img
              src="/images/dashboard-header-v3.png"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Dashboard Header"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-info/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <Badge
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-2 hover:bg-white/20 transition-colors duration-300 animate-fadeIn"
              >
                <Sparkles className="w-3 h-3 mr-1 animate-pulse" /> Daily Overview
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white animate-fadeInUp">
                {getGreeting()},{" "}
                <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  {userName}
                </span>
                ! 👋
              </h1>

              <p className="text-lg text-white/90 font-medium animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                Your wellness journey is on track. Check your latest insights below.
              </p>

              {/* Quick Stats in Banner */}
              <div className="flex flex-wrap gap-4 pt-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">92% Health Score</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Flame className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">7-Day Streak</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Activity className="w-4 h-4 text-info" />
                  <span className="text-sm font-medium">8,500 Steps Today</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Link to="/symptom-checker">
                <Button variant="hero" className="gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                  <MessageSquare className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Start Health Check
                </Button>
              </Link>
              <Link to="/emergency">
                <Button variant="emergency" className="gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  <AlertTriangle className="w-4 h-4 group-hover:animate-bounce" />
                  Emergency
                  <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Health Status Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="health" className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fadeInUp border-2 border-transparent hover:border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Heart className="w-6 h-6 text-success group-hover:animate-pulse" />
                </div>
                <Badge variant="health-low" className="group-hover:scale-110 transition-transform duration-300">Low Risk</Badge>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-success transition-colors duration-300">Excellent</h3>
              <p className="text-sm text-muted-foreground">Current Health Status</p>
              <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-success rounded-full animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card variant="health" className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fadeInUp border-2 border-transparent hover:border-primary/20" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Brain className="w-6 h-6 text-primary group-hover:animate-pulse" />
                </div>
                <Badge variant="success" className="group-hover:scale-110 transition-transform duration-300">92/100</Badge>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Jan 1</h3>
              <p className="text-sm text-muted-foreground">Last AI Assessment</p>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-1 h-1 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="health" className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fadeInUp border-2 border-transparent hover:border-info/20" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Calendar className="w-6 h-6 text-info group-hover:animate-pulse" />
                </div>
                <Badge variant="info" className="group-hover:scale-110 transition-transform duration-300">Tomorrow</Badge>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-info transition-colors duration-300">Dr. Chen</h3>
              <p className="text-sm text-muted-foreground">Next Consultation</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>10:00 AM - Video Call</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="emergency" className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fadeInUp hover:shadow-2xl hover:shadow-destructive/20" style={{ animationDelay: '0.3s' }}>
            <Link to="/emergency">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <AlertTriangle className="w-6 h-6 text-destructive group-hover:animate-bounce" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-destructive group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-destructive">Emergency</h3>
                <p className="text-sm text-muted-foreground">One-tap access</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  <span className="text-xs text-destructive">24/7 Available</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Vital Stats Section - New */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitalStats.map((vital, i) => (
            <Card key={i} className="group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <vital.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" style={{ color: vital.color }} />
                  <Badge variant="outline" className="text-xs">{vital.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{vital.name}</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{vital.value}</h3>
                  <span className="text-xs text-muted-foreground">{vital.unit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Score Chart - Enhanced */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Health Score Trend
                    </CardTitle>
                    <CardDescription>Your weekly health performance</CardDescription>
                  </div>
                  <Badge variant="success" className="group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={healthData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="url(#colorScore)" 
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Steps Chart - New */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-info" />
                      Daily Steps
                    </CardTitle>
                    <CardDescription>Track your physical activity</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-info">8,500</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="steps" 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      dot={{ fill: "#06b6d4", r: 4 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Actions Grid - Enhanced */}
            <Card className="animate-fadeInUp">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Access your most used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, i) => (
                    <Link key={i} to={action.link}>
                      <Card className={`group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-${action.color}/20`}>
                        <CardContent className="pt-4 pb-4">
                          <div className={`w-10 h-10 rounded-xl bg-${action.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <action.icon className={`w-5 h-5 text-${action.color}`} />
                          </div>
                          <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors duration-300">{action.title}</h4>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Insights */}
          <div className="space-y-6">
            {/* Wellness Score Gauge - New */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Wellness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#3b82f6"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.92)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-primary">92</span>
                      <span className="text-xs text-muted-foreground">/ 100</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Excellent health status! Keep up the great work.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity - Enhanced */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-3 rounded-xl hover:bg-muted/50 transition-colors duration-300 cursor-pointer group/item animate-fadeInUp"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className={`w-10 h-10 rounded-xl ${activity.iconBg} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate group-hover/item:text-primary transition-colors duration-300">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments - New */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-info" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((apt, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-border hover:border-info/50 hover:bg-info/5 transition-all duration-300 cursor-pointer group/apt"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm group-hover/apt:text-info transition-colors duration-300">{apt.doctor}</p>
                          <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{apt.type}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Insights - Enhanced */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-warning" />
                  Health Insights
                </CardTitle>
                <CardDescription>AI-powered recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.map((insight, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer group/insight hover:scale-[1.02] animate-fadeInUp ${
                        insight.positive
                          ? "border-success/20 hover:bg-success/5 hover:border-success/40"
                          : "border-warning/20 hover:bg-warning/5 hover:border-warning/40"
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/insight:scale-110 group-hover/insight:rotate-6 transition-all duration-300 ${
                          insight.positive ? "bg-success/10" : "bg-warning/10"
                        }`}>
                          <insight.icon className={`w-4 h-4 ${insight.positive ? "text-success" : "text-warning"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{insight.title}</p>
                            <Badge
                              variant={insight.positive ? "success" : "warning"}
                              className="text-xs group-hover/insight:scale-110 transition-transform duration-300"
                            >
                              {insight.trend}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements - New */}
            <Card className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Achievements
                </CardTitle>
                <CardDescription>Your health milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer group/badge hover:scale-105 ${
                        achievement.earned
                          ? "border-warning/40 bg-warning/5"
                          : "border-muted bg-muted/5 opacity-50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center group-hover/badge:scale-110 group-hover/badge:rotate-12 transition-all duration-300 ${
                        achievement.earned ? "bg-warning/20" : "bg-muted"
                      }`}>
                        <achievement.icon className={`w-5 h-5 ${achievement.earned ? "text-warning" : "text-muted-foreground"}`} />
                      </div>
                      <p className="text-xs font-semibold mb-1">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </DashboardLayout>
  );
}