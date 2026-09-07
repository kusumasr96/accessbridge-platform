import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Award } from "lucide-react";

const allJobs = [
  {
    title: "Junior Software Developer",
    company: "AccessTech Solutions",
    location: "Remote",
    type: "Remote",
    tags: ["Flexible workplace", "Accessible digital tools", "Full-time"],
    description: "Join our team building accessible technology solutions. We provide screen readers, voice tools and flexible work arrangements.",
  },
  {
    title: "UI/UX Design Intern",
    company: "Inclusive Design Co.",
    location: "Hybrid — City Center",
    type: "Internship",
    tags: ["Inclusive workplace", "Mentorship program"],
    description: "Learn inclusive design principles while working on real products. Great for students interested in accessibility.",
  },
  {
    title: "Digital Skills Program",
    company: "AccessBridge Academy",
    location: "Online",
    type: "Training",
    tags: ["Certificate", "Assistive technology support", "Scholarship available"],
    description: "A 12-week program teaching digital skills with full assistive technology support.",
  },
  {
    title: "Accessibility Consultant",
    company: "Barrier-Free Consulting",
    location: "Remote",
    type: "Full-time",
    tags: ["Flexible schedule", "Accessibility audits"],
    description: "Help organisations audit and improve the accessibility of their products and services.",
  },
  {
    title: "Community Outreach Coordinator",
    company: "AccessBridge",
    location: "Hybrid",
    type: "Full-time",
    tags: ["Inclusive team", "Social impact"],
    description: "Connect with disability communities and help spread awareness about accessible resources.",
  },
  {
    title: "Assistive Technology Scholarship",
    company: "AccessBridge Foundation",
    location: "Online",
    type: "Scholarship",
    tags: ["Fully funded", "Equipment provided"],
    description: "Scholarship for students with disabilities to learn and receive assistive technology equipment.",
  },
];

const filters = ["Remote", "Internship", "Full-time", "Scholarship", "Training"];

export default function Jobs() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? allJobs.filter((j) => j.tags.includes(activeFilter) || j.type === activeFilter)
    : allJobs;

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
          <h2
            id="jobs-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Opportunities Without Barriers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find inclusive job opportunities, training programs and scholarships.
            All listings shown are demo content.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="toolbar" aria-label="Job filters">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeFilter ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
            aria-pressed={!activeFilter}
          >
            All
          </button>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Demo notice */}
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" role="note">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
            📋 <strong>Demo Content:</strong> These are sample listings for
            illustration. A production version would connect to verified job
            boards.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4" role="region" aria-label="Job listings">
          {filtered.map((job, i) => (
            <motion.article
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {job.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium whitespace-nowrap">
                  {job.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{job.company}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {job.location}
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
