import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Briefcase, Scale, Cpu, Users, Search } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Disability Awareness",
    description: "Understand different types of disabilities and how to create more inclusive environments.",
    articles: ["Introduction to Disability Types", "Communication Etiquette", "Inclusive Language Guide"],
  },
  {
    icon: GraduationCap,
    title: "Education Resources",
    description: "Accessible learning materials, inclusive education strategies and academic support.",
    articles: ["Accessible Learning Platforms", "Study Techniques for Different Needs", "Inclusive Classroom Strategies"],
  },
  {
    icon: Briefcase,
    title: "Career Resources",
    description: "Job search tips, workplace accommodations and career development for people with disabilities.",
    articles: ["Resume Writing Tips", "Workplace Accommodation Guide", "Interview Preparation"],
  },
  {
    icon: Scale,
    title: "Rights & Accessibility Information",
    description: "Know your rights. Learn about disability legislation, accessibility standards and advocacy.",
    articles: ["Disability Rights Overview", "ADA Information", "UN Convention on Disability Rights"],
  },
  {
    icon: Cpu,
    title: "Assistive Technology",
    description: "Guides to choosing, using and getting the most from assistive technology devices.",
    articles: ["Screen Reader Setup Guide", "Voice Control Setup", "Choosing Braille Displays"],
  },
  {
    icon: Users,
    title: "Caregiver Resources",
    description: "Support materials for parents, family members, teachers and care workers.",
    articles: ["Supporting Daily Activities", "Emotional Wellbeing", "Finding Community Support"],
  },
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = resources.filter((r) =>
    !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
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
            id="resources-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Learn. Understand. Empower.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our education and resource centre to build your knowledge and
            confidence.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="resource-search" className="sr-only">Search resources</label>
            <input
              id="resource-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res, i) => {
            const Icon = res.icon;
            return (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {res.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {res.description}
                </p>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="text-sm text-primary font-medium hover:underline"
                  aria-expanded={expanded === i}
                >
                  {expanded === i ? "Show less" : `View ${res.articles.length} articles`}
                </button>
                {expanded === i && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 space-y-1"
                    role="list"
                  >
                    {res.articles.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-foreground p-2 rounded-lg hover:bg-muted/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
