import { motion } from "framer-motion";
import { ArrowRight, Bot, Eye, Accessibility } from "lucide-react";

interface HeroProps {
  onEnterBlindMode: () => void;
}

export default function Hero({ onEnterBlindMode }: HeroProps) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Accessibility className="w-4 h-4" aria-hidden="true" />
              Digital Accessibility Platform
            </div>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight"
            >
              A more accessible world{" "}
              <span className="text-primary">starts here.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Discover accessible places, resources, opportunities and assistive
              technology — designed with inclusion in mind.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#explore"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
              >
                Explore Accessibility
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="#accessai"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#accessai")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-base hover:bg-accent transition-colors"
              >
                <Bot className="w-5 h-5" aria-hidden="true" />
                Ask AccessAI
              </a>
            </div>
            <div className="mt-6">
              <button
                onClick={onEnterBlindMode}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-base hover:bg-primary/10 transition-colors"
                aria-label="Enter Blind Access Mode for a simplified, screen-reader-friendly interface"
              >
                <Eye className="w-5 h-5" aria-hidden="true" />
                Enter Blind Access Mode
              </button>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md" role="img" aria-label="Illustration of diverse people with different abilities using technology independently to access information and navigate the world">
              {/* Accessibility icons floating around */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl" aria-hidden="true">🦯</div>
                <div className="absolute top-1/4 right-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl" aria-hidden="true">♿</div>
                <div className="absolute bottom-1/4 left-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl" aria-hidden="true">👂</div>
                <div className="absolute bottom-0 right-1/4 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl" aria-hidden="true">🧠</div>
              </div>
              {/* Central illustration */}
              <div className="relative z-10 bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-12 text-center">
                <div className="text-8xl mb-4" aria-hidden="true">🌐</div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-background/80 rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl" aria-hidden="true">🗣️</div>
                    <div className="text-xs text-muted-foreground mt-1">Voice</div>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl" aria-hidden="true">📍</div>
                    <div className="text-xs text-muted-foreground mt-1">Places</div>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl" aria-hidden="true">🤖</div>
                    <div className="text-xs text-muted-foreground mt-1">AI</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
