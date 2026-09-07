import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "What is AccessBridge?",
    answer:
      "AccessBridge is a digital accessibility platform that helps people with disabilities find accessible places, resources, opportunities and assistive technology. It is designed for blind and visually impaired users, as well as people with hearing, mobility, speech and cognitive disabilities.",
  },
  {
    question: "Is AccessBridge free to use?",
    answer:
      "Yes, AccessBridge is completely free to use. Our mission is to make accessibility information available to everyone, regardless of their financial situation.",
  },
  {
    question: "Can AccessBridge replace a professional accessibility service?",
    answer:
      "No. AccessBridge is an information and resource platform. It does not replace professional accessibility services, emergency services or medical advice. Always verify accessibility information before visiting a location. In case of emergency, contact your local emergency services.",
  },
  {
    question: "How do I use Blind Access Mode?",
    answer:
      "Click the 'Enter Blind Access Mode' button on the homepage. This opens a simplified interface with voice search, quick actions, step-by-step guides and emergency information. It works alongside your device's screen reader (VoiceOver, TalkBack or NVDA).",
  },
  {
    question: "What assistive technologies does AccessBridge support?",
    answer:
      "AccessBridge is designed to work with all major assistive technologies including screen readers (NVDA, VoiceOver, TalkBack), screen magnifiers, voice control software, switch devices and alternative input methods. We follow WCAG 2.1 Level AA guidelines.",
  },
  {
    question: "How do I report an accessibility barrier?",
    answer:
      "Scroll to the 'See a Barrier? Report It.' section on the homepage. Fill in the location, category and description of the barrier. You can also upload a photo. Your report helps improve accessibility information for everyone.",
  },
  {
    question: "Is the accessibility information verified?",
    answer:
      "The information shown on AccessBridge is a combination of community reports and verified data. We clearly label demo content and sample data. In a production version, accessibility data would be verified by trained auditors and community contributors.",
  },
  {
    question: "How does AccessAI work?",
    answer:
      "AccessAI is a demo chatbot that provides accessibility guidance and information. It can help with topics like accessible travel, hospital visits, assistive technology and simplifying information. A production version would connect to a real AI backend.",
  },
  {
    question: "Can I use AccessBridge on my phone?",
    answer:
      "Yes, AccessBridge is fully responsive and works on mobile phones, tablets and desktop computers. The interface adapts to your screen size and supports touch, keyboard and voice interaction.",
  },
  {
    question: "How can my organisation join AccessBridge?",
    answer:
      "We welcome organisations committed to accessibility. Contact us through the website to learn about listing your accessible location, joining our accessibility network or partnering with AccessBridge.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 lg:py-28 bg-muted/30"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Common Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about AccessBridge and
            accessibility.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl bg-card border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === i && (
                <motion.div
                  id={`faq-answer-${i}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-5 pb-5"
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
