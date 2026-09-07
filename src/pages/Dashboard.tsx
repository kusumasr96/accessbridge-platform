import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Bot,
  Briefcase,
  BookOpen,
  AlertTriangle,
  Calendar,
  Settings,
  LogOut,
  Home,
  Heart,
  Clock,
  Star,
  ArrowRight,
  Accessibility,
} from "lucide-react";

const quickAccess = [
  {
    icon: MapPin,
    title: "Find Accessible Places",
    description: "Search for wheelchair-friendly, sensory-friendly and accessible locations near you.",
    href: "/#places",
    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Bot,
    title: "Ask AccessAI",
    description: "Get instant answers about accessibility, travel tips and assistive technology.",
    href: "/#accessai",
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Briefcase,
    title: "Opportunities",
    description: "Browse inclusive jobs, scholarships and training programs.",
    href: "/#opportunities",
    color: "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Explore guides on disability awareness, rights and assistive technology.",
    href: "/#resources",
    color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
  },
  {
    icon: AlertTriangle,
    title: "Report a Barrier",
    description: "Help improve accessibility by reporting barriers in your community.",
    href: "/#barrier-report",
    color: "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400",
  },
  {
    icon: Calendar,
    title: "Plan My Day",
    description: "Create a personalised accessible day plan with step-by-step guidance.",
    href: "/#dayplanner",
    color: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400",
  },
];

const savedPlaces = [
  {
    name: "CityCare Hospital",
    type: "Hospital",
    location: "Downtown",
    score: 4.5,
    features: ["Wheelchair ramp", "Braille signage", "Audio announcements"],
  },
  {
    name: "FreshTable Restaurant",
    type: "Restaurant",
    location: "City Center",
    score: 4.7,
    features: ["Step-free entrance", "Braille menu", "Guide-dog friendly"],
  },
  {
    name: "Greenfield College",
    type: "College",
    location: "University District",
    score: 4.2,
    features: ["Ramp access", "Assistive tech lab", "Sign-language interpreters"],
  },
];

const recentActivity = [
  {
    action: "Searched for accessible hospitals",
    time: "2 hours ago",
    icon: MapPin,
  },
  {
    action: "Viewed FreshTable Restaurant details",
    time: "Yesterday",
    icon: Star,
  },
  {
    action: "Read Assistive Technology guide",
    time: "2 days ago",
    icon: BookOpen,
  },
  {
    action: "Submitted a barrier report",
    time: "3 days ago",
    icon: AlertTriangle,
  },
];

const tips = [
  "Use Blind Access Mode from the homepage for a voice-first experience with step-by-step guides.",
  "Check the accessibility score before visiting a new place — it includes details for visual, hearing and mobility needs.",
  "The Day Planner can help you map out an accessible trip with transport, dining and emergency info.",
  "Report barriers you encounter — community reports help improve locations for everyone.",
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tipIndex] = useState(() => Math.floor(Math.random() * tips.length));

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavigate = (href: string) => {
    if (href.startsWith("/#")) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="flex items-center gap-2 font-bold text-lg text-foreground"
                aria-label="AccessBridge - Back to home"
              >
                <Accessibility className="w-6 h-6 text-primary" aria-hidden="true" />
                <span>AccessBridge</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.name || user?.email || "User"}
              </span>
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Go to landing page"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Your accessible world is ready. What would you like to do today?
          </p>
        </motion.div>

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/10"
          role="note"
          aria-label="Daily accessibility tip"
        >
          <p className="text-sm font-medium text-primary mb-1">💡 Daily Tip</p>
          <p className="text-sm text-foreground leading-relaxed">{tips[tipIndex]}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Access */}
            <section aria-labelledby="quick-access-heading">
              <h2
                id="quick-access-heading"
                className="text-xl font-semibold text-foreground mb-4"
              >
                Quick Access
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickAccess.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => handleNavigate(item.href)}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left group"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Saved Places */}
            <section aria-labelledby="saved-heading">
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="saved-heading"
                  className="text-xl font-semibold text-foreground"
                >
                  Saved Places
                </h2>
                <button
                  onClick={() => navigate("/#places")}
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
              <div className="space-y-3">
                {savedPlaces.map((place, i) => (
                  <motion.div
                    key={place.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {place.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {place.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          {place.location}
                        </p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                          <span className="text-sm font-medium text-foreground">
                            {place.score}/5
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            Accessibility
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {place.features.map((f) => (
                            <span
                              key={f}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-xs font-medium"
                            >
                              <span aria-hidden="true">✓</span>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Heart
                        className="w-5 h-5 text-primary shrink-0"
                        aria-label={`Saved: ${place.name}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <section aria-labelledby="activity-heading">
              <h2
                id="activity-heading"
                className="text-lg font-semibold text-foreground mb-4"
              >
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-snug">
                          {item.action}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {item.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Quick Links */}
            <section aria-labelledby="links-heading">
              <h2
                id="links-heading"
                className="text-lg font-semibold text-foreground mb-4"
              >
                Quick Links
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left"
                >
                  <Home className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">
                    Back to Landing Page
                  </span>
                </button>
                <button
                  onClick={() => navigate("/#accessai")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left"
                >
                  <Bot className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">
                    Ask AccessAI
                  </span>
                </button>
                <button
                  onClick={() => navigate("/#resources")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left"
                >
                  <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">
                    Browse Resources
                  </span>
                </button>
                <button
                  onClick={() => navigate("/#about")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">
                    About AccessBridge
                  </span>
                </button>
              </div>
            </section>

            {/* Accessibility Note */}
            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Note:</strong> This dashboard
                demonstrates the authenticated experience. In a production version,
                saved places and activity would be stored per user via Convex.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
