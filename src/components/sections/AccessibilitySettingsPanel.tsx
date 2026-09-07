import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Keyboard } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AccessibilitySettingsPanel({ open, onClose }: Props) {
  const {
    fontSize, contrast, theme, motion: motionPref, readAloud, simpleLanguage,
    setFontSize, setContrast, setTheme, setMotion, toggleReadAloud, toggleSimpleLanguage,
  } = useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape & focus trap
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    // Focus first control
    setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("button, input");
      first?.focus();
    }, 100);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleReadAloud = useCallback(() => {
    if (readAloud) {
      window.speechSynthesis?.cancel();
    } else {
      const main = document.getElementById("main-content");
      if (main) {
        const utter = new SpeechSynthesisUtterance(main.innerText.slice(0, 5000));
        window.speechSynthesis?.speak(utter);
      }
    }
    toggleReadAloud();
  }, [readAloud, toggleReadAloud]);

  const fontSizes = [
    { label: "A−", value: "sm" as const, size: "Small text" },
    { label: "A", value: "base" as const, size: "Normal text" },
    { label: "A+", value: "lg" as const, size: "Large text" },
    { label: "A++", value: "xl" as const, size: "Extra large text" },
  ];

  const contrastModes = [
    { label: "Normal", value: "normal" as const },
    { label: "High Contrast", value: "high" as const },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-settings-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 overflow-y-auto shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2
                  id="a11y-settings-title"
                  className="text-xl font-bold text-foreground"
                >
                  Accessibility Settings
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Close accessibility settings"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Text Size */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Text Size
                </h3>
                <div className="flex gap-2" role="radiogroup" aria-label="Text size">
                  {fontSizes.map((fs) => (
                    <button
                      key={fs.value}
                      onClick={() => setFontSize(fs.value)}
                      role="radio"
                      aria-checked={fontSize === fs.value}
                      aria-label={fs.size}
                      className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-colors ${
                        fontSize === fs.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {fs.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contrast */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Contrast
                </h3>
                <div className="flex gap-2" role="radiogroup" aria-label="Contrast mode">
                  {contrastModes.map((cm) => (
                    <button
                      key={cm.value}
                      onClick={() => setContrast(cm.value)}
                      role="radio"
                      aria-checked={contrast === cm.value}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        contrast === cm.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {cm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Motion
                </h3>
                <div className="flex gap-2" role="radiogroup" aria-label="Motion preference">
                  <button
                    onClick={() => setMotion("normal")}
                    role="radio"
                    aria-checked={motionPref === "normal"}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      motionPref === "normal"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setMotion("reduce")}
                    role="radio"
                    aria-checked={motionPref === "reduce"}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      motionPref === "reduce"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    Reduce Motion
                  </button>
                </div>
              </div>

              {/* Reading */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Reading
                </h3>
                <button
                  onClick={handleReadAloud}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-colors bg-secondary text-secondary-foreground hover:bg-accent flex items-center justify-center gap-2"
                  aria-label={readAloud ? "Stop reading aloud" : "Read page content aloud"}
                  aria-pressed={readAloud}
                >
                  {readAloud ? (
                    <>
                      <VolumeX className="w-4 h-4" aria-hidden="true" />
                      Stop Reading
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                      Read Aloud
                    </>
                  )}
                </button>
              </div>

              {/* Display */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Display
                </h3>
                <div className="flex gap-2" role="radiogroup" aria-label="Display theme">
                  <button
                    onClick={() => setTheme("light")}
                    role="radio"
                    aria-checked={theme === "light"}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      theme === "light"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    role="radio"
                    aria-checked={theme === "dark"}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      theme === "dark"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>

              {/* Simple Language */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Language
                </h3>
                <button
                  onClick={toggleSimpleLanguage}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                    simpleLanguage
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                  aria-pressed={simpleLanguage}
                  aria-label={simpleLanguage ? "Disable simple language mode" : "Enable simple language mode"}
                >
                  {simpleLanguage ? "✓ " : ""}Simple Language Mode
                </button>
              </div>

              {/* Keyboard Guide */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2 font-medium text-foreground">
                    <Keyboard className="w-4 h-4" aria-hidden="true" />
                    Keyboard Navigation Guide
                  </p>
                  <p><kbd className="px-1.5 py-0.5 rounded bg-background border text-xs">Tab</kbd> Move to next element</p>
                  <p><kbd className="px-1.5 py-0.5 rounded bg-background border text-xs">Shift+Tab</kbd> Move to previous element</p>
                  <p><kbd className="px-1.5 py-0.5 rounded bg-background border text-xs">Enter</kbd> Activate button or link</p>
                  <p><kbd className="px-1.5 py-0.5 rounded bg-background border text-xs">Escape</kbd> Close dialogs</p>
                  <p><kbd className="px-1.5 py-0.5 rounded bg-background border text-xs">Space</kbd> Toggle buttons</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
