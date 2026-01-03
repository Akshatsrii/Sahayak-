import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Brain,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Lock,
  Activity,
  Heart,
  MessageSquare,
  Sparkles,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Users,
  Award,
  TrendingUp,
  Youtube,
  Github,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Risk Detection",
    description:
      "Advanced machine learning analyzes symptoms to identify potential health risks before they escalate.",
    image: "/images/feature-ai.png",
    details: [
      "Natural language processing understands your symptoms in plain English",
      "Pattern recognition identifies risk factors across thousands of medical conditions",
      "Real-time analysis provides instant health risk classifications",
      "Continuous learning from verified medical databases ensures accuracy"
    ]
  },
  {
    icon: AlertTriangle,
    title: "24/7 Emergency Support",
    description:
      "One-tap ambulance access with live tracking and instant connection to emergency services.",
    image: "/images/feature-emergency.png",
    details: [
      "Instant emergency button connects you to nearest ambulance services",
      "Real-time GPS tracking shows ambulance location and estimated arrival",
      "Automatic sharing of your medical history with emergency responders",
      "Direct hotline to emergency medical coordinators available 24/7"
    ]
  },
  {
    icon: Stethoscope,
    title: "Verified Doctor Network",
    description:
      "Connect with verified healthcare professionals for consultations and expert medical advice.",
    image: "/images/feature-doctor.png",
    details: [
      "All doctors are verified with proper medical licenses and credentials",
      "Wide range of specialties from general physicians to specialists",
      "Instant video consultations or scheduled appointments based on your needs",
      "Secure messaging for follow-up questions and prescription clarifications"
    ]
  },
  {
    icon: Lock,
    title: "Privacy-First Design",
    description:
      "Medical-grade security with end-to-end encryption. Your health data stays yours.",
    image: "/images/feature-privacy.png",
    details: [
      "End-to-end encryption protects all your medical conversations and data",
      "HIPAA compliant infrastructure with regular security audits",
      "You control who sees your data - doctors only access what you approve",
      "Data stored in secure, geographically distributed servers"
    ]
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Describe Your Symptoms",
    description:
      "Use our conversational AI to describe how you're feeling in natural language.",
    icon: MessageSquare,
    details: [
      "Start a conversation just like texting a friend - no medical jargon needed",
      "Our AI asks follow-up questions to understand your symptoms better",
      "Share photos of visible symptoms if relevant for better assessment",
      "Takes only 2-3 minutes to complete a comprehensive symptom check"
    ]
  },
  {
    step: 2,
    title: "AI Risk Assessment",
    description:
      "Our ML models analyze patterns and provide a risk classification with reasoning.",
    icon: Brain,
    details: [
      "Advanced algorithms compare your symptoms against vast medical databases",
      "Receives a clear risk level: Low, Moderate, High, or Critical",
      "Detailed explanation of why you received that risk classification",
      "Suggests possible conditions with confidence percentages"
    ]
  },
  {
    step: 3,
    title: "Get Recommendations",
    description:
      "Receive personalized next steps - from self-care to urgent doctor consultations.",
    icon: Activity,
    details: [
      "Tailored advice based on your specific symptoms and risk level",
      "Self-care tips for minor issues with over-the-counter medication suggestions",
      "Clear guidance on when to see a doctor versus emergency care",
      "Preventive measures to avoid symptom recurrence"
    ]
  },
  {
    step: 4,
    title: "Connect with Doctors",
    description:
      "If needed, book instant video consultations with verified healthcare providers.",
    icon: Stethoscope,
    details: [
      "Browse available doctors by specialty, rating, and availability",
      "Book instant consultations or schedule for a convenient time",
      "Receive prescriptions digitally that you can use at any pharmacy",
      "All consultation history saved for future reference and continuity of care"
    ]
  },
];

const trustIndicators = [
  { value: "50,000+", label: "Students Protected", icon: Users },
  { value: "200+", label: "Verified Doctors", icon: Stethoscope },
  { value: "99.9%", label: "Uptime SLA", icon: TrendingUp },
  { value: "HIPAA", label: "Compliant", icon: Award },
];

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "AI Technology", href: "#ai" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Help Center", href: "/help" },
    { name: "API Documentation", href: "/docs" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "HIPAA Compliance", href: "/hipaa" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m your SAHAYAK assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        role: 'bot', 
        text: 'Thanks for your message! Our team will get back to you soon. For immediate assistance, please sign up to access our full AI-powered health assistant.' 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Enhanced Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s', animationDuration: '8s' }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-info/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '2s', animationDuration: '10s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '1s', animationDuration: '9s' }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-info/8 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '3s', animationDuration: '11s' }}
        ></div>
      </div>

      {/* NAVBAR with scroll effect */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-card/95 backdrop-blur-xl shadow-xl shadow-primary/10' 
            : 'bg-card/80 backdrop-blur-xl shadow-lg shadow-primary/5'
        } border-b border-border/50`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-info rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:to-info bg-clip-text text-transparent transition-all duration-500">
              SAHAYAK 
            </span>
          </div>

          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-info group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300 relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-info group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#trust" className="text-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300 relative group">
              Trust
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-info group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="hover:scale-110 hover:bg-primary/10 transition-all duration-300">
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="hero" className="hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard">
                <Button variant="hero" className="hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* HERO with parallax effect */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div
          className="absolute inset-0 bg-sky-100"
          style={{
            backgroundImage: "url(/images/landing-hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-300/60 via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5 animate-gradient"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <Badge variant="premium" className="mb-6 hover:scale-110 transition-all duration-300 shadow-lg animate-fadeInDown backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
            AI-Powered Healthcare for Students
          </Badge>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fadeInUp leading-tight">
            Your Health,{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-info blur-2xl opacity-40 animate-pulse"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-info to-primary animate-gradient bg-[length:200%_auto]">
                Intelligently Protected
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fadeInUp leading-relaxed" style={{ animationDelay: '0.2s' }}>
            AI-powered symptom analysis, instant emergency response,
            and verified doctor consultations—all in one platform.
          </p>

          <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button variant="hero" size="xl" className="gap-2 hover:scale-110 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Button>
              </SignUpButton>

              <SignInButton mode="modal">
                <Button variant="hero-outline" size="xl" className="hover:scale-110 hover:shadow-xl transition-all duration-300 group">
                  Student Login
                  <Zap className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="hover:scale-110 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 text-sm text-muted-foreground animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="flex gap-2 items-center hover:scale-110 hover:text-success transition-all duration-300 cursor-pointer group">
              <CheckCircle className="w-4 h-4 text-success group-hover:animate-bounce" /> 
              <span>Free for students</span>
            </div>
            <div className="flex gap-2 items-center hover:scale-110 hover:text-success transition-all duration-300 cursor-pointer group">
              <CheckCircle className="w-4 h-4 text-success group-hover:animate-bounce" /> 
              <span>No credit card</span>
            </div>
            <div className="flex gap-2 items-center hover:scale-110 hover:text-success transition-all duration-300 cursor-pointer group">
              <CheckCircle className="w-4 h-4 text-success group-hover:animate-bounce" /> 
              <span>HIPAA compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST with counter animation */}
      <section id="trust" className="relative py-20 bg-card/50 border-y backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustIndicators.map((t, i) => (
            <div 
              key={i} 
              className="text-center group cursor-pointer hover:scale-110 transition-all duration-500 animate-fadeInUp"
              style={{ 
                animationDelay: `${i * 0.1}s`
              }}
            >
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-info blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <t.icon className="relative w-10 h-10 mx-auto text-primary mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              </div>
              <div className="relative inline-block mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-info blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500">
                  {t.value}
                </div>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES with enhanced cards and expandable details */}
      <section id="features" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need for intelligent healthcare management, backed by cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card 
                key={i} 
                variant="premium" 
                className="overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-fadeInUp border-2 border-transparent hover:border-primary/20"
                style={{ 
                  animationDelay: `${i * 0.15}s`
                }}
                onClick={() => setExpandedFeature(expandedFeature === i ? null : i)}
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={f.image} 
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" 
                    alt={f.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-info/0 group-hover:from-primary/10 group-hover:to-info/10 transition-all duration-700"></div>
                  
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl transition-all duration-500">
                    <f.icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
                  </div>
                </div>
                <CardContent className="pt-6 relative">
                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-info group-hover:w-full transition-all duration-700"></div>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                    {f.description}
                  </p>
                  
                  {/* Expandable Details */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedFeature === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-border/50 space-y-2">
                      {f.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2 items-start animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-xs text-primary font-medium mt-3 flex items-center gap-1 hover:gap-2 transition-all duration-300">
                    {expandedFeature === i ? 'Show less' : 'Learn more'} 
                    <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${expandedFeature === i ? 'rotate-90' : ''}`} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS with connection lines and expandable details */}
      <section id="how-it-works" className="relative py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the care you need in four simple steps. Our intelligent system guides you from symptoms to solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-info to-primary opacity-20"></div>
            
            {howItWorks.map((step, i) => (
              <Card 
                key={i}
                variant="premium"
                className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-fadeInUp border-2 border-transparent hover:border-primary/20 relative"
                style={{ 
                  animationDelay: `${i * 0.15}s`
                }}
                onClick={() => setExpandedStep(expandedStep === i ? null : i)}
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-info rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500 scale-110"></div>
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <step.icon className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-white rounded-full w-11 h-11 flex items-center justify-center font-bold text-primary shadow-xl border-2 border-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:border-primary/40">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {step.description}
                  </p>
                  
                  {/* Expandable Details */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedStep === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-border/50 space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2 items-start animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
                    {expandedStep === i ? 'Show less' : 'Learn more'} 
                    <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${expandedStep === i ? 'rotate-90' : ''}`} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with enhanced animation */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5 animate-gradient"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="relative inline-block mb-8 animate-fadeInUp">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-info rounded-full blur-2xl opacity-40 animate-spin-slow"></div>
            <Heart className="relative w-20 h-20 mx-auto text-primary hover:scale-125 hover:rotate-12 transition-all duration-500 cursor-pointer animate-bounce-slow" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp hover:bg-gradient-to-r hover:from-primary hover:to-info hover:bg-clip-text hover:text-transparent transition-all duration-500" style={{ animationDelay: '0.1s' }}>
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-muted-foreground mb-10 text-lg md:text-xl max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Join thousands of students already using SAHAYAK MEDICOS for intelligent healthcare management.
          </p>

          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button variant="hero" size="xl" className="gap-2 hover:scale-110 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Create Free Account 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="hover:scale-110 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
                  Open Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

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

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {chatOpen && (
          <div className="mb-4 w-80 md:w-96 h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col animate-fadeInUp overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-info p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">SAHAYAK Assistant</h3>
                  <p className="text-xs text-white/80">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-accent/20">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-primary to-info text-white' 
                        : 'bg-card border border-border'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  variant="hero"
                  size="icon"
                  className="hover:scale-110 transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-info shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          {chatOpen ? (
            <ArrowRight className="w-6 h-6 text-white rotate-90 relative z-10" />
          ) : (
            <MessageSquare className="w-6 h-6 text-white relative z-10 group-hover:animate-bounce" />
          )}
        </button>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          75% {
            transform: translate(20px, 30px) scale(1.02);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}