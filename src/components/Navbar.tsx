import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings, Accessibility } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#explore" },
  { label: "AccessAI", href: "#accessai" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Resources", href: "#resources" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#about" },
];

interface NavbarProps {
  onOpenSettings: () => void;
}

export default function Navbar({ onOpenSettings }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  // Trap focus inside mobile menu
  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="flex items-center gap-2.5 font-bold text-xl text-foreground shrink-0"
              aria-label="AccessBridge - Home"
            >
              <Accessibility className="w-7 h-7 text-primary" aria-hidden="true" />
              <span>AccessBridge</span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Open accessibility settings"
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </button>
              <a
                href="#accessai"
                onClick={(e) => { e.preventDefault(); handleNavClick("#accessai"); }}
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Open accessibility settings"
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                ref={triggerRef}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden"
              role="dialog"
              aria-label="Navigation menu"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 border-t border-border">
                  <a
                    href="#accessai"
                    onClick={(e) => { e.preventDefault(); handleNavClick("#accessai"); }}
                    className="block text-center px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
