import { useState } from "react";
import { motion } from "framer-motion";

const technologies = [
  {
    name: "Screen Readers",
    icon: "👁️‍🗨️",
    whatItIs: "Software that reads digital text aloud, enabling blind and visually impaired users to navigate computers and phones.",
    whoItHelps: "Blind and visually impaired users",
    howItWorks: "Screen readers convert text, buttons, and UI elements into spoken output or Braille display output.",
    examples: "NVDA, JAWS, VoiceOver, TalkBack",
  },
  {
    name: "Braille Displays",
    icon: "⠿",
    whatItIs: "Hardware devices that convert digital text into refreshable Braille characters using raised pins.",
    whoItHelps: "Blind users who read Braille",
    howItWorks: "Connected to a computer or phone, the display refreshes Braille characters as the user navigates.",
    examples: "HumanWare Brailliant, Freedom Scientific Focus",
  },
  {
    name: "Text-to-Speech",
    icon: "🔊",
    whatItIs: "Technology that converts written text into natural-sounding spoken language.",
    whoItHelps: "Blind users, people with dyslexia, cognitive disabilities",
    howItWorks: "Takes text input and generates audio output using synthetic or recorded human voices.",
    examples: "Built-in OS TTS, Amazon Polly, Google TTS",
  },
  {
    name: "Speech-to-Text",
    icon: "🎙️",
    whatItIs: "Technology that converts spoken language into written text.",
    whoItHelps: "Deaf users, people with mobility or speech disabilities",
    howItWorks: "Microphone input is processed and transcribed into text that appears on screen.",
    examples: "Dragon NaturallySpeaking, Google Voice Typing, Otter.ai",
  },
  {
    name: "Voice Assistants",
    icon: "🤖",
    whatItIs: "AI-powered tools that allow users to interact with devices and services using voice commands.",
    whoItHelps: "Blind users, people with mobility disabilities",
    howItWorks: "Users speak commands that the assistant interprets and acts on, such as searching, calling, or controlling smart devices.",
    examples: "Siri, Google Assistant, Alexa, Cortana",
  },
  {
    name: "Accessible Keyboards",
    icon: "⌨️",
    whatItIs: "Specialised keyboards designed to make computer interaction easier for people with limited mobility.",
    whoItHelps: "People with motor disabilities, limited hand mobility",
    howItWorks: "Keyboards may feature larger keys, ergonomic designs, sip-and-puff interfaces, or eye-tracking controls.",
    examples: "BigKeys, IntelliKeys, on-screen keyboards",
  },
  {
    name: "Eye-Tracking Technology",
    icon: "👁️",
    whatItIs: "Systems that allow users to control a computer using only their eye movements.",
    whoItHelps: "People with severe mobility limitations (e.g., ALS, spinal cord injuries)",
    howItWorks: "A camera tracks eye position and gaze direction, translating it into cursor movement and selection.",
    examples: "Tobii Dynavox, EyeTech Digital Systems",
  },
];

export default function TechHub() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="techhub"
      aria-labelledby="techhub-heading"
      className="py-20 lg:py-28 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            id="techhub-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Technology That Makes Life More Accessible
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about assistive technologies that empower people with
            disabilities.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3" aria-hidden="true">
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tech.name}
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {tech.whatItIs}
              </p>

              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="text-sm text-primary font-medium hover:underline"
                aria-expanded={expanded === i}
                aria-controls={`tech-detail-${i}`}
              >
                {expanded === i ? "Show less" : "Learn More"}
              </button>

              {expanded === i && (
                <motion.div
                  id={`tech-detail-${i}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-border space-y-3"
                >
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Who it helps
                    </span>
                    <p className="text-sm text-foreground mt-1">{tech.whoItHelps}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      How it works
                    </span>
                    <p className="text-sm text-foreground mt-1">{tech.howItWorks}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Examples
                    </span>
                    <p className="text-sm text-foreground mt-1">{tech.examples}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
