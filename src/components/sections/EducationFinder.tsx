import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, MessageCircle, X, Search as SearchIcon,
  CheckCircle, GraduationCap, Building, Wifi, Home as HomeIcon,
} from "lucide-react";
import {
  type EducationInstitution,
  searchInstitutions,
  allInstitutions,
  educationLevels,
  accessibilityNeedOptions,
  courseOptions,
  scholarships as scholarshipData,
} from "../../data/educationData";

const allCities = [
  "Delhi", "Bengaluru", "Mumbai", "Chennai", "Hyderabad",
  "Pune", "Mysuru", "Kolkata", "Kochi", "Ahmedabad",
];

const checkItems = [
  "Accessible entrance", "Ramp / elevator", "Accessible classrooms",
  "Accessible restroom", "Braille signage", "Screen-reader-compatible learning materials",
  "Examination accommodations", "Assistive technology", "Accessible library",
  "Student support services", "Accessible hostel", "Accessible transportation",
];

function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      setTimeout(() => closeRef.current?.focus(), 100);
      const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", h);
      return () => document.removeEventListener("keydown", h);
    }
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="edu-modal-title" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card border border-border rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 id="edu-modal-title" className="text-xl font-bold text-foreground pr-4">{title}</h2>
          <button ref={closeRef} onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0" aria-label="Close dialog"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </motion.div>
    </div>
  );
}

function FeatureBlock({ title, emoji, features }: { title: string; emoji: string; features: string[] }) {
  if (!features.length) return null;
  return (
    <div className="p-4 rounded-xl bg-muted/50">
      <h4 className="font-semibold text-foreground mb-2">{emoji} {title}</h4>
      <ul className="space-y-1 text-sm text-muted-foreground" role="list">
        {features.map((f) => (<li key={f} className="flex items-center gap-2"><span className="text-primary font-bold" aria-hidden="true">✓</span>{f}</li>))}
      </ul>
    </div>
  );
}

export default function EducationFinder() {
  const [cityQuery, setCityQuery] = useState("");
  const [level, setLevel] = useState("");
  const [accessNeed, setAccessNeed] = useState("");
  const [course, setCourse] = useState("");
  const [results, setResults] = useState<EducationInstitution[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedInst, setSelectedInst] = useState<EducationInstitution | null>(null);
  const [contactInst, setContactInst] = useState<EducationInstitution | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMatching, setShowMatching] = useState(false);
  const [matchCity, setMatchCity] = useState("");
  const [matchLevel, setMatchLevel] = useState("");
  const [matchCourse, setMatchCourse] = useState("");
  const [matchAccess, setMatchAccess] = useState("");
  const [matchHostel, setMatchHostel] = useState("");
  const [matchMode, setMatchMode] = useState("");
  const [matchResults, setMatchResults] = useState<EducationInstitution[]>([]);
  const [matchSearched, setMatchSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(searchInstitutions(cityQuery, level, accessNeed, course));
    setHasSearched(true);
    setSelectedCity(null);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setCityQuery(city);
    setResults(searchInstitutions(city, level, accessNeed, course));
    setHasSearched(true);
  };

  const clearFilters = () => {
    setCityQuery(""); setLevel(""); setAccessNeed(""); setCourse("");
    setResults([]); setHasSearched(false); setSelectedCity(null);
  };

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    let r = searchInstitutions(matchCity, matchLevel, matchAccess, matchCourse);
    if (matchHostel === "yes") r = r.filter((i) => i.hostelAvailable);
    if (matchMode && matchMode !== "Any") r = r.filter((i) => i.mode === matchMode);
    // Add why-matches text
    r = r.map((i) => ({
      ...i,
      whyMatches: `This ${i.level.toLowerCase()} in ${i.city} offers ${matchAccess ? matchAccess.toLowerCase() + " support" : "accessible facilities"} and matches your course preference in ${matchCourse || "general studies"}.`,
    }));
    setMatchResults(r);
    setMatchSearched(true);
  };

  return (
    <section id="education" aria-labelledby="edu-heading" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 id="edu-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            <GraduationCap className="w-8 h-8 inline-block mr-2" aria-hidden="true" />
            Accessible Education Finder
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find schools, colleges and learning opportunities that support every learner.
          </p>
        </motion.div>

        {/* Demo Notice */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" role="note">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
            <strong>DEMO DATA</strong> — The institutions, accessibility information and contact details shown are sample data. Verify admission requirements, fees, deadlines and accessibility facilities directly with the institution.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-4" aria-label="Search for accessible education">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edu-location" className="block text-sm font-medium text-foreground mb-2">Location</label>
                <input id="edu-location" type="text" placeholder="e.g. Delhi, Bengaluru..." value={cityQuery} onChange={(e) => setCityQuery(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="edu-level" className="block text-sm font-medium text-foreground mb-2">Education Level</label>
                <select id="edu-level" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">All Levels</option>
                  {educationLevels.map((l) => (<option key={l} value={l}>{l}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="edu-access" className="block text-sm font-medium text-foreground mb-2">Accessibility Need</label>
                <select id="edu-access" value={accessNeed} onChange={(e) => setAccessNeed(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">All Needs</option>
                  {accessibilityNeedOptions.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="edu-course" className="block text-sm font-medium text-foreground mb-2">Course / Stream</label>
                <select id="edu-course" value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">All Courses</option>
                  {courseOptions.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                <SearchIcon className="w-4 h-4" aria-hidden="true" /> Find Accessible Education
              </button>
              {(cityQuery || level || accessNeed || course) && (
                <button type="button" onClick={clearFilters} className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-accent transition-colors">Clear Filters</button>
              )}
            </div>
          </form>
        </div>

        {/* City Cards */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Explore Education by Location</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {allCities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                  selectedCity === city
                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-md text-foreground"
                }`}
                aria-pressed={selectedCity === city}
                aria-label={`Show education institutions in ${city}`}
              >
                <MapPin className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto mb-16" role="region" aria-label="Education results" aria-live="polite">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {results.length} institution{results.length !== 1 ? "s" : ""} found
              {selectedCity ? ` in ${selectedCity}` : ""}
            </h3>
            {results.length === 0 && (
              <p className="text-muted-foreground py-8 text-center">No institutions found. Try adjusting your filters.</p>
            )}
            <div className="space-y-4">
              {results.map((inst, i) => (
                <motion.article
                  key={inst.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedInst(inst)}
                  onKeyDown={(e) => { if (e.key === "Enter") setSelectedInst(inst); }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${inst.name}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-lg font-semibold text-foreground">{inst.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{inst.level}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">DEMO DATA</span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {inst.address}, {inst.city}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {inst.courses.map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{c}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-foreground">{inst.score.toFixed(1)}/5</span>
                        <span className="text-xs text-muted-foreground ml-1">Accessibility Score</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setSelectedInst(inst)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">View Details</button>
                      <button onClick={() => setContactInst(inst)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors">Contact Admission Desk</button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Student Matching */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Find Institutions That Match My Needs</h3>
          <form onSubmit={handleMatch} className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4" aria-label="Match institutions to your needs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="match-where" className="block text-sm font-medium text-foreground mb-1">Where do you want to study?</label>
                <select id="match-where" value={matchCity} onChange={(e) => setMatchCity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary">
                  <option value="">Any location</option>
                  {allCities.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="match-level" className="block text-sm font-medium text-foreground mb-1">School or college?</label>
                <select id="match-level" value={matchLevel} onChange={(e) => setMatchLevel(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary">
                  <option value="">Any level</option>
                  {educationLevels.map((l) => (<option key={l} value={l}>{l}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="match-course" className="block text-sm font-medium text-foreground mb-1">What course?</label>
                <select id="match-course" value={matchCourse} onChange={(e) => setMatchCourse(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary">
                  <option value="">Any course</option>
                  {courseOptions.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="match-access" className="block text-sm font-medium text-foreground mb-1">What accessibility support do you need?</label>
                <select id="match-access" value={matchAccess} onChange={(e) => setMatchAccess(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary">
                  <option value="">No specific need</option>
                  {accessibilityNeedOptions.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="match-hostel" className="block text-sm font-medium text-foreground mb-1">Do you need hostel facilities?</label>
                <select id="match-hostel" value={matchHostel} onChange={(e) => setMatchHostel(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary">
                  <option value="">Any</option>
                  <option value="yes">Yes, hostel required</option>
                  <option value="no">Not required</option>
                </select>
              </div>
              <div>
                <label htmlFor="match-mode" className="block text-sm font-medium text-foreground mb-1">Online, offline or hybrid?</label>
                <select id="match-mode" value={matchMode} onChange={(e) => setMatchMode(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary">
                  <option value="Any">Any</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Find Matching Institutions
            </button>
          </form>

          {matchSearched && (
            <div className="mt-6 space-y-4" role="region" aria-live="polite">
              <p className="text-foreground font-medium">{matchResults.length} demo institution{matchResults.length !== 1 ? "s" : ""} match{matchResults.length === 1 ? "es" : ""} your preferences.</p>
              {matchResults.map((inst) => (
                <div key={inst.id} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-foreground">{inst.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{inst.level}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">DEMO DATA</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{inst.address}, {inst.city}</p>
                  {inst.whyMatches && <p className="text-sm text-primary font-medium mb-3">Why this matches your needs: {inst.whyMatches}</p>}
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedInst(inst)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">View Details</button>
                    <button onClick={() => setContactInst(inst)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent">Contact</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support Sections */}
        <div className="max-w-5xl mx-auto mb-16 space-y-8">
          <h3 className="text-xl font-bold text-foreground text-center">Student Accessibility Support</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-3">🦯 For Blind & Visually Impaired Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Screen-reader-compatible learning</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Audio learning materials</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Braille resources</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Keyboard-accessible platforms</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Accessible examination materials</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Audio textbooks</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Academic support</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-3">👂 For Deaf & Hard-of-Hearing Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Captioned lectures</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Sign-language support</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Visual announcements</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Accessible communication</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Hearing assistance technology</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-3">♿ For Students With Mobility Disabilities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Ramps and elevators</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Accessible classrooms</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Accessible restrooms</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Accessible transportation</li>
                <li className="flex items-center gap-2"><span className="text-primary" aria-hidden="true">✓</span>Accessible hostel facilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-foreground mb-2 text-center">Scholarships & Financial Support</h3>
          <p className="text-center text-muted-foreground text-sm mb-6">Check official government or institution websites for current eligibility, deadlines and application details.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarshipData.map((s) => (
              <div key={s.name} className="p-5 rounded-2xl bg-card border border-border">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 inline-block">{s.category}</span>
                <h4 className="font-semibold text-foreground mb-2">{s.name}</h4>
                <p className="text-sm text-muted-foreground mb-1"><strong>Eligibility:</strong> {s.eligibility}</p>
                <p className="text-sm text-muted-foreground mb-1"><strong>Level:</strong> {s.level}</p>
                <p className="text-sm text-muted-foreground mb-1"><strong>Support:</strong> {s.support}</p>
                <p className="text-sm text-muted-foreground mb-1"><strong>Amount:</strong> {s.amount}</p>
                <p className="text-sm text-muted-foreground"><strong>Deadline:</strong> {s.deadline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before You Apply Checklist */}
        <div className="max-w-3xl mx-auto mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Before You Apply</h3>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <ul className="space-y-3">
              {checkItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="w-5 h-5 rounded border-2 border-border flex items-center justify-center shrink-0" aria-hidden="true">☐</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Contact the institution to confirm these facilities before applying.</p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInst && (
          <Modal open={!!selectedInst} onClose={() => setSelectedInst(null)} title={selectedInst.name}>
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{selectedInst.level}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">DEMO DATA</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {selectedInst.address}, {selectedInst.city}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">{selectedInst.courses.map((c) => (<span key={c} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{c}</span>))}</div>
                <p className="text-sm mt-2"><strong>Mode:</strong> {selectedInst.mode}</p>
                <p className="text-sm"><strong>Accessibility Score:</strong> {selectedInst.score.toFixed(1)}/5</p>
              </div>

              <FeatureBlock title="Blind / Visual Support" emoji="🦯" features={selectedInst.blindFeatures} />
              <FeatureBlock title="Hearing Support" emoji="👂" features={selectedInst.hearingFeatures} />
              <FeatureBlock title="Mobility Support" emoji="♿" features={selectedInst.wheelchairFeatures} />
              <FeatureBlock title="Cognitive Support" emoji="🧠" features={selectedInst.cognitiveFeatures} />
              <FeatureBlock title="Examination Support" emoji="📝" features={selectedInst.examinationSupport} />
              <FeatureBlock title="Assistive Technology" emoji="💻" features={selectedInst.assistiveTechnology} />
              <FeatureBlock title="Student Support" emoji="🤝" features={selectedInst.studentSupport} />

              <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                <p className="text-sm"><strong>Hostel Available:</strong> {selectedInst.hostelAvailable ? "Yes" : "No"}</p>
                <p className="text-sm"><strong>Transport Accessible:</strong> {selectedInst.transportAccessible ? "Yes" : "No"}</p>
                <p className="text-sm"><strong>Admission Info:</strong> {selectedInst.admissionInfo}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">Verify admission requirements, fees, deadlines and accessibility facilities directly with the institution.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => { setSelectedInst(null); setContactInst(selectedInst); }} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Contact Admission Desk</button>
                <button onClick={() => setSelectedInst(null)} className="px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-accent transition-colors">Close</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactInst && (
          <Modal open={!!contactInst} onClose={() => setContactInst(null)} title={`Contact — ${contactInst.name}`}>
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong>Demo Contact Information</strong> — Sample data. Not a real institution.</p>
              </div>
              <div className="p-5 rounded-xl bg-muted/50 space-y-3">
                <h3 className="font-semibold text-foreground">Demo Admission Desk</h3>
                <p className="text-sm text-muted-foreground">Phone: +91 1800 000 9999</p>
                <p className="text-sm text-muted-foreground">Email: admissions@demo-accessbridge.org</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+9118000009999" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2" aria-label="Call admission desk (demo)"><Phone className="w-4 h-4" aria-hidden="true" />Call</a>
                <a href="mailto:admissions@demo-accessbridge.org" className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors inline-flex items-center gap-2"><Mail className="w-4 h-4" aria-hidden="true" />Email</a>
                <button className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors inline-flex items-center gap-2" aria-label="Send message"><MessageCircle className="w-4 h-4" aria-hidden="true" />Message</button>
              </div>
              <button onClick={() => setContactInst(null)} className="w-full px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold hover:bg-accent transition-colors">Close</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
