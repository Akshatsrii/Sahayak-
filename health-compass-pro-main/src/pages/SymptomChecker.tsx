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
import {
  Brain,
  Send,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Stethoscope,
  ArrowRight,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Shield,
  Loader2,
  Heart,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { getHealthResponse } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hello! I'm your AI health assistant powered by advanced AI. I can help you understand your symptoms and provide health guidance. Please describe how you're feeling today. Remember, I provide guidance only – this is not a medical diagnosis.",
  },
];

const suggestedSymptoms = [
  "I have a headache",
  "Feeling tired",
  "Stomach pain",
  "Can't sleep",
];

export default function SymptomChecker() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await getHealthResponse([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const startNew = () => setMessages(initialMessages);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 px-2 sm:px-0">
        {/* HERO */}
        <div className="relative rounded-3xl overflow-hidden min-h-[220px] shadow-2xl group">
          <img
            src="/images/symptom-checker-header.png"
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            alt="Symptom Checker"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 z-20">
            <div className="text-white space-y-3 max-w-xl">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Brain className="w-3 h-3 mr-1" /> AI Health Assistant
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Symptom <span className="text-blue-400">Checker</span>
              </h1>
              <p className="text-white/80">
                Describe symptoms for instant AI-based health guidance.
              </p>
              {messages.length > 1 && (
                <Button
                  variant="outline"
                  onClick={startNew}
                  className="gap-2 bg-white/10 text-white border-white/20"
                >
                  <RefreshCw className="w-4 h-4" /> New Assessment
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <Card className="bg-accent/50 border-accent">
          <CardContent className="py-4 flex gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This AI provides guidance only. Always consult a doctor for medical concerns.
            </p>
          </CardContent>
        </Card>

        {/* CHAT */}
        <Card variant="premium" className="min-h-[480px] flex flex-col">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" && "flex-row-reverse"}`}>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      m.role === "assistant"
                        ? "bg-gradient-to-br from-primary to-info"
                        : "bg-secondary"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                      m.role === "assistant"
                        ? "bg-accent/50"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-accent/50 px-4 py-3 rounded-2xl">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestedSymptoms.map((s, i) => (
                  <Button key={i} variant="outline" size="sm" onClick={() => setInput(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/ayurveda">
            <Card variant="interactive">
              <CardContent className="p-4 flex gap-3 items-center">
                <Sparkles className="w-6 h-6 text-green-500" />
                <span className="font-semibold">Ayurveda Guide</span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/consultations">
            <Card variant="interactive">
              <CardContent className="p-4 flex gap-3 items-center">
                <Stethoscope className="w-6 h-6 text-primary" />
                <span className="font-semibold">Book Doctor</span>
              </CardContent>
            </Card>
          </Link>
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
              AI-powered health guidance with privacy-first design.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>AI Symptom Checker</li>
              <li>Ayurveda Guidance</li>
              <li>Doctor Consultations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Medical Disclaimer</li>
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
              <Icon key={i} className="w-4 h-4 text-muted-foreground hover:text-primary" />
            ))}
          </div>
        </div>
      </footer>
      {/* =============== END FOOTER =============== */}
    </DashboardLayout>
  );
}
