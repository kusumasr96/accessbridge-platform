import { motion } from "framer-motion";
import { Heart, Target, Shield, Lightbulb, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Inclusion First",
    description:
      "We believe accessibility is a right, not a privilege. Every decision we make starts with the question: who might be excluded by this?",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    description:
      "Our mission is to bridge the gap between people and possibilities, creating technology that removes barriers rather than creating them.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "We build with privacy, security and dignity at the core. Your data is yours and your experience is respected.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage AI, voice technology and inclusive design to create tools that truly serve people with diverse needs.",
  },
  {
    icon: Users,
    title: "Community-Led",
    description:
      "We work alongside people with disabilities, caregivers and advocates — not just for them. Nothing about us without us.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Accessibility is universal. We design for diverse cultures, languages and accessibility needs across the world.",
  },
];

const team = [
  {
    name: "Dr. Maya Patel",
    role: "Founder & CEO",
    bio: "Accessibility researcher and advocate with over 15 years of experience in inclusive technology.",
    avatar: "👩‍💼",
  },
  {
    name: "James Okafor",
    role: "Chief Technology Officer",
    bio: "Former assistive technology engineer passionate about building tools that empower people with disabilities.",
    avatar: "👨‍💻",
  },
  {
    name: "Lin Zhang",
    role: "Head of Design",
    bio: "Inclusive design specialist who has worked with major tech companies on accessible product development.",
    avatar: "👩‍🎨",
  },
  {
    name: "Dr. Samuel Brooks",
    role: "Head of Accessibility",
    bio: "Blind since birth, Samuel brings lived experience and deep expertise in assistive technology and accessibility standards.",
    avatar: "👨‍🔬",
  },
];

export default function About() {
  return (
    <>
      {/* Mission Section */}
      <section
        id="about"
        aria-labelledby="about-heading"
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
              id="about-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              About AccessBridge
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AccessBridge was founded on a simple belief: technology should
              remove barriers, not create them. We are a team of technologists,
              designers, accessibility experts and people with lived experience
              working together to build a more inclusive digital world.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-primary/5 border border-primary/10 mb-16"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto">
                To bridge the gap between people and possibilities by creating a
                digital platform that helps people with disabilities — blind and
                visually impaired users, as well as people with hearing, mobility,
                speech, and cognitive disabilities — find accessible places,
                resources, opportunities and assistive technology.
              </p>
            </motion.div>

            {/* Important Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-16"
              role="note"
            >
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Important Notice
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                AccessBridge is an information and resource platform. It is{" "}
                <strong>not</strong> a replacement for professional accessibility
                services, emergency services, or medical advice. Always verify
                accessibility information before visiting a location. In case of
                emergency, contact your local emergency services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        aria-labelledby="values-heading"
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
              id="values-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Our Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything we build is guided by these core principles.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        aria-labelledby="team-heading"
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
              id="team-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate people working together to make the world more
              accessible.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              📋 The following are representative team profiles for demonstration
              purposes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4"
                  aria-hidden="true"
                >
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {member.bio}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
