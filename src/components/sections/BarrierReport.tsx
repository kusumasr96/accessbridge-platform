import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Upload } from "lucide-react";

const categories = [
  "Missing ramp",
  "Broken elevator",
  "No accessible restroom",
  "Missing Braille signage",
  "Poor audio announcements",
  "Parking issue",
  "Other",
];

export default function BarrierReport() {
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="barrier-report"
      aria-labelledby="barrier-heading"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              Community Reporting
            </div>
            <h2
              id="barrier-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              See a Barrier? Report It.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Help make communities more accessible by sharing accessibility
              barriers.
            </p>
          </motion.div>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm"
              aria-label="Report an accessibility barrier"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="barrier-location" className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    id="barrier-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where is the barrier?"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="barrier-category" className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    id="barrier-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">Select a category...</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="barrier-description" className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    id="barrier-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the accessibility barrier..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="barrier-photo" className="block text-sm font-medium text-foreground mb-2">
                    Upload Photo (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="barrier-photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      aria-label="Upload a photo of the barrier"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("barrier-photo")?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
                    >
                      <Upload className="w-4 h-4" aria-hidden="true" />
                      Choose file
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Submit Report
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Thank you!
              </h3>
              <p className="text-muted-foreground">
                Your report has been recorded for this demo.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
