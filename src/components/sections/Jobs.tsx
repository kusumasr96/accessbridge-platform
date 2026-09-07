import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Phone, Mail, MessageCircle, X, Send, CheckCircle } from "lucide-react";
import { type Opportunity, allOpportunities, allFilterOptions, accessibilitySupportOptions, filterOpportunities } from "../../data/opportunitiesData";

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      setTimeout(() => closeRef.current?.focus(), 100);
      const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="opp-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 id="opp-modal-title" className="text-xl font-bold text-foreground pr-4">{title}</h2>
          <button ref={closeRef} onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </motion.div>
    </div>
  );
}

function ApplicationForm({ opp, onClose }: { opp: Opportunity; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accessReqs, setAccessReqs] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" aria-hidden="true" />
        <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
        <p className="text-muted-foreground">This is a demo application. No real application has been sent.</p>
        <button onClick={onClose} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">DEMO — This form is for demonstration purposes only.</p>
      </div>
      <div>
        <label htmlFor="app-name" className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
        <input id="app-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary" />
      </div>
      <div>
        <label htmlFor="app-email" className="block text-sm font-medium text-foreground mb-1">Email *</label>
        <input id="app-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary" />
      </div>
      <div>
        <label htmlFor="app-phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
        <input id="app-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary" />
      </div>
      <div>
        <label htmlFor="app-resume" className="block text-sm font-medium text-foreground mb-1">Resume</label>
        <input id="app-resume" type="file" accept=".pdf,.doc,.docx" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
      </div>
      <div>
        <label htmlFor="app-access" className="block text-sm font-medium text-foreground mb-1">Accessibility Requirements</label>
        <textarea id="app-access" value={accessReqs} onChange={(e) => setAccessReqs(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Describe any accessibility requirements..." />
      </div>
      <div>
        <label htmlFor="app-cover" className="block text-sm font-medium text-foreground mb-1">Cover Letter</label>
        <textarea id="app-cover" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Tell us about yourself..." />
      </div>
      <button type="submit" className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2">
        <Send className="w-4 h-4" aria-hidden="true" />
        Submit Application
      </button>
    </form>
  );
}

export default function Jobs() {
  const [typeFilter, setTypeFilter] = useState<string | null>("All");
  const [accessFilter, setAccessFilter] = useState("All");
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [applyingOpp, setApplyingOpp] = useState<Opportunity | null>(null);
  const [contactOpp, setContactOpp] = useState<Opportunity | null>(null);

  const filtered = filterOpportunities(typeFilter, accessFilter);

  return (
    <section
      id="opportunities"
      aria-labelledby="jobs-heading"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="jobs-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Opportunities Without Barriers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find inclusive job opportunities, training programs and scholarships.
            All listings shown are demo content.
          </p>
        </motion.div>

        {/* Type Filters */}
        <div className="max-w-4xl mx-auto mb-4">
          <p className="text-sm font-medium text-foreground mb-2" id="opp-type-label">Opportunity Type</p>
          <div className="flex flex-wrap gap-2" role="toolbar" aria-labelledby="opp-type-label">
            {allFilterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === f ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
                aria-pressed={typeFilter === f}
                aria-label={`${f}${typeFilter === f ? ", selected" : ""}`}
              >
                {typeFilter === f && f !== "All" ? `✓ ${f}` : f}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility Support Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-sm font-medium text-foreground mb-2" id="access-filter-label">Accessibility Support</p>
          <div className="flex flex-wrap gap-2" role="toolbar" aria-labelledby="access-filter-label">
            {accessibilitySupportOptions.map((f) => (
              <button
                key={f}
                onClick={() => setAccessFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  accessFilter === f ? "bg-teal-600 text-white ring-2 ring-teal-600 ring-offset-2" : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                aria-pressed={accessFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Demo notice */}
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" role="note">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
            <strong>DEMO CONTENT</strong> — These are sample listings for illustration. A production version would connect to verified job boards.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4" role="region" aria-label="Opportunity listings" aria-live="polite">
          {filtered.map((opp, i) => (
            <motion.article
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedOpp(opp)}
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedOpp(opp); }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${opp.title} at ${opp.organization}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{opp.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium whitespace-nowrap">
                  {opp.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{opp.organization}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {opp.location}
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {opp.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">DEMO CONTENT</span>
                {opp.accessibilityTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedOpp(opp)}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  aria-label={`View details for ${opp.title}`}
                >
                  View Details →
                </button>
              </div>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-12 text-muted-foreground" role="status">
              <p className="text-lg">No opportunities match your filters.</p>
              <p className="text-sm mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Opportunity Detail Modal */}
      <AnimatePresence>
        {selectedOpp && (
          <Modal open={!!selectedOpp} onClose={() => setSelectedOpp(null)} title={selectedOpp.title}>
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{selectedOpp.type}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">DEMO CONTENT</span>
                </div>
                <p className="text-muted-foreground">{selectedOpp.organization}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {selectedOpp.location}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-1">About the Role</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedOpp.aboutRole}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Responsibilities</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedOpp.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Requirements</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedOpp.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/30">
                <h3 className="font-semibold text-foreground mb-2">Accessibility Support</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedOpp.accessibilitySupport.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-teal-600" aria-hidden="true">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Benefits</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedOpp.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="text-primary" aria-hidden="true">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setSelectedOpp(null); setApplyingOpp(selectedOpp); }}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Apply Now →
                </button>
                <button
                  onClick={() => { setSelectedOpp(null); setContactOpp(selectedOpp); }}
                  className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-accent transition-colors"
                >
                  Contact Employer
                </button>
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-accent transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Apply Form Modal */}
      <AnimatePresence>
        {applyingOpp && (
          <Modal open={!!applyingOpp} onClose={() => setApplyingOpp(null)} title={`Apply — ${applyingOpp.title}`}>
            <ApplicationForm opp={applyingOpp} onClose={() => setApplyingOpp(null)} />
            <button onClick={() => setApplyingOpp(null)} className="mt-4 w-full px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-accent transition-colors">
              Close
            </button>
          </Modal>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpp && (
          <Modal open={!!contactOpp} onClose={() => setContactOpp(null)} title={`Contact — ${contactOpp.organization}`}>
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  <strong>Demo Contact Information</strong> — This is sample data for the prototype. Not a real organisation.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-muted/50 space-y-3">
                <h3 className="font-semibold text-foreground">{contactOpp.organization}</h3>
                <p className="text-sm text-muted-foreground">Phone: +91 1800 000 4567</p>
                <p className="text-sm text-muted-foreground">Email: careers@demo-accessbridge.org</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+9118000004567" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2" aria-label="Call employer (demo)">
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call
                </a>
                <a href="mailto:careers@demo-accessbridge.org" className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" aria-hidden="true" /> Email
                </a>
                <button className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors inline-flex items-center gap-2" aria-label="Send message">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" /> Message
                </button>
              </div>
              <button onClick={() => setContactOpp(null)} className="w-full px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-accent transition-colors">Close</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
