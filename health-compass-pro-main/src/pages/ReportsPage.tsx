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
  BarChart3,
  TrendingUp,
  Activity,
  Brain,
  Download,
  Calendar,
  Heart,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Jul", score: 78 },
  { month: "Aug", score: 82 },
  { month: "Sep", score: 85 },
  { month: "Oct", score: 80 },
  { month: "Nov", score: 88 },
  { month: "Dec", score: 92 },
];

const riskBreakdown = [
  { name: "Low Risk", value: 85, color: "hsl(158, 60%, 45%)" },
  { name: "Medium Risk", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "High Risk", value: 3, color: "hsl(12, 76%, 61%)" },
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered health insights and trends
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "Health Score", value: "92", trend: "+8%", icon: Activity },
            { label: "Assessments", value: "24", trend: "+12", icon: Brain },
            { label: "Consultations", value: "8", trend: "+3", icon: Calendar },
            { label: "Risk Level", value: "Low", trend: "Stable", icon: TrendingUp },
          ].map((stat, i) => (
            <Card key={i} variant="premium">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <Badge variant="success">{stat.trend}</Badge>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card variant="premium" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Health Score Trend</CardTitle>
              <CardDescription>
                6-month wellness score progression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient
                        id="colorScore"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(174, 58%, 42%)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(174, 58%, 42%)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(214, 20%, 90%)"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(215, 15%, 50%)"
                      fontSize={12}
                    />
                    <YAxis
                      domain={[60, 100]}
                      stroke="hsl(215, 15%, 50%)"
                      fontSize={12}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(174, 58%, 42%)"
                      strokeWidth={3}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card variant="premium">
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>
                Assessment outcomes breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                    >
                      {riskBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 mt-4">
                {riskBreakdown.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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
              AI-powered health analytics and reporting platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Reports</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Health Trends</li>
              <li>Risk Analysis</li>
              <li>Monthly Reports</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Data Security</li>
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
