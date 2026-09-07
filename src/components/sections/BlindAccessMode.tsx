import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Volume2, Navigation, X } from "lucide-react";

interface BlindAccessModeProps {
  onClose: () => void;
}

export default function BlindAccessMode({ onClose }: BlindAccessModeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) setSpeechSupported(false);
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setRecognitionSupported(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }, [speechSupported]);

  const handleVoiceSearch = useCallback(() => {
    if (!recognitionSupported) {
      setResponse("Voice recognition is not supported in this browser. Please try Chrome or Edge for voice search.");
      speak("Voice recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      if (event.results[0].isFinal) {
        setResponse(`Searching for ${result}. In a full implementation, this would find accessible ${result} near you.`);
        speak(`Searching for ${result}. This is a demo. In a full implementation, this would find accessible ${result} near you.`);
        setIsListening(false);
      }
    };
    recognition.onerror = () => {
      setIsListening(false);
      setResponse("Could not recognize speech. Please try again.");
    };
    recognition.onend = () => setIsListening(false);

    setIsListening(true);
    setTranscript("");
    setResponse("");
    recognition.start();
    speak("Listening. Say what you are looking for.");
  }, [recognitionSupported, speechSupported, speak]);

  const handleReadAloud = useCallback(() => {
    const mainContent = document.getElementById("main-content");
    const text = mainContent?.innerText || "No content to read.";
    speak(text);
    setResponse("Reading page content aloud.");
  }, [speak]);

  const handleVoiceNav = useCallback((command: string) => {
    const sections: Record<string, string> = {
      explore: "#explore",
      jobs: "#opportunities",
      resources: "#resources",
      accessibility: "#accessai",
      home: "#home",
    };
    const target = sections[command.toLowerCase()];
    if (target) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      speak(`Opening ${command}`);
      setResponse(`Navigating to ${command}.`);
    } else {
      speak(`Command not recognized. Say: Open Explore, Find Jobs, Open Resources, Read Accessibility Information, or Go Home.`);
      setResponse(`Say: "Open Explore", "Find Jobs", "Open Resources", "Read Accessibility Information", or "Go Home".`);
    }
  }, [speak]);

  useEffect(() => {
    if (!recognitionSupported) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const last = event.results[event.results.length - 1];
      if (!last.isFinal) return;
      const text = last[0].transcript.toLowerCase().trim();
      if (text.startsWith("open ")) handleVoiceNav(text.replace("open ", ""));
      else if (text.startsWith("find ")) handleVoiceNav(text.replace("find ", ""));
      else if (text.startsWith("go ")) handleVoiceNav(text.replace("go ", ""));
    };
    recognition.onerror = () => {};
    recognitionRef.current = recognition;

    return () => { try { recognition.stop(); } catch { /* */ } };
  }, [recognitionSupported, handleVoiceNav]);

  useEffect(() => {
    speak("Blind Access Mode activated. Use voice search, read aloud, or voice navigation commands.");
    return () => { window.speechSynthesis?.cancel(); };
  }, [speak]);

  return (
    <section
      aria-labelledby="blind-access-heading"
      className="min-h-screen bg-background py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1
              id="blind-access-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Blind Access Mode
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              A simplified interface focused on voice interaction and screen
              readers.
            </p>
          </motion.div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-secondary hover:bg-accent transition-colors"
            aria-label="Exit Blind Access Mode"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-6">
          {/* Voice Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Mic className="w-6 h-6 text-primary" aria-hidden="true" />
              Search by Voice
            </h2>
            <p className="text-muted-foreground mb-6">
              Tap the microphone and say what you need, such as "Find accessible
              hospitals" or "Find restaurants near me."
            </p>
            <button
              onClick={handleVoiceSearch}
              disabled={isListening}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all ${
                isListening
                  ? "bg-destructive text-white animate-pulse"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
              aria-label={isListening ? "Listening for voice input" : "Start voice search"}
              aria-live="polite"
            >
              {isListening ? (
                <MicOff className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Mic className="w-6 h-6" aria-hidden="true" />
              )}
              {isListening ? "Listening..." : "Search by Voice"}
            </button>
            {transcript && (
              <p className="mt-4 text-foreground" aria-live="assertive">
                You said: <strong>{transcript}</strong>
              </p>
            )}
          </motion.div>

          {/* Read Aloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-primary" aria-hidden="true" />
              Read This Page
            </h2>
            <p className="text-muted-foreground mb-6">
              Have the entire page content read aloud using your device's text-to-speech.
            </p>
            <button
              onClick={handleReadAloud}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/90 transition-colors"
              aria-label="Read the entire page content aloud"
            >
              <Volume2 className="w-6 h-6" aria-hidden="true" />
              Read Aloud
            </button>
          </motion.div>

          {/* Voice Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Navigation className="w-6 h-6 text-primary" aria-hidden="true" />
              Voice Navigation
            </h2>
            <p className="text-muted-foreground mb-4">
              Use voice commands to navigate the site. Supported commands:
            </p>
            <ul className="space-y-2 mb-6 text-foreground" role="list">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span>&quot;Open Explore&quot;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span>&quot;Find Jobs&quot;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span>&quot;Open Resources&quot;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span>&quot;Read Accessibility Information&quot;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span>&quot;Go Home&quot;</span>
              </li>
            </ul>
            {!recognitionSupported && (
              <p className="text-sm text-destructive font-medium" role="alert">
                Voice navigation requires a browser with speech recognition
                support (e.g., Chrome or Edge).
              </p>
            )}
            <button
              onClick={() => {
                if (!recognitionSupported) {
                  setResponse("Voice navigation requires Chrome or Edge.");
                  speak("Voice navigation requires Chrome or Edge.");
                  return;
                }
                speak("Voice navigation activated. Say a command.");
                setResponse("Listening for navigation commands...");
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-primary text-primary text-lg font-semibold hover:bg-primary/10 transition-colors"
              aria-label="Activate voice navigation mode"
            >
              <Navigation className="w-6 h-6" aria-hidden="true" />
              Enable Voice Navigation
            </button>
          </motion.div>

          {/* Response */}
          {response && (
            <div
              className="p-6 rounded-2xl bg-primary/10 border border-primary/20"
              role="status"
              aria-live="polite"
            >
              <p className="text-foreground text-lg">{response}</p>
            </div>
          )}

          {/* Info */}
          <div className="p-6 rounded-2xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Note:</strong> Blind Access Mode provides voice interaction
              features and a simplified interface. It does not replace your device's
              screen reader (such as VoiceOver, TalkBack, or NVDA). The website
              remains fully compatible with standard assistive technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
