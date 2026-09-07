import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Phone, Mail, MessageCircle, X, Search as SearchIcon } from "lucide-react";
import { type Place, searchPlaces, allCities, placeTypes, accessibilityNeeds } from "../../data/placesData";

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
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
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
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 id="modal-title" className="text-xl font-bold text-foreground pr-4">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </motion.div>
    </div>
  );
}

function FeatureList({ title, emoji, features }: { title: string; emoji: string; features: string[] }) {
  if (!features.length) return null;
  return (
    <div className="p-4 rounded-xl bg-muted/50">
      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
        <span aria-hidden="true">{emoji}</span> {title}
      </h4>
      <ul className="space-y-1 text-sm text-muted-foreground" role="list">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-primary font-bold" aria-hidden="true">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PlacesFinder() {
  const [search, setSearch] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [accessNeed, setAccessNeed] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [contactPlace, setContactPlace] = useState<Place | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const results = hasSearched || search || placeType || accessNeed
    ? searchPlaces(search, placeType, accessNeed)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const clearFilters = () => {
    setSearch("");
    setPlaceType("");
    setAccessNeed("");
    setHasSearched(false);
  };

  return (
    <section
      id="places"
      aria-labelledby="places-heading"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="places-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Find Places Without Barriers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for accessible locations near you. All data shown is demo
            content for illustration purposes.
          </p>
        </motion.div>

        {/* Search form */}
        <div className="max-w-4xl mx-auto mb-12">
          <form
            onSubmit={handleSearch}
            className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm"
            aria-label="Search for accessible places"
          >
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="location-search" className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  id="location-search"
                  type="text"
                  placeholder="e.g. Delhi, Bengaluru, Mumbai..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">Supported: Delhi, Bengaluru, Mumbai, Chennai, Hyderabad, Pune, Mysuru, Kolkata, Kochi, Ahmedabad</p>
              </div>
              <div>
                <label htmlFor="place-type" className="block text-sm font-medium text-foreground mb-2">
                  Place Type
                </label>
                <select
                  id="place-type"
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">All Types</option>
                  {placeTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="access-need" className="block text-sm font-medium text-foreground mb-2">
                  Accessibility Need
                </label>
                <select
                  id="access-need"
                  value={accessNeed}
                  onChange={(e) => setAccessNeed(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">All Needs</option>
                  {accessibilityNeeds.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
                Search Accessible Places
              </button>
              {(search || placeType || accessNeed) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-accent transition-colors"
                  aria-label="Clear all search filters"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Demo data notice */}
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" role="note">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
            <strong>DEMO DATA</strong> — The places, accessibility information and contact details shown below are sample data for this prototype. Please verify real-world accessibility directly with the location before visiting.
          </p>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto space-y-4" role="region" aria-label="Search results" aria-live="polite">
          {hasSearched && results.length === 0 && (
            <div className="text-center py-12 text-muted-foreground" role="status">
              <p className="text-lg">No places found matching your criteria.</p>
              <p className="text-sm mt-2">Try adjusting your search or clearing filters.</p>
            </div>
          )}

          {results.map((place, i) => (
            <motion.article
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedPlace(place)}
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedPlace(place); }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${place.name} in ${place.city}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-xl font-semibold text-foreground">{place.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {place.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">
                      DEMO DATA
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {place.address}
                  </p>
                  <p className="sr-only">Accessibility score: {place.score.toFixed(1)} out of 5</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      {place.score.toFixed(1)}/5
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      Accessibility Score
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {place.features.slice(0, 5).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium"
                      >
                        <span aria-hidden="true">✓</span>
                        {f}
                      </span>
                    ))}
                    {place.features.length > 5 && (
                      <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                        +{place.features.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSelectedPlace(place)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    aria-label={`View details for ${place.name}`}
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => setContactPlace(place)}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors inline-flex items-center gap-1.5"
                    aria-label={`Contact accessibility desk for ${place.name}`}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <Modal open={!!selectedPlace} onClose={() => setSelectedPlace(null)} title={selectedPlace.name}>
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{selectedPlace.type}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">DEMO DATA</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {selectedPlace.address}, {selectedPlace.city}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-medium">{selectedPlace.score.toFixed(1)}/5</span>
                  <span className="text-sm text-muted-foreground ml-1">Accessibility Score</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <FeatureList title="Blind / Visual Support" emoji="🦯" features={selectedPlace.blindFeatures} />
                <FeatureList title="Mobility Support" emoji="♿" features={selectedPlace.wheelchairFeatures} />
                <FeatureList title="Hearing Support" emoji="👂" features={selectedPlace.hearingFeatures} />
                <FeatureList title="Communication Support" emoji="🗣️" features={selectedPlace.communicationFeatures} />
              </div>

              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Please verify accessibility directly with the location before visiting.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setSelectedPlace(null); setContactPlace(selectedPlace); }}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Accessibility Desk
                </button>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-accent transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactPlace && (
          <Modal open={!!contactPlace} onClose={() => setContactPlace(null)} title={`Contact — ${contactPlace.name}`}>
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  <strong>Demo Contact Information</strong> — This is sample data for the prototype. Not a real organisation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-muted/50 space-y-3">
                <h3 className="font-semibold text-foreground">Accessibility Support</h3>
                <p className="text-sm text-muted-foreground">Phone: +91 1800 000 1234</p>
                <p className="text-sm text-muted-foreground">Email: accessibility@demo-accessbridge.org</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+9118000001234"
                  className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  aria-label="Call accessibility desk (demo number)"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call
                </a>
                <a
                  href="mailto:accessibility@demo-accessbridge.org"
                  className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors inline-flex items-center gap-2"
                  aria-label="Email accessibility desk"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Email
                </a>
                <button
                  className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors inline-flex items-center gap-2"
                  aria-label="Send message to accessibility desk"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Message
                </button>
              </div>

              <button
                onClick={() => setContactPlace(null)}
                className="w-full px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
