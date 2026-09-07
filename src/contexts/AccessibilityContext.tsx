import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type FontSize = "sm" | "base" | "lg" | "xl";
type Contrast = "normal" | "high";
type Theme = "light" | "dark";
type Motion = "normal" | "reduce";

interface AccessibilitySettings {
  fontSize: FontSize;
  contrast: Contrast;
  theme: Theme;
  motion: Motion;
  readAloud: boolean;
  simpleLanguage: boolean;
  blindAccessMode: boolean;
  setFontSize: (size: FontSize) => void;
  setContrast: (c: Contrast) => void;
  setTheme: (t: Theme) => void;
  setMotion: (m: Motion) => void;
  toggleReadAloud: () => void;
  toggleSimpleLanguage: () => void;
  toggleBlindAccessMode: () => void;
}

const AccessibilityContext = createContext<AccessibilitySettings | null>(null);

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [contrast, setContrast] = useState<Contrast>("normal");
  const [theme, setTheme] = useState<Theme>("light");
  const [motion, setMotion] = useState<Motion>("normal");
  const [readAloud, setReadAloud] = useState(false);
  const [simpleLanguage, setSimpleLanguage] = useState(false);
  const [blindAccessMode, setBlindAccessMode] = useState(false);

  const toggleReadAloud = useCallback(() => setReadAloud((p) => !p), []);
  const toggleSimpleLanguage = useCallback(() => setSimpleLanguage((p) => !p), []);
  const toggleBlindAccessMode = useCallback(() => setBlindAccessMode((p) => !p), []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Apply contrast
  useEffect(() => {
    const root = document.documentElement;
    if (contrast === "high") {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  }, [contrast]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-size-sm", "font-size-base", "font-size-lg", "font-size-xl");
    root.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement;
    if (motion === "reduce") {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [motion]);

  // Respect prefers-reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setMotion("reduce");
  }, []);

  // Respect prefers-color-scheme on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.matches) setTheme("dark");
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize, contrast, theme, motion, readAloud, simpleLanguage, blindAccessMode,
        setFontSize, setContrast, setTheme, setMotion, toggleReadAloud, toggleSimpleLanguage, toggleBlindAccessMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
