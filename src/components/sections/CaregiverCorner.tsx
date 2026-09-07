import { motion } from "framer-motion";
import { MessageCircle, BookOpen, HandHeart, Monitor, CalendarCheck } from "lucide-react";

const caregiverResources = [
  {
    icon: MessageCircle,
    title: "Communication Support",
    description: "Learn effective communication strategies for different disabilities. Discover tools and techniques for clearer interaction.",
    items: ["AAC devices and apps", "Communication boards", "Simplified language guides"],
  },
  {
    icon: BookOpen,
    title: "Accessible Education",
    description: "Help learners access education with the right support. Learn about inclusive classrooms and accessible materials.",
    items: ["Adaptive learning tools", "Classroom modifications", "Assessment accommodations"],
  },
  {
    icon: HandHeart,
    title: "Daily Assistance",
    description: "Practical tips for supporting daily activities while encouraging independence and dignity.",
    items: ["Morning routines", "Meal preparation aids", "Transportation planning"],
  },
  {
    icon: Monitor,
    title: "Technology Guides",
    description: "Learn how to set up and use assistive technology for the people you support.",
    items: ["Screen reader setup", "Voice assistant configuration", "Accessible device selection"],
  },
  {
    icon: CalendarCheck,
    title: "Accessibility Planning",
    description: "Plan accessible outings, events and activities with confidence using our planning guides.",
    items: ["Venue accessibility checklists", "Travel preparation", "Emergency planning"],
  },
];

export default function CaregiverCorner() {
  return (
    <section
      id="caregiver"
      aria-labelledby="caregiver-heading"
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
            id="caregiver-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Caregiver Corner
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated resources for parents, family members, caregivers, teachers
            and volunteers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caregiverResources.map((res, i) => {
            const Icon = res.icon;
            return (
              <motion.article
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
                <ul className="space-y-1.5" role="list">
                  {res.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
