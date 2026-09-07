import { motion } from "framer-motion";
import { Quote, Pen } from "lucide-react";

const stories = [
  {
    name: "Sarah M.",
    role: "Software Developer",
    avatar: "👩‍💻",
    story:
      "Technology helped me become more independent. As a blind software developer, screen readers and voice tools have been transformative. AccessBridge connected me with resources I never knew existed. I found an inclusive employer, accessible tools for my workspace, and a community that understands my needs.",
    topic: "Blindness & Technology",
  },
  {
    name: "David K.",
    role: "University Student",
    avatar: "👨‍🎓",
    story:
      "After a car accident left me with limited mobility, I thought university was off the table. But AccessBridge showed me scholarships, accessible campus information, and assistive technology options. I'm now in my second year studying engineering with full wheelchair accessibility support.",
    topic: "Mobility & Education",
  },
  {
    name: "Aisha L.",
    role: "Mother & Caregiver",
    avatar: "👩‍👧",
    story:
      "My daughter is deaf, and finding the right school with sign-language support was overwhelming. AccessBridge simplified everything — from locating schools with interpreters to finding communication tools. The Caregiver Corner gave me practical advice that made a real difference in our daily life.",
    topic: "Hearing & Caregiving",
  },
];

export default function CommunityStories() {
  return (
    <section
      id="community"
      aria-labelledby="stories-heading"
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
            id="stories-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Stories That Inspire Change
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Read stories from people whose lives have been impacted by accessible
            technology and inclusive design.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            📋 The following are sample stories for demonstration purposes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" aria-hidden="true" />
              <p className="text-foreground text-sm leading-relaxed mb-6">
                {story.story}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl" aria-hidden="true">
                  {story.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.role}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-xs font-medium">
                  {story.topic}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-accent transition-colors"
            aria-label="Share your accessibility story"
          >
            <Pen className="w-5 h-5" aria-hidden="true" />
            Share Your Story
          </button>
        </motion.div>
      </div>
    </section>
  );
}
