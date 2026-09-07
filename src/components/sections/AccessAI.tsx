import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const aiResponses: Record<string, string> = {
  default:
    "I can help with accessibility guidance. Try asking me about accessible travel, hospital visits, assistive technology, or how to explain things in simple language.",
  hospital:
    "Here is a checklist for visiting a hospital:\n\n1. Ask whether the entrance has tactile guidance.\n2. Check whether elevators provide audio announcements.\n3. Ask whether staff assistance is available.\n4. Check whether signs contain Braille.\n5. Confirm whether accessible restrooms are available.\n\nWould you like me to create a visit checklist?",
  travel:
    "Here are tips for accessible travel:\n\n1. Check if your destination has step-free access.\n2. Look for accessible transport options in advance.\n3. Pack any assistive devices you may need.\n4. Save the destination's contact number.\n5. Ask about accessibility features before arriving.\n\nWould you like me to create a travel checklist?",
  technology:
    "Common assistive technologies include:\n\n• Screen readers (NVDA, VoiceOver, TalkBack)\n• Braille displays\n• Text-to-speech software\n• Speech-to-text dictation\n• Voice assistants\n• Accessible keyboards and switches\n• Eye-tracking devices\n\nWould you like more detail on any of these?",
  simple:
    "I can help simplify information. Here's how I explain things clearly:\n\n1. Use short, simple sentences.\n2. Avoid jargon and complex words.\n3. Use examples and pictures.\n4. Break tasks into small steps.\n5. Check understanding before moving on.\n\nWhat topic would you like me to simplify?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("hospital") || lower.includes("medical") || lower.includes("doctor"))
    return aiResponses.hospital;
  if (lower.includes("travel") || lower.includes("trip") || lower.includes("journey"))
    return aiResponses.travel;
  if (lower.includes("technology") || lower.includes("assistive") || lower.includes("device"))
    return aiResponses.technology;
  if (lower.includes("simple") || lower.includes("easy") || lower.includes("explain"))
    return aiResponses.simple;
  return aiResponses.default;
}

const suggestedQuestions = [
  "Help me prepare for accessible travel.",
  "What should I check before visiting a hospital?",
  "Explain this in simple language.",
  "What assistive technology could help me?",
];

export default function AccessAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm AccessAI. I can help you with accessibility guidance and information. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const question = text || input.trim();
    if (!question) return;
    const userMsg: Message = { role: "user", text: question };
    const aiMsg: Message = { role: "ai", text: getAIResponse(question) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <section
      id="accessai"
      aria-labelledby="accessai-heading"
      className="py-20 lg:py-28 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Bot className="w-4 h-4" aria-hidden="true" />
            AI Demo
          </div>
          <h2
            id="accessai-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Meet AccessAI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get simple, practical accessibility guidance. This is a demo chatbot
            with pre-defined responses.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Chat window */}
          <div
            className="rounded-2xl bg-card border border-border shadow-lg overflow-hidden"
            role="log"
            aria-label="AccessAI chat"
            aria-live="polite"
          >
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0" aria-hidden="true">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                    role={msg.role === "ai" ? "article" : undefined}
                    aria-label={msg.role === "ai" ? "AccessAI response" : "Your message"}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0" aria-hidden="true">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-border flex gap-3"
            >
              <label htmlFor="accessai-input" className="sr-only">
                Type your accessibility question
              </label>
              <input
                id="accessai-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about accessibility..."
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            This is a demo AI assistant with pre-defined responses. A production
            version would connect to a real AI backend.
          </p>
        </div>
      </div>
    </section>
  );
}
