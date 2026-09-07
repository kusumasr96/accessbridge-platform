import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Navigation,
  X,
  Phone,
  MapPin,
  AlertTriangle,
  Hospital,
  Utensils,
  Bus,
  BookOpen,
} from "lucide-react";

interface BlindAccessModeProps {
  onClose: () => void;
}

const quickActions = [
  {
    icon: Hospital,
    label: "Find Accessible Hospital",
    query: "Find accessible hospitals near me",
  },
  {
    icon: Utensils,
    label: "Find Accessible Restaurant",
    query: "Find accessible restaurants near me",
  },
  {
    icon: Bus,
    label: "Find Accessible Transport",
    query: "Find accessible transportation near me",
  },
  {
    icon: MapPin,
    label: "Find Any Accessible Place",
    query: "Find accessible places near me",
  },
];

const emergencyContacts = [
  { label: "Emergency Services", number: "911", description: "Police, Fire, Ambulance" },
  { label: "Accessibility Helpline", number: "1-800-ACCESS", description: "24/7 accessibility support" },
  { label: "Crisis Text Line", number: "Text HOME to 741741", description: "Mental health crisis support" },
];

const stepGuides = [
  {
    title: "Visiting a Hospital",
    steps: [
      "Call ahead to confirm accessible entrance location",
      "Ask about Braille signage and audio announcements",
      "Check if staff assistance is available at reception",
      "Request an accessible room if staying overnight",
      "Ask about guide-dog access policies",
    ],
  },
  {
    title: "Using Public Transport",
    steps: [
      "Check if the station has step-free access",
      "Look for audio announcements at platforms",
      "Ask staff for boarding assistance",
      "Request priority seating near the entrance",
      "Know the station's emergency contact number",
    ],
  },
  {
    title: "Dining at a Restaurant",
    steps: [
      "Call ahead to ask about wheelchair access",
      "Ask if menus are available in Braille",
      "Request seating near the entrance",
      "Ask about accessible restroom facilities",
      "Inquire about service animal policies",
    ],
  },
];

const demoSearchResults: Record<string, Array<{ name: string; address: string; phone: string; features: string[] }>> = {
  hospital: [
    {
      name: "CityCare Hospital",
      address: "123 Main Street, Downtown",
      phone: "555-0100",
      features: ["Wheelchair ramp at entrance", "Braille signage on all floors", "Audio announcements in elevators", "Guide-dog friendly throughout", "Accessible parking in lot B"],
    },
    {
      name: "Metro General Hospital",
      address: "456 Health Avenue, Midtown",
      phone: "555-0200",
      features: ["Step-free entrance", "Tactile floor indicators", "Staff available for assistance", "Accessible reception desk", "Hearing loop at information desk"],
    },
  ],
  restaurant: [
    {
      name: "FreshTable Restaurant",
      address: "789 Oak Lane, City Center",
      phone: "555-0300",
      features: ["Step-free entrance", "Braille menu available", "Accessible seating options", "Staff assistance on request", "Guide-dogs welcome"],
    },
  ],
  transport: [
    {
      name: "Metro Central Station",
      address: "Central Area, Platform 1",
      phone: "555-0400",
      features: ["Elevator access to all platforms", "Audio announcements for departures", "Staff assistance available", "Tactile ground indicators", "Priority seating in carriages"],
    },
  ],
};

function getSearchCategory(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes("hospital") || lower.includes("medical") || lower.includes("doctor")) return "hospital";
  if (lower.includes("restaurant") || lower.includes("food") || lower.includes("dining")) return "restaurant";
  if (lower.includes("transport") || lower.includes("bus") || lower.includes("train") || lower.includes("station")) return "transport";
  return "hospital";
}

export default function BlindAccessMode({ onClose }: BlindAccessModeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ name: string; address: string; phone: string; features: string[] }> | null>(null);
  const [currentGuide, setCurrentGuide] = useState<number | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) setSpeechSupported(false);
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setRecognitionSupported(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!speechSupported || !ttsEnabled) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }, [speechSupported, ttsEnabled]);

  const toggleTTS = useCallback(() => {
    if (ttsEnabled) {
      window.speechSynthesis?.cancel();
    }
    setTtsEnabled((p) => !p);
  }, [ttsEnabled]);

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
        const category = getSearchCategory(result);
        const results = demoSearchResults[category] || demoSearchResults.hospital;
        setSearchResults(results);
        const resultNames = results.map((r) => r.name).join(" and ");
        setResponse(`Found ${results.length} accessible ${category === "hospital" ? "hospitals" : category === "restaurant" ? "restaurants" : "transport options"} near you. Results: ${resultNames}. Say "Read results" to hear details.`);
        speak(`Found ${results.length} accessible places. ${resultNames}. Say "Read results" to hear details.`);
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
    setSearchResults(null);
    recognition.start();
    speak("Listening. Say what you are looking for.");
  }, [recognitionSupported, speechSupported, ttsEnabled, speak]);

  const handleReadResults = useCallback(() => {
    if (!searchResults || searchResults.length === 0) {
      speak("No search results to read. Try searching first.");
      return;
    }
    const text = searchResults
      .map(
        (r, i) =>
          `Result ${i + 1}: ${r.name}. Address: ${r.address}. Phone: ${r.phone}. Features: ${r.features.join(". ")}.`
      )
      .join(" Next result: ");
    speak(text);
  }, [searchResults, speak]);

  const handleReadAloud = useCallback(() => {
    const mainContent = document.getElementById("main-content");
    const text = mainContent?.innerText || "No content to read.";
    speak(text);
    setResponse("Reading page content aloud.");
  }, [speak]);

  const handleQuickAction = useCallback(
    (query: string) => {
      setResponse(`Searching for: ${query}`);
      speak(`Searching for ${query}`);
      const category = getSearchCategory(query);
      const results = demoSearchResults[category] || demoSearchResults.hospital;
      setSearchResults(results);
      const resultNames = results.map((r) => r.name).join(" and ");
      setTimeout(() => {
        setResponse(`Found ${results.length} accessible places. ${resultNames}. Say "Read results" to hear details.`);
        speak(`Found ${results.length} accessible places. ${resultNames}.`);
      }, 500);
    },
    [speak]
  );

  const handleVoiceNav = useCallback(
    (command: string) => {
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
    },
    [speak]
  );

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
      else if (text === "read results") handleReadResults();
    };
    recognition.onerror = () => {};
    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        /* */
      }
    };
  }, [recognitionSupported, handleVoiceNav, handleReadResults]);

  useEffect(() => {
    speak("Blind Access Mode activated. Use voice search, quick actions, read aloud, or voice navigation commands.");
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [speak]);

  return (
    <section
      aria-labelledby="blind-access-heading"
      className="min-h-screen bg-background py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              id="blind-access-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Blind Access Mode
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              A simplified interface focused on voice interaction and screen readers.
            </p>
          </motion.div>
          <div className="flex items-center gap-3">
            {/* TTS Toggle */}
            <button
              onClick={toggleTTS}
              className="p-3 rounded-xl bg-secondary hover:bg-accent transition-colors"
              aria-label={ttsEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
              aria-pressed={ttsEnabled}
            >
              {ttsEnabled ? (
                <Volume2 className="w-6 h-6" aria-hidden="true" />
              ) : (
                <VolumeX className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-xl bg-secondary hover:bg-accent transition-colors"
              aria-label="Exit Blind Access Mode"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
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
              Tap the microphone and say what you need, such as &quot;Find accessible
              hospitals&quot; or &quot;Find restaurants near me.&quot;
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

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
              Quick Actions
            </h2>
            <p className="text-muted-foreground mb-6">
              Tap a button to quickly search for common accessible places.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.query)}
                    className="inline-flex items-center gap-3 px-5 py-4 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent transition-colors text-left"
                    aria-label={action.label}
                  >
                    <Icon className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Search Results */}
          {searchResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                  Search Results
                </h2>
                <button
                  onClick={handleReadResults}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  aria-label="Read search results aloud"
                >
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                  Read Results
                </button>
              </div>
              <div className="space-y-4" role="list" aria-label="Search results">
                {searchResults.map((result, i) => (
                  <div
                    key={result.name}
                    className="p-5 rounded-xl bg-muted/50 border border-border"
                    role="listitem"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {result.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Phone: {result.phone}
                    </p>
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Accessibility Features
                      </span>
                      <ul className="mt-2 space-y-1" role="list">
                        {result.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-foreground"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

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
              Have the entire page content read aloud using your device&apos;s
              text-to-speech.
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

          {/* Step-by-Step Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />
              Step-by-Step Guides
            </h2>
            <p className="text-muted-foreground mb-6">
              Follow these accessibility guides for common activities. Tap a guide
              to hear it read aloud.
            </p>
            <div className="space-y-3">
              {stepGuides.map((guide, i) => (
                <div key={guide.title} className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => {
                      const newIdx = currentGuide === i ? null : i;
                      setCurrentGuide(newIdx);
                      if (newIdx !== null) {
                        const text = `${guide.title}. Steps: ${guide.steps.map((s, j) => `Step ${j + 1}: ${s}`).join(". ")}`;
                        speak(text);
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    aria-expanded={currentGuide === i}
                  >
                    <span className="font-semibold text-foreground">{guide.title}</span>
                    <span className="text-primary text-sm font-medium">
                      {currentGuide === i ? "Collapse" : "Read Guide"}
                    </span>
                  </button>
                  {currentGuide === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-4 pb-4"
                    >
                      <ol className="space-y-2" role="list">
                        {guide.steps.map((step, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-foreground"
                          >
                            <span
                              className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                              aria-hidden="true"
                            >
                              {j + 1}
                            </span>
                            <span className="text-sm leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-destructive">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
              Emergency Information
            </h2>
            <p className="text-muted-foreground mb-6">
              Important emergency contacts. Tap to call or hear details.
            </p>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.label}
                  className="flex items-center justify-between p-4 rounded-xl bg-background border border-border"
                >
                  <div>
                    <p className="font-semibold text-foreground">{contact.label}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <a
                    href={`tel:${contact.number.replace(/[^0-9-]/g, "")}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    aria-label={`Call ${contact.label} at ${contact.number}`}
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{contact.number}</span>
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong>Important:</strong> In case of emergency, always contact your
              local emergency services first. This information is for reference
              only and does not replace professional emergency services.
            </p>
          </motion.div>

          {/* Voice Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
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
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span>&quot;Read Results&quot;</span>
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
              features, quick actions, step-by-step guides, and emergency
              information. It does not replace your device&apos;s screen reader
              (such as VoiceOver, TalkBack, or NVDA). The website remains fully
              compatible with standard assistive technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
