import { motion } from "framer-motion";

const supportCategories = [
  {
    icon: "🦯",
    title: "Blind & Visual Support",
    description: "Find screen-reader-friendly resources, voice tools, accessible places and visual assistance.",
    srLabel: "Blind and Visual Support — Find screen-reader-friendly resources, voice tools, accessible places and visual assistance.",
  },
  {
    icon: "👂",
    title: "Hearing Support",
    description: "Discover captioning, communication tools and hearing accessibility resources.",
    srLabel: "Hearing Support — Discover captioning, communication tools and hearing accessibility resources.",
  },
  {
    icon: "♿",
    title: "Mobility Support",
    description: "Find wheelchair-friendly places, transportation resources and mobility information.",
    srLabel: "Mobility Support — Find wheelchair-friendly places, transportation resources and mobility information.",
  },
  {
    icon: "🗣️",
    title: "Communication Support",
    description: "Explore speech-to-text, text-to-speech and communication tools.",
    srLabel: "Communication Support — Explore speech-to-text, text-to-speech and communication tools.",
  },
  {
    icon: "🧠",
    title: "Cognitive Support",
    description: "Find simplified information, learning resources and cognitive accessibility tools.",
    srLabel: "Cognitive Support — Find simplified information, learning resources and cognitive accessibility tools.",
  },
  {
    icon: "🤝",
    title: "Caregiver Support",
    description: "Resources for families, caregivers, teachers and support workers.",
    srLabel: "Caregiver Support — Resources for families, caregivers, teachers and support workers.",
  },
];

export default function SupportCards() {
  return (
    <section
      id="explore"
      aria-labelledby="support-heading"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            id="support-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            How can we help you?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a support area to find resources, tools and accessible places
            tailored to your needs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <button
                className="w-full text-left p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                aria-label={cat.srLabel}
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {cat.description}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
