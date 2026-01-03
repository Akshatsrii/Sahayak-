import { DashboardLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Navigation,
  Hospital,
  Pill,
  Shield,
  Heart,
  Zap,
  Thermometer,
  Droplet,
  ChevronDown,
  ChevronUp,
  Video,
  MessageCircle,
  ExternalLink,
  X,
  Brain,
  CheckCircle,
  Activity,
} from "lucide-react";
import { useState } from "react";

const emergencyContacts = [
  { name: "Campus Health Center", phone: "911", type: "primary" },
  { name: "University Police", phone: "555-0123", type: "secondary" },
  { name: "Poison Control", phone: "800-222-1222", type: "secondary" },
];

const nearbyHospitals = [
  {
    name: "University Medical Center",
    distance: "0.8 miles",
    eta: "5 min",
    address: "123 Medical Drive",
    lat: 37.7749,
    lng: -122.4194,
    phone: "555-0100",
    open: true,
  },
  {
    name: "City General Hospital",
    distance: "2.3 miles",
    eta: "12 min",
    address: "456 Health Ave",
    lat: 37.7849,
    lng: -122.4294,
    phone: "555-0200",
    open: true,
  },
  {
    name: "Community Care Clinic",
    distance: "1.5 miles",
    eta: "8 min",
    address: "789 Wellness Blvd",
    lat: 37.7649,
    lng: -122.4094,
    phone: "555-0300",
    open: true,
  },
];

const firstAidGuides = [
  {
    title: "Choking",
    icon: Zap,
    color: "warning",
    severity: "Critical",
    steps: [
      "Stand behind the person and wrap your arms around their waist",
      "Make a fist with one hand and place it above the person's navel",
      "Grasp the fist with your other hand",
      "Perform quick, upward thrusts until the object is dislodged",
      "If person becomes unconscious, call 911 and begin CPR"
    ],
    warnings: "Never perform abdominal thrusts on infants under 1 year old",
    whenToCall: "Call 911 if the person cannot breathe, speak, or cough forcefully",
  },
  {
    title: "Heavy Bleeding",
    icon: Droplet,
    color: "destructive",
    severity: "Critical",
    steps: [
      "Call 911 immediately if bleeding is severe",
      "Apply direct pressure to the wound using a clean cloth or bandage",
      "Maintain firm, continuous pressure for at least 10-15 minutes",
      "If blood soaks through, add more cloth on top without removing the first layer",
      "Elevate the injured area above the heart if possible",
      "Keep the person warm and calm while waiting for help"
    ],
    warnings: "Do not remove objects embedded in the wound. Stabilize them instead.",
    whenToCall: "Call 911 for arterial bleeding, deep wounds, or if bleeding doesn't stop after 15 minutes",
  },
  {
    title: "Allergic Reaction",
    icon: Thermometer,
    color: "destructive",
    severity: "Life-Threatening",
    steps: [
      "Check if the person has an EpiPen (epinephrine auto-injector)",
      "Call 911 immediately if signs of severe reaction (difficulty breathing, swelling)",
      "Help administer EpiPen if available: remove safety cap and press firmly into outer thigh",
      "Keep person lying flat with legs elevated (unless vomiting or having trouble breathing)",
      "Monitor breathing and be prepared to perform CPR if needed",
      "Even if symptoms improve, emergency medical care is still required"
    ],
    warnings: "Anaphylaxis can be fatal within minutes. Always call 911 for severe reactions.",
    whenToCall: "Call 911 immediately for difficulty breathing, swelling of throat/tongue, or loss of consciousness",
  },
  {
    title: "CPR (Cardiopulmonary Resuscitation)",
    icon: Heart,
    color: "destructive",
    severity: "Life-Threatening",
    steps: [
      "Call 911 first or have someone else call",
      "Place person on firm, flat surface",
      "Position yourself beside the person's chest",
      "Place heel of one hand in center of chest, other hand on top",
      "Push hard and fast: 30 chest compressions at rate of 100-120/minute",
      "Give 2 rescue breaths (or continue compressions if untrained)",
      "Repeat 30 compressions and 2 breaths until help arrives"
    ],
    warnings: "Chest compressions should compress chest at least 2 inches deep for adults",
    whenToCall: "Call 911 immediately if person is unresponsive and not breathing normally",
  },
  {
    title: "Seizure",
    icon: Brain,
    color: "warning",
    severity: "Serious",
    steps: [
      "Keep calm and stay with the person",
      "Protect from injury: clear the area of hard or sharp objects",
      "Place something soft under their head",
      "Turn person gently onto their side to keep airway clear",
      "Time the seizure - call 911 if it lasts more than 5 minutes",
      "Do NOT put anything in their mouth or restrain them",
      "Stay with them until they're fully conscious and alert"
    ],
    warnings: "Never restrain the person or put objects in their mouth during a seizure",
    whenToCall: "Call 911 if seizure lasts over 5 minutes, person is injured, pregnant, or it's their first seizure",
  },
  {
    title: "Heart Attack",
    icon: Activity,
    color: "destructive",
    severity: "Life-Threatening",
    steps: [
      "Call 911 immediately - every minute matters",
      "Help person sit down and rest in a comfortable position",
      "If conscious, give aspirin (if not allergic) to chew and swallow",
      "Loosen any tight clothing around neck and chest",
      "Stay calm and reassure the person",
      "If person becomes unconscious and stops breathing, begin CPR",
      "Continue until emergency services arrive"
    ],
    warnings: "Symptoms include chest pain, shortness of breath, nausea, and pain in arms/jaw",
    whenToCall: "Call 911 immediately at first sign of heart attack symptoms",
  },
];

export default function EmergencyPage() {
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [trackingActive, setTrackingActive] = useState(false);

  const handleEmergencyCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (hospital) => {
    // Open in Google Maps
    const query = encodeURIComponent(`${hospital.address}, ${hospital.name}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleTrackAmbulance = () => {
    setTrackingActive(true);
    setShowMap(true);
    // In a real app, this would initiate real-time tracking
  };

  const handleCallDoctor = () => {
    // In a real app, this would open a modal to connect with on-call doctors
    alert("Connecting you with an on-call emergency doctor...");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8">
        {/* Emergency Hero Banner - Enhanced & Responsive */}
        <div className="relative rounded-3xl overflow-hidden min-h-[200px] md:min-h-[220px] shadow-2xl group animate-fadeIn">
          <div className="absolute inset-0 bg-red-950/30 group-hover:bg-red-950/20 transition-colors z-10" />
          <img
            src="/images/emergency-header.png"
            alt="Emergency Response"
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/40 to-transparent flex items-center p-6 md:p-8 z-20">
            <div className="text-white max-w-xl space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-100 text-xs font-medium uppercase tracking-wider mb-2 animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                Immediate Response
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight animate-fadeInUp">
                Emergency <span className="text-red-400">Services</span>
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-md animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                Quick access to first responders, hospitals, and critical care guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Main Emergency Button - Enhanced */}
        <Card variant="emergency" className="max-w-2xl mx-auto group hover:shadow-2xl hover:shadow-destructive/30 transition-all duration-300 animate-fadeInUp">
          <CardContent className="p-6 md:p-8 text-center">
            <Button
              onClick={() => handleEmergencyCall("911")}
              variant="emergency"
              size="xl"
              className="w-full max-w-md h-16 md:h-20 text-lg md:text-xl gap-3 hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn"
            >
              <Phone className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:animate-bounce" />
              Call Emergency Services (911)
              <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Your location will be shared with emergency responders
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Row - New */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeInUp">
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-info/30">
            <CardContent className="p-6 text-center" onClick={handleCallDoctor}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-info/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Video className="w-8 h-8 text-info" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-info transition-colors duration-300">
                Call Emergency Doctor
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Video consultation with on-call physician
              </p>
              <Badge variant="info" className="group-hover:scale-110 transition-transform duration-300">
                Available 24/7
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/30">
            <CardContent className="p-6 text-center" onClick={handleTrackAmbulance}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Navigation className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                Track Ambulance
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Live tracking after calling 911
              </p>
              <Badge variant={trackingActive ? "success" : "outline"} className="group-hover:scale-110 transition-transform duration-300">
                {trackingActive ? "Active" : "Ready"}
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-success/30 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-success transition-colors duration-300">
                Emergency Chat
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Text with emergency medical advisor
              </p>
              <Badge variant="success" className="group-hover:scale-110 transition-transform duration-300">
                Instant Response
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts & Map - Enhanced Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <Card variant="premium" className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Quick access to emergency services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-accent/50 hover:bg-accent transition-all duration-300 cursor-pointer group/contact hover:scale-[1.02]"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-base group-hover/contact:text-primary transition-colors duration-300">
                      {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </p>
                  </div>
                  <Button
                    variant={contact.type === "primary" ? "emergency" : "outline"}
                    size="sm"
                    onClick={() => handleEmergencyCall(contact.phone)}
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Live Ambulance Tracking Map */}
          <Card variant="premium" className="group hover:shadow-xl transition-all duration-300 animate-fadeInUp">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-primary" />
                    Ambulance Tracking
                  </CardTitle>
                  <CardDescription>Track emergency response in real-time</CardDescription>
                </div>
                {trackingActive && (
                  <Badge variant="success" className="animate-pulse">
                    <div className="w-2 h-2 bg-success rounded-full mr-2" />
                    Tracking
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!showMap ? (
                <div className="aspect-video rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center relative overflow-hidden group/map cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  onClick={handleTrackAmbulance}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-info rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="text-center relative z-10">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-3 group-hover/map:scale-110 group-hover/map:animate-bounce transition-transform duration-300" />
                    <p className="text-base font-semibold mb-1">Click to Activate Tracking</p>
                    <p className="text-sm text-muted-foreground">Available after calling 911</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden animate-fadeIn">
                  {/* Interactive Map Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/5 to-info/5 relative">
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
                    
                    {/* Your Location */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative">
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse" />
                        <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-75" />
                      </div>
                      <p className="text-xs font-semibold mt-2 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        Your Location
                      </p>
                    </div>

                    {/* Ambulance Location */}
                    <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse">
                      <div className="relative">
                        <div className="w-8 h-8 bg-destructive rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                          <Navigation className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold mt-2 bg-destructive text-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        Ambulance (2.5 mi)
                      </p>
                    </div>

                    {/* Route Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1="50%"
                        y1="50%"
                        x2="66%"
                        y2="33%"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeDasharray="10,5"
                        className="animate-pulse"
                      />
                    </svg>

                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setShowMap(false);
                        setTrackingActive(false);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tracking Info */}
                  <div className="mt-3 p-3 rounded-xl bg-success/10 border border-success/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                        <div>
                          <p className="text-sm font-semibold text-success">Ambulance En Route</p>
                          <p className="text-xs text-muted-foreground">ETA: 8 minutes</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => window.open('https://www.google.com/maps', '_blank')}>
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Full Map
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {!showMap && (
                <div className="mt-4 p-3 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-success">Location Services Active</p>
                      <p className="text-xs text-muted-foreground">Ready to share with responders</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Nearby Hospitals - Enhanced with Map Integration */}
        <Card variant="premium" className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="w-5 h-5 text-primary" />
              Nearby Hospitals & Clinics
            </CardTitle>
            <CardDescription>Emergency rooms and urgent care centers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyHospitals.map((hospital, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-accent/50 border border-border/50 hover:border-primary/40 hover:bg-accent transition-all duration-300 cursor-pointer group/hospital hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-base group-hover/hospital:text-primary transition-colors duration-300 flex-1">
                      {hospital.name}
                    </h3>
                    <Badge variant="success" className="text-xs whitespace-nowrap ml-2">
                      Open 24/7
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 flex-shrink-0" />
                      <span>{hospital.distance} · {hospital.eta} drive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <button
                        onClick={() => handleEmergencyCall(hospital.phone)}
                        className="text-primary hover:underline"
                      >
                        {hospital.phone}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full hover:scale-105 transition-transform duration-300"
                      onClick={() => handleGetDirections(hospital)}
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Directions
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full hover:scale-105 transition-transform duration-300"
                      onClick={() => handleEmergencyCall(hospital.phone)}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* First Aid Quick Guides - Fully Expandable with Details */}
        <Card variant="premium" className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              First Aid Quick Guides
            </CardTitle>
            <CardDescription>Step-by-step emergency instructions with expert guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {firstAidGuides.map((guide, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-2 transition-all duration-300 ${
                    expandedGuide === index
                      ? 'border-primary/40 shadow-lg col-span-1 md:col-span-2 xl:col-span-3'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer group/guide"
                    onClick={() => setExpandedGuide(expandedGuide === index ? null : index)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-xl bg-${guide.color}/10 flex items-center justify-center group-hover/guide:scale-110 group-hover/guide:rotate-6 transition-all duration-300`}>
                          <guide.icon className={`w-5 h-5 text-${guide.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base group-hover/guide:text-primary transition-colors duration-300">
                            {guide.title}
                          </h4>
                          <Badge variant={guide.color} className="text-xs mt-1">
                            {guide.severity}
                          </Badge>
                        </div>
                      </div>
                      {expandedGuide === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Collapsed View - Quick Steps */}
                    {expandedGuide !== index && (
                      <ol className="space-y-2">
                        {guide.steps.slice(0, 3).map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2 text-sm">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  {/* Expanded View - Full Details */}
                  {expandedGuide === index && (
                    <div className="px-4 pb-4 space-y-4 animate-fadeIn">
                      {/* Detailed Steps */}
                      <div>
                        <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          Step-by-Step Instructions
                        </h5>
                        <ol className="space-y-3">
                          {guide.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors duration-300">
                              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                                {stepIndex + 1}
                              </span>
                              <span className="text-sm leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Warnings */}
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                        <h5 className="font-semibold text-sm mb-2 flex items-center gap-2 text-warning">
                          <AlertTriangle className="w-4 h-4" />
                          Important Warning
                        </h5>
                        <p className="text-sm text-muted-foreground">{guide.warnings}</p>
                      </div>

                      {/* When to Call 911 */}
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                        <h5 className="font-semibold text-sm mb-2 flex items-center gap-2 text-destructive">
                          <Phone className="w-4 h-4" />
                          When to Call 911
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">{guide.whenToCall}</p>
                        <Button
                          variant="emergency"
                          size="sm"
                          className="w-full hover:scale-105 transition-transform duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmergencyCall("911");
                          }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call 911 Now
                        </Button>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:scale-105 transition-transform duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallDoctor();
                          }}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Video Doctor
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:scale-105 transition-transform duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Chat feature coming soon!");
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Ask Expert
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Card className="bg-destructive/5 border-destructive/20 animate-fadeInUp">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive mb-1">Critical Emergency Disclaimer</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This page provides emergency guidance and quick access to medical services. In any life-threatening situation, 
                  <strong className="text-destructive"> always call 911 immediately</strong>. Do not rely solely on this app for emergency response. 
                  The first aid instructions are for reference only and do not replace professional medical training or emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </DashboardLayout>
  );
}