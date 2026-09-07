import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, ExternalLink, Navigation } from "lucide-react";

const placeTypes = ["Hospital", "College", "Restaurant", "Shopping Mall", "Public Building", "Transport Station", "Park"];
const accessibilityNeeds = ["Blind / Visual", "Hearing", "Wheelchair", "Mobility", "Other"];

interface Place {
  name: string;
  type: string;
  location: string;
  score: number;
  features: string[];
  blindFeatures: string[];
  wheelchairFeatures: string[];
  hearingFeatures: string[];
}

const demoPlaces: Place[] = [
  {
    name: "CityCare Hospital",
    type: "Hospital",
    location: "Downtown",
    score: 4.5,
    features: ["Wheelchair entrance", "Elevator", "Accessible restroom", "Braille signage", "Audio assistance", "Accessible parking"],
    blindFeatures: ["Braille signage", "Audio announcements", "Tactile paths", "Screen-reader-friendly info", "Staff assistance", "Guide-dog access"],
    wheelchairFeatures: ["Ramps", "Elevator", "Accessible toilets", "Accessible parking"],
    hearingFeatures: ["Visual announcements", "Captioning", "Sign-language assistance"],
  },
  {
    name: "Greenfield College",
    type: "College",
    location: "University District",
    score: 4.2,
    features: ["Wheelchair entrance", "Elevator", "Accessible study rooms", "Assistive technology lab", "Sign language interpreters"],
    blindFeatures: ["Braille textbooks", "Audio lecture support", "Screen-reader-compatible portal", "Staff assistance"],
    wheelchairFeatures: ["Ramp access to all floors", "Accessible desks", "Accessible parking"],
    hearingFeatures: ["Captioned lectures", "Visual alerts", "Sign-language interpreters"],
  },
  {
    name: "FreshTable Restaurant",
    type: "Restaurant",
    location: "City Center",
    score: 4.7,
    features: ["Wheelchair entrance", "Accessible seating", "Braille menu", "Staff assistance"],
    blindFeatures: ["Braille menu", "Staff can read menu aloud", "Guide-dog welcome"],
    wheelchairFeatures: ["Step-free entrance", "Accessible tables", "Accessible restroom"],
    hearingFeatures: ["Written menus", "Visual order display"],
  },
  {
    name: "Metro Central Station",
    type: "Transport Station",
    location: "Central Area",
    score: 4.0,
    features: ["Elevator", "Tactile paths", "Audio announcements", "Accessible ticket counters", "Accessible parking"],
    blindFeatures: ["Tactile ground indicators", "Audio announcements", "Staff assistance", "Guide-dog friendly"],
    wheelchairFeatures: ["Platform elevators", "Accessible gates", "Accessible waiting areas"],
    hearingFeatures: ["Visual departure boards", "Captioned announcements"],
  },
];

export default function PlacesFinder() {
  const [search, setSearch] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [accessNeed, setAccessNeed] = useState("");
  const [showDetails, setShowDetails] = useState<number | null>(null);

  const filtered = demoPlaces.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (placeType && p.type !== placeType) return false;
    return true;
  });

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
          <h2
            id="places-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
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
            onSubmit={(e) => e.preventDefault()}
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
                  placeholder="Enter city or area"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
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
                  <option value="">All types</option>
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
                  <option value="">All needs</option>
                  {accessibilityNeeds.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Search Accessible Places
            </button>
          </form>
        </div>

        {/* Demo data notice */}
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" role="note">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
            📋 <strong>Demo Data:</strong> The places and accessibility information shown below are
            sample data for illustration. Verify real-world accessibility before visiting.
          </p>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto space-y-4" role="region" aria-label="Search results" aria-live="polite">
          {filtered.map((place, i) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-foreground">{place.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {place.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {place.location}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      {place.score}/5
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      Accessibility Score
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {place.features.slice(0, showDetails === i ? undefined : 4).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium"
                      >
                        <span aria-hidden="true">✓</span>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setShowDetails(showDetails === i ? null : i)}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors"
                    aria-expanded={showDetails === i}
                    aria-label={`View details for ${place.name}`}
                  >
                    {showDetails === i ? "Hide Details" : "View Details"}
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5"
                    aria-label={`Get directions to ${place.name}`}
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    Directions
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {showDetails === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 pt-6 border-t border-border"
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        🦯 For Blind & Visually Impaired
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground" role="list">
                        {place.blindFeatures.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="text-primary" aria-hidden="true">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        ♿ For Wheelchair Users
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground" role="list">
                        {place.wheelchairFeatures.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="text-primary" aria-hidden="true">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        👂 For Deaf / Hard-of-Hearing
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground" role="list">
                        {place.hearingFeatures.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="text-primary" aria-hidden="true">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground" role="status">
              <p className="text-lg">No places found matching your criteria.</p>
              <p className="text-sm mt-2">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
