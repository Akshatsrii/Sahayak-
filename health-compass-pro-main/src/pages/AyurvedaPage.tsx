import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  Send,
  Bot,
  User,
  Sparkles,
  Heart,
  Loader2,
  Star,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getAyurvedaResponse } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "🙏 Namaste! I am your Ayurveda AI guide. Ask me about Kadha, herbs, digestion, immunity, stress relief, or lifestyle tips.",
  },
];

export default function AyurvedaPage() {
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
      const response = await getAyurvedaResponse([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch {
      toast({
        title: "Error",
        description: "Unable to fetch response.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-12 animate-in fade-in duration-700">

        {/* HERO */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
          <img
            src="/images/ayurveda-hero.png"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
          <div className="relative bg-gradient-to-r from-black/90 via-black/60 to-transparent p-12 sm:p-20">
            <Badge className="mb-5 bg-green-500/20 text-green-300 border border-green-400/30">
              <Leaf className="w-3 h-3 mr-1" /> Ancient Indian Wellness
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
              Ayurveda & <span className="text-green-400">Natural Healing</span>
            </h1>
            <p className="mt-5 max-w-2xl text-white/80 text-lg">
              Experience personalized Ayurvedic guidance powered by AI, rooted in
              centuries-old Indian wisdom for mind, body, and soul.
            </p>
          </div>
        </div>

        {/* CHATBOT – INCREASED SIZE */}
        <Card className="shadow-2xl border-2 border-primary/10 rounded-3xl min-h-[700px] sm:min-h-[800px] xl:min-h-[900px] flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Ayurveda AI Guide</CardTitle>
                <CardDescription>Holistic • Natural • Safe</CardDescription>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-700">
                <Zap className="w-3 h-3 mr-1" /> Active
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6 flex flex-col flex-1">
            {/* MESSAGE AREA – BIGGER */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[520px] sm:max-h-[600px] xl:max-h-[680px] scrollbar-thin scrollbar-thumb-green-200">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" && "flex-row-reverse"}`}>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
                      m.role === "assistant"
                        ? "bg-gradient-to-br from-green-600 to-emerald-700"
                        : "bg-gradient-to-br from-primary to-info"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md max-w-[75%] ${
                      m.role === "assistant"
                        ? "bg-green-50 border border-green-200"
                        : "bg-gradient-to-br from-primary to-info text-primary-foreground"
                    }`}
                  >
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-green-50 px-4 py-3 rounded-2xl border border-green-200">
                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                  </div>
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="flex gap-3 pt-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about herbs, kadha, digestion, immunity..."
                className="rounded-xl shadow-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 hover:scale-105 transition-all shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER (UNCHANGED, YOUR VERSION) */}
        {/* ... footer remains same as you provided ... */}
         {/* FOOTER */}
      <footer className="border-t bg-card/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  SAHAYAK
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                AI-powered health monitoring for students and institutes.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-1.5 text-xs">
                <a href="mailto:contact@sahayak.com" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-3 h-3" />
                  contact@sahayak.com
                </a>
                <a href="tel:+911234567890" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-3 h-3" />
                  +91 123 456 7890
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Product</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="/institute" className="text-muted-foreground hover:text-primary transition-colors">For Institutes</a></li>
                <li><a href="/api" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Resources</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
                <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                <li><a href="/hipaa" className="text-muted-foreground hover:text-primary transition-colors">HIPAA</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} SAHAYAK. Made with{" "}
              <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> in India
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-accent hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-accent hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-accent hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-500 hover:text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-accent hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-accent hover:bg-red-600 hover:text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-accent hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 flex items-center justify-center transition-all hover:scale-110"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>


      </div>
    </DashboardLayout>
  );
}
