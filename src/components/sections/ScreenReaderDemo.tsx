import { motion } from "framer-motion";

const demoPairs = [
  {
    visual: "Image",
    screenReader: "A wheelchair user entering an accessible public building with a ramp entrance and automatic doors.",
  },
  {
    visual: "Button label: Find Accessible Places",
    screenReader: '"Find Accessible Places, button."',
  },
  {
    visual: "Icon: 🔊",
    screenReader: '"Audio assistance available, button."',
  },
  {
    visual: "Form field",
    screenReader: '"Location search, edit text, type to search."',
  },
  {
    visual: "Card with green checkmarks",
    screenReader: '"CityCare Hospital, accessibility score 4.5 out of 5. Features: wheelchair entrance, elevator, accessible restroom, braille signage."',
  },
  {
    visual: "Submit button (red = error)",
    screenReader: '"Submit report, button. Error: Please enter a valid location."',
  },
];

export default function ScreenReaderDemo() {
  return (
    <section
      aria-labelledby="sr-demo-heading"
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
            id="sr-demo-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Designed to Be Heard
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            AccessBridge is designed so that important information can be
            understood without relying on vision.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {demoPairs.map((pair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Visual label
                </div>
                <div className="text-foreground font-medium text-lg mb-4 p-3 bg-muted/50 rounded-lg">
                  {pair.visual}
                </div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  Screen-reader label
                </div>
                <div className="text-foreground leading-relaxed p-3 bg-primary/5 rounded-lg border border-primary/10">
                  {pair.screenReader}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-2xl bg-card border border-border text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every element on AccessBridge includes meaningful text alternatives,
              proper ARIA labels, and semantic structure so that screen readers
              like{" "}
              <strong>VoiceOver</strong>, <strong>TalkBack</strong>, and{" "}
              <strong>NVDA</strong> can convey information accurately.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
