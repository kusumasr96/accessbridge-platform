import { motion } from "framer-motion";
import { MapPin, Users, Building2, Globe, Award, Heart } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    number: "10,000+",
    label: "Accessible Places Listed",
    description: "Verified locations with detailed accessibility information",
  },
  {
    icon: Users,
    number: "50,000+",
    label: "Users Worldwide",
    description: "People using AccessBridge to navigate the world more independently",
  },
  {
    icon: Building2,
    number: "2,500+",
    label: "Organisations Joined",
    description: "Businesses and institutions committed to accessibility",
  },
  {
    icon: Globe,
    number: "85+",
    label: "Countries Served",
    description: "Global coverage across continents and cultures",
  },
  {
    icon: Award,
    number: "98%",
    label: "User Satisfaction",
    description: "Rated excellent by our community of users",
  },
  {
    icon: Heart,
    number: "1M+",
    label: "Barriers Reported",
    description: "Community-reported accessibility barriers helping improve locations",
  },
];

const testimonials = [
  {
    quote:
      "AccessBridge changed how I navigate the city. I can finally plan my day independently knowing every place I visit is accessible.",
    author: "Maria S.",
    role: "Wheelchair User",
    avatar: "👩‍🦽",
  },
  {
    quote:
      "As a blind developer, finding accessible workplaces was always stressful. AccessBridge connected me with inclusive employers who truly understand my needs.",
    author: "James T.",
    role: "Software Engineer",
    avatar: "👨‍🦯",
  },
  {
    quote:
      "My son is autistic, and AccessBridge helped us find restaurants and venues that accommodate sensory needs. It's made family outings so much easier.",
    author: "Rachel K.",
    role: "Parent & Caregiver",
    avatar: "👩‍👧",
  },
];

export default function SocialProof() {
  return (
    <>
      {/* Stats Section */}
      <section
        aria-labelledby="stats-heading"
        className="py-20 lg:py-28 bg-primary/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              id="stats-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Making a Real Difference
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our growing community is building a more accessible world, one
              step at a time.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              📋 The following statistics are for demonstration purposes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon
                      className="w-6 h-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        aria-labelledby="testimonial-heading"
        className="py-20 lg:py-28 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              id="testimonial-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              What Our Community Says
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from people whose lives have been impacted by
              accessible technology and inclusive design.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              📋 The following testimonials are for demonstration purposes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex-1">
                  <div className="text-3xl text-primary/20 mb-2" aria-hidden="true">
                    &ldquo;
                  </div>
                  <p className="text-foreground text-sm leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border">
                  <div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl"
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
