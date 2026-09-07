export type OpportunityType = "Remote" | "Internship" | "Full-time" | "Part-time" | "Scholarship" | "Training" | "Flexible";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: OpportunityType;
  description: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  accessibilitySupport: string[];
  benefits: string[];
  accessibilityTags: string[];
  deadline?: string;
  eligibility?: string;
  skillsCovered?: string[];
  duration?: string;
  mode?: string;
}

export const allOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Junior Software Developer",
    organization: "AccessTech Solutions",
    location: "Remote",
    type: "Full-time",
    description: "Join our team building accessible technology solutions. We provide screen readers, voice tools and flexible work arrangements.",
    aboutRole: "You will work on building web and mobile applications with accessibility at the forefront. Our team values inclusive design and ensures all products meet WCAG 2.1 AA standards.",
    responsibilities: [
      "Develop accessible web applications",
      "Write semantic HTML and ARIA-compliant components",
      "Collaborate with design team on accessible UI patterns",
      "Write automated accessibility tests",
      "Participate in code reviews with accessibility focus",
    ],
    requirements: [
      "1-2 years experience with React or similar framework",
      "Understanding of web accessibility standards",
      "Familiarity with screen readers",
      "Strong problem-solving skills",
      "Good communication abilities",
    ],
    accessibilitySupport: ["Flexible working hours", "Accessible digital tools", "Screen-reader-friendly workplace", "Flexible communication methods", "Remote work option", "Assistive technology provided"],
    benefits: ["Flexible work arrangements", "Learning opportunities", "Mentorship programme", "Inclusive workplace", "Health insurance", "Annual retreat"],
    accessibilityTags: ["Screen Reader Support", "Flexible Work", "Remote Work", "Assistive Technology", "Accessible Workplace"],
  },
  {
    id: "opp-2",
    title: "UI/UX Design Intern",
    organization: "Inclusive Design Co.",
    location: "Hybrid — City Center",
    type: "Internship",
    description: "Learn inclusive design principles while working on real products. Great for students interested in accessibility.",
    aboutRole: "This internship offers hands-on experience in designing accessible user interfaces. You will work alongside senior designers who specialise in inclusive design.",
    responsibilities: [
      "Assist in creating accessible wireframes and prototypes",
      "Conduct accessibility audits on existing designs",
      "Research inclusive design patterns",
      "Create accessible component libraries",
      "Document accessibility guidelines",
    ],
    requirements: [
      "Currently studying design, HCI or related field",
      "Interest in accessibility and inclusive design",
      "Basic knowledge of Figma or similar tools",
      "Willingness to learn",
    ],
    accessibilitySupport: ["Flexible schedule", "Mentorship programme", "Accessible workspace", "Screen-reader-compatible design tools"],
    benefits: ["Paid internship", "Portfolio projects", "Mentorship", "Certificate of completion", "Potential full-time offer"],
    accessibilityTags: ["Flexible Work", "Accessible Workplace", "Screen Reader Support"],
  },
  {
    id: "opp-3",
    title: "Accessibility Tester",
    organization: "QA Access Labs",
    location: "Remote",
    type: "Part-time",
    description: "Test websites and applications for accessibility compliance using various assistive technologies.",
    aboutRole: "As an Accessibility Tester, you will use screen readers, keyboard navigation and other assistive technologies to identify accessibility barriers in digital products.",
    responsibilities: [
      "Test web applications with screen readers (NVDA, JAWS, VoiceOver)",
      "Perform keyboard navigation testing",
      "Document accessibility issues with clear descriptions",
      "Verify WCAG 2.1 compliance",
      "Provide recommendations for fixes",
    ],
    requirements: [
      "Experience using at least one screen reader",
      "Knowledge of WCAG 2.1 guidelines",
      "Attention to detail",
      "Clear written communication",
    ],
    accessibilitySupport: ["Fully remote", "Flexible hours", "Accessible testing tools provided", "Captioned meetings"],
    benefits: ["Competitive hourly rate", "Flexible schedule", "Skill development", "Meaningful work"],
    accessibilityTags: ["Screen Reader Support", "Remote Work", "Flexible Work", "Captioned Communication", "Assistive Technology"],
  },
  {
    id: "opp-4",
    title: "Data Entry Assistant",
    organization: "DataBridge Services",
    location: "Remote",
    type: "Flexible",
    description: "Accurate data entry and management with accessible tools and flexible scheduling.",
    aboutRole: "This role involves entering and verifying data using our accessible data management platform. Perfect for individuals who prefer flexible working arrangements.",
    responsibilities: [
      "Enter data accurately into databases",
      "Verify data quality and completeness",
      "Maintain data records",
      "Generate reports as needed",
    ],
    requirements: [
      "Good typing skills",
      "Attention to detail",
      "Basic computer knowledge",
      "Reliable internet connection",
    ],
    accessibilitySupport: ["Flexible working hours", "Accessible data tools", "Remote work", "Screen-reader-compatible interface"],
    benefits: ["Flexible schedule", "Work from home", "Training provided", "Supportive team"],
    accessibilityTags: ["Flexible Work", "Remote Work", "Screen Reader Support", "Assistive Technology"],
  },
  {
    id: "opp-5",
    title: "Digital Marketing Intern",
    organization: "AccessBridge Academy",
    location: "Remote",
    type: "Internship",
    description: "Learn digital marketing in an inclusive environment with hands-on experience in content creation and social media.",
    aboutRole: "Gain practical experience in digital marketing while working in a fully accessible remote environment. Learn SEO, content writing, social media and email marketing.",
    responsibilities: [
      "Create accessible social media content",
      "Assist with email marketing campaigns",
      "Write blog posts about accessibility",
      "Analyse campaign performance",
      "Research accessibility trends",
    ],
    requirements: [
      "Interest in digital marketing",
      "Basic writing skills",
      "Familiarity with social media platforms",
      "Eagerness to learn",
    ],
    accessibilitySupport: ["Remote work", "Flexible hours", "Captioned video calls", "Accessible marketing tools"],
    benefits: ["Paid internship", "Portfolio building", "Mentorship", "Certificate"],
    accessibilityTags: ["Remote Work", "Flexible Work", "Captioned Communication"],
  },
  {
    id: "opp-6",
    title: "Customer Support Associate",
    organization: "AccessConnect",
    location: "Remote",
    type: "Full-time",
    description: "Provide customer support through multiple accessible channels including phone, chat and email.",
    aboutRole: "Help customers resolve issues and answer questions through accessible communication channels. Training provided on all tools and processes.",
    responsibilities: [
      "Respond to customer enquiries via phone, chat and email",
      "Resolve issues within defined timelines",
      "Document customer interactions",
      "Escalate complex issues to appropriate teams",
      "Contribute to knowledge base articles",
    ],
    requirements: [
      "Good communication skills",
      "Patience and empathy",
      "Basic computer skills",
      "Ability to multitask",
    ],
    accessibilitySupport: ["Remote work option", "Captioned phone calls", "Screen-reader-compatible tools", "Flexible shifts", "Accessible workplace"],
    benefits: ["Competitive salary", "Health insurance", "Training programme", "Career growth", "Inclusive team"],
    accessibilityTags: ["Remote Work", "Captioned Communication", "Screen Reader Support", "Accessible Workplace", "Flexible Work"],
  },
  {
    id: "opp-7",
    title: "Digital Skills Training Program",
    organization: "AccessBridge Academy",
    location: "Online",
    type: "Training",
    description: "A 12-week program teaching digital skills with full assistive technology support and inclusive curriculum.",
    aboutRole: "This comprehensive training programme teaches essential digital skills including computer basics, internet safety, office applications and introductory programming. Fully accessible with screen reader support, captioned videos and accessible course materials.",
    responsibilities: [
      "Complete weekly modules and assignments",
      "Attend accessible online sessions",
      "Practice skills in accessible virtual labs",
      "Complete final project",
    ],
    requirements: [
      "Basic literacy",
      "Access to a computer or mobile device",
      "Internet connection",
      "Willingness to learn",
    ],
    accessibilitySupport: ["Screen-reader-compatible platform", "Captioned video lectures", "Audio materials available", "Accessible assessments", "Dedicated support coordinator"],
    benefits: ["Certificate of completion", "Job placement assistance", "Mentorship", "Networking", "Equipment loan programme"],
    skillsCovered: ["Computer basics", "Internet and email", "Office applications", "Digital safety", "Intro to coding", "Job search skills"],
    accessibilityTags: ["Screen Reader Support", "Captioned Communication", "Assistive Technology", "Flexible Work"],
    duration: "12 weeks",
    mode: "Online",
  },
  {
    id: "opp-8",
    title: "Sample Disability Scholarship",
    organization: "AccessBridge Foundation",
    location: "Online",
    type: "Scholarship",
    description: "Scholarship for students with disabilities to learn and receive assistive technology equipment.",
    aboutRole: "This scholarship supports students with disabilities in pursuing education by providing financial assistance and assistive technology equipment.",
    responsibilities: [
      "Maintain minimum academic performance",
      "Participate in mentorship sessions",
      "Complete a community service project",
    ],
    requirements: [
      "Enrolled in a recognised educational institution",
      "Documented disability",
      "Demonstrated financial need",
      "Academic good standing",
    ],
    accessibilitySupport: ["Equipment provided", "Mentorship", "Flexible deadlines", "Accessible application process"],
    benefits: ["Up to ₹1,00,000 funding", "Assistive technology equipment", "Mentorship programme", "Networking opportunities"],
    eligibility: "Students with disabilities enrolled in recognised institutions",
    deadline: "Rolling applications — check website for current cycle",
    accessibilityTags: ["Assistive Technology", "Flexible Work", "Screen Reader Support"],
  },
];

export const allFilterOptions = ["All", "Remote", "Internship", "Full-time", "Scholarship", "Training"];

export const accessibilitySupportOptions = [
  "All", "Screen Reader Support", "Flexible Work", "Remote Work",
  "Captioned Communication", "Assistive Technology", "Accessible Workplace",
];

export function filterOpportunities(
  typeFilter: string | null,
  accessFilter: string,
): Opportunity[] {
  return allOpportunities.filter((o) => {
    const typeMatch = !typeFilter || typeFilter === "All" || o.type === typeFilter || (typeFilter === "Remote" && o.location.toLowerCase().includes("remote"));
    const accessMatch = !accessFilter || accessFilter === "All" || o.accessibilityTags.includes(accessFilter);
    return typeMatch && accessMatch;
  });
}
