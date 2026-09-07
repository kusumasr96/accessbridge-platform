import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";

const timeSlots = [
  { time: "8:30 AM", activity: "Accessible transportation", icon: "🚌", detail: "Board wheelchair-accessible bus or request ride-share with accessibility features." },
  { time: "10:00 AM", activity: "Visit destination", icon: "📍", detail: "Arrive at your destination. Check for ramps, elevators and accessible entrances." },
  { time: "12:30 PM", activity: "Accessible dining option", icon: "🍽️", detail: "Lunch at a nearby restaurant with accessible seating and Braille menus." },
  { time: "2:00 PM", activity: "Nearby medical/emergency information", icon: "🏥", detail: "Note nearby hospitals and emergency services along your route." },
  { time: "4:00 PM", activity: "Return journey", icon: "🏠", detail: "Head home using accessible transportation. Rest and recharge." },
];

const accessibilityOptions = ["Blind / Visual", "Hearing", "Wheelchair", "Mobility", "Other"];

export default function DayPlanner() {
  const [showPlan, setShowPlan] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [need, setNeed] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPlan(true);
  };

  return (
    <section
      id="dayplanner"
      aria-labelledby="dayplanner-heading"
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
            id="dayplanner-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Plan My Accessible Day
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a personalised day plan with accessibility in mind.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleCreate}
            className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm"
            aria-label="Accessible day planner form"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="planner-from" className="block text-sm font-medium text-foreground mb-2">
                  From
                </label>
                <input
                  id="planner-from"
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Starting location"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="planner-to" className="block text-sm font-medium text-foreground mb-2">
                  To
                </label>
                <input
                  id="planner-to"
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Destination"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="planner-date" className="block text-sm font-medium text-foreground mb-2">
                  Date
                </label>
                <input
                  id="planner-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="planner-need" className="block text-sm font-medium text-foreground mb-2">
                  Accessibility requirement
                </label>
                <select
                  id="planner-need"
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">Select...</option>
                  {accessibilityOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Create My Plan
            </button>
          </form>

          {showPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
              role="region"
              aria-label="Your accessible day plan"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                Your Accessible Day Plan
              </h3>
              <div className="space-y-0">
                {timeSlots.map((slot, i) => (
                  <div
                    key={slot.time}
                    className="flex gap-4 pb-6 relative"
                  >
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0" aria-hidden="true">
                        {slot.icon}
                      </div>
                      {i < timeSlots.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {slot.time}
                      </div>
                      <h4 className="text-foreground font-semibold mt-1">{slot.activity}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{slot.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" role="note">
                <p className="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  This is a demonstration feature. Verify accessibility and
                  travel information before your journey.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
