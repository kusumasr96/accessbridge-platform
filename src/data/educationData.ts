export interface EducationInstitution {
  id: string;
  name: string;
  city: string;
  address: string;
  level: "School" | "College" | "University" | "Vocational / Skill Training";
  courses: string[];
  score: number;
  blindFeatures: string[];
  hearingFeatures: string[];
  wheelchairFeatures: string[];
  cognitiveFeatures: string[];
  examinationSupport: string[];
  assistiveTechnology: string[];
  studentSupport: string[];
  hostelAvailable: boolean;
  transportAccessible: boolean;
  admissionInfo: string;
  phone: string;
  email: string;
  mode: "Offline" | "Online" | "Hybrid";
  whyMatches?: string;
}

const e = (o: Partial<EducationInstitution> & Pick<EducationInstitution, "name" | "city" | "level">): EducationInstitution => ({
  id: `${o.city.toLowerCase().replace(/\s+/g, "-")}-${o.name.toLowerCase().replace(/\s+/g, "-")}`,
  address: o.city,
  courses: ["General Studies"],
  score: 4.0 + Math.random() * 0.8,
  blindFeatures: ["Braille resources", "Screen-reader-friendly content", "Audio learning materials", "Tactile guidance"],
  hearingFeatures: ["Captioned learning materials", "Sign-language support", "Visual announcements"],
  wheelchairFeatures: ["Ramps", "Elevators", "Accessible classrooms", "Accessible restrooms"],
  cognitiveFeatures: ["Simplified learning materials", "Academic support"],
  examinationSupport: ["Extended time", "Accessible exam materials", "Separate seating"],
  assistiveTechnology: ["Screen readers available", "Assistive tech lab", "JAWS/NVDA licences"],
  studentSupport: ["Disability support office", "Counselling services", "Peer mentoring"],
  hostelAvailable: true,
  transportAccessible: true,
  admissionInfo: "Visit the institution website or admission office for current details.",
  phone: "+91 1800 000 9999",
  email: "admissions@demo-accessbridge.org",
  mode: "Offline",
  ...o,
});

export const allInstitutions: EducationInstitution[] = [
  // ═══════════════════ DELHI ═══════════════════
  e({ name: "Delhi Public School", city: "Delhi", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.5, mode: "Offline" }),
  e({ name: "Modern School", city: "Delhi", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.4, mode: "Offline" }),
  e({ name: "University of Delhi", city: "Delhi", level: "University", courses: ["Computer Science", "Engineering", "Commerce", "Arts", "Science", "Management"], score: 4.6, mode: "Offline" }),
  e({ name: "IIT Delhi", city: "Delhi", level: "College", courses: ["Computer Science", "Engineering"], score: 4.8, mode: "Offline" }),
  e({ name: "National Skill Training Institute", city: "Delhi", level: "Vocational / Skill Training", courses: ["Vocational", "Other"], score: 4.1, mode: "Hybrid" }),

  // ═══════════════════ BENGALURU ═══════════════════
  e({ name: "Bishop Cotton Boys School", city: "Bengaluru", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.5, mode: "Offline" }),
  e({ name: "St. Josephs College of Commerce", city: "Bengaluru", level: "College", courses: ["Commerce", "Arts", "Management"], score: 4.4, mode: "Offline" }),
  e({ name: "Indian Institute of Science", city: "Bengaluru", level: "University", courses: ["Computer Science", "Engineering", "Science"], score: 4.9, mode: "Offline" }),
  e({ name: "Christ University", city: "Bengaluru", level: "College", courses: ["Computer Science", "Commerce", "Arts", "Management"], score: 4.5, mode: "Offline" }),
  e({ name: "Bengaluru Tech Academy", city: "Bengaluru", level: "Vocational / Skill Training", courses: ["Vocational", "Computer Science"], score: 4.2, mode: "Hybrid" }),

  // ═══════════════════ MUMBAI ═══════════════════
  e({ name: "Cathedral and John Connon School", city: "Mumbai", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.6, mode: "Offline" }),
  e({ name: "St. Xavier's College", city: "Mumbai", level: "College", courses: ["Commerce", "Arts", "Science"], score: 4.5, mode: "Offline" }),
  e({ name: "University of Mumbai", city: "Mumbai", level: "University", courses: ["Computer Science", "Engineering", "Commerce", "Arts", "Science", "Management"], score: 4.3, mode: "Offline" }),
  e({ name: "IIT Bombay", city: "Mumbai", level: "College", courses: ["Computer Science", "Engineering"], score: 4.9, mode: "Offline" }),
  e({ name: "Mumbai Skills Institute", city: "Mumbai", level: "Vocational / Skill Training", courses: ["Vocational", "Other"], score: 4.0, mode: "Hybrid" }),

  // ═══════════════════ CHENNAI ═══════════════════
  e({ name: "D.A.V. Public School", city: "Chennai", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.3, mode: "Offline" }),
  e({ name: "Loyola College", city: "Chennai", level: "College", courses: ["Commerce", "Arts", "Science", "Computer Science"], score: 4.4, mode: "Offline" }),
  e({ name: "Anna University", city: "Chennai", level: "University", courses: ["Computer Science", "Engineering", "Science", "Management"], score: 4.5, mode: "Offline" }),
  e({ name: "IIT Madras", city: "Chennai", level: "College", courses: ["Computer Science", "Engineering"], score: 4.9, mode: "Offline" }),
  e({ name: "Chennai Digital Academy", city: "Chennai", level: "Vocational / Skill Training", courses: ["Vocational", "Computer Science"], score: 4.1, mode: "Hybrid" }),

  // ═══════════════════ HYDERABAD ═══════════════════
  e({ name: "Hyderabad Public School", city: "Hyderabad", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.5, mode: "Offline" }),
  e({ name: "Osmania University", city: "Hyderabad", level: "University", courses: ["Computer Science", "Engineering", "Commerce", "Arts", "Science", "Management"], score: 4.3, mode: "Offline" }),
  e({ name: "Indian School of Business", city: "Hyderabad", level: "College", courses: ["Management"], score: 4.7, mode: "Offline" }),
  e({ name: "JNTU Hyderabad", city: "Hyderabad", level: "College", courses: ["Computer Science", "Engineering"], score: 4.4, mode: "Offline" }),
  e({ name: "Hyderabad Skill Development Centre", city: "Hyderabad", level: "Vocational / Skill Training", courses: ["Vocational", "Other"], score: 4.0, mode: "Hybrid" }),

  // ═══════════════════ PUNE ═══════════════════
  e({ name: "The Orchid School", city: "Pune", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.4, mode: "Offline" }),
  e({ name: "Symbiosis International University", city: "Pune", level: "University", courses: ["Computer Science", "Commerce", "Arts", "Management"], score: 4.6, mode: "Offline" }),
  e({ name: "Fergusson College", city: "Pune", level: "College", courses: ["Science", "Arts", "Commerce"], score: 4.3, mode: "Offline" }),
  e({ name: "Savitribai Phule Pune University", city: "Pune", level: "University", courses: ["Computer Science", "Engineering", "Commerce", "Arts", "Science"], score: 4.4, mode: "Offline" }),
  e({ name: "Pune Institute of Technology Skills", city: "Pune", level: "Vocational / Skill Training", courses: ["Vocational", "Computer Science"], score: 4.1, mode: "Hybrid" }),

  // ═══════════════════ MYSURU ═══════════════════
  e({ name: "TheVidyaVikas School", city: "Mysuru", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.2, mode: "Offline" }),
  e({ name: "University of Mysore", city: "Mysuru", level: "University", courses: ["Computer Science", "Engineering", "Commerce", "Arts", "Science"], score: 4.3, mode: "Offline" }),
  e({ name: "JSS Science and Technology University", city: "Mysuru", level: "College", courses: ["Computer Science", "Engineering"], score: 4.4, mode: "Offline" }),
  e({ name: "Mysuru Skill Development Academy", city: "Mysuru", level: "Vocational / Skill Training", courses: ["Vocational", "Other"], score: 4.0, mode: "Hybrid" }),

  // ═══════════════════ KOLKATA ═══════════════════
  e({ name: "La Martiniere for Boys", city: "Kolkata", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.5, mode: "Offline" }),
  e({ name: "Presidency University", city: "Kolkata", level: "University", courses: ["Science", "Arts", "Commerce"], score: 4.4, mode: "Offline" }),
  e({ name: "Jadavpur University", city: "Kolkata", level: "University", courses: ["Computer Science", "Engineering", "Science", "Arts"], score: 4.5, mode: "Offline" }),
  e({ name: "IIT Kharagpur", city: "Kolkata", level: "College", courses: ["Computer Science", "Engineering"], score: 4.8, mode: "Offline" }),
  e({ name: "Kolkata Vocational Institute", city: "Kolkata", level: "Vocational / Skill Training", courses: ["Vocational", "Other"], score: 4.0, mode: "Hybrid" }),

  // ═══════════════════ KOCHI ═══════════════════
  e({ name: "Chinmaya Vidyalaya", city: "Kochi", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.3, mode: "Offline" }),
  e({ name: "Cochin University of Science and Technology", city: "Kochi", level: "University", courses: ["Computer Science", "Engineering", "Science"], score: 4.5, mode: "Offline" }),
  e({ name: "Mahatma Gandhi University", city: "Kochi", level: "University", courses: ["Commerce", "Arts", "Science", "Management"], score: 4.2, mode: "Offline" }),
  e({ name: "Kochi Technical Institute", city: "Kochi", level: "Vocational / Skill Training", courses: ["Vocational", "Engineering"], score: 4.1, mode: "Hybrid" }),

  // ═══════════════════ AHMEDABAD ═══════════════════
  e({ name: "Shreyas School", city: "Ahmedabad", level: "School", courses: ["Science", "Commerce", "Arts"], score: 4.2, mode: "Offline" }),
  e({ name: "Gujarat University", city: "Ahmedabad", level: "University", courses: ["Commerce", "Arts", "Science", "Management"], score: 4.3, mode: "Offline" }),
  e({ name: "IIM Ahmedabad", city: "Ahmedabad", level: "College", courses: ["Management"], score: 4.9, mode: "Offline" }),
  e({ name: "Ahmedabad Textile Industry Research Association", city: "Ahmedabad", level: "Vocational / Skill Training", courses: ["Vocational", "Other"], score: 4.0, mode: "Offline" }),
];

export const educationLevels = ["School", "College", "University", "Vocational / Skill Training"];
export const accessibilityNeedOptions = ["Blind / Visual", "Hearing", "Wheelchair / Mobility", "Speech / Communication", "Cognitive", "Multiple Disabilities"];
export const courseOptions = ["Computer Science", "Engineering", "Commerce", "Arts", "Science", "Management", "Vocational", "Other"];

export const scholarships = [
  {
    name: "National Scholarship for Students with Disabilities",
    eligibility: "Students with 40% or more disability enrolled in recognized institutions",
    level: "School, College, University",
    support: "Tuition fees, maintenance allowance, book grant",
    deadline: "Check official government website for current deadlines",
    category: "Scholarships",
    amount: "Up to ₹1,00,000 per year",
    url: "https://www.disabledstudents.gov.in",
  },
  {
    name: "Post-Matric Scholarship for SC/ST/OBC Students with Disabilities",
    eligibility: "SC/ST/OBC students with disability, post-matriculation",
    level: "College, University",
    support: "Full tuition, stipend, book allowance",
    deadline: "Check official government website",
    category: "Financial Assistance",
    amount: "Full tuition + ₹2,000/month stipend",
    url: "https://www.socialjustice.gov.in",
  },
  {
    name: "Assistive Technology Grant Programme",
    eligibility: "Students with visual, hearing or mobility disabilities",
    level: "School, College, University",
    support: "Braille displays, screen readers, hearing aids, wheelchairs",
    deadline: "Rolling applications",
    category: "Assistive Technology Support",
    amount: "Up to ₹50,000 per student",
    url: "#",
  },
  {
    name: "Accessible Hostel Subsidy Scheme",
    eligibility: "Students with disabilities studying away from home",
    level: "College, University",
    support: "Hostel accommodation subsidy, accessible room allocation",
    deadline: "At time of admission",
    category: "Hostel Support",
    amount: "Up to ₹30,000 per year",
    url: "#",
  },
  {
    name: "Disability Education Support Fund",
    eligibility: "Students from economically weaker sections with any disability",
    level: "School, College, University",
    support: "Tuition fees, transport, study materials",
    deadline: "Check institution websites",
    category: "Education Support",
    amount: "Up to ₹75,000 per year",
    url: "#",
  },
  {
    name: "Accessible Transportation Allowance",
    eligibility: "Students with mobility disabilities commuting to educational institutions",
    level: "School, College, University",
    support: "Monthly transport allowance for accessible vehicles",
    deadline: "At time of admission",
    category: "Accessible Transportation",
    amount: "Up to ₹5,000 per month",
    url: "#",
  },
];

export function searchInstitutions(
  cityQuery: string,
  level: string,
  accessNeed: string,
  course: string,
): EducationInstitution[] {
  return allInstitutions.filter((inst) => {
    if (cityQuery) {
      const q = cityQuery.toLowerCase().trim();
      if (!inst.city.toLowerCase().includes(q)) return false;
    }
    if (level && level !== "All Levels" && inst.level !== level) return false;
    if (course && course !== "All Courses" && !inst.courses.some(c => c.toLowerCase() === course.toLowerCase())) return false;
    if (accessNeed && accessNeed !== "All Needs") {
      if (accessNeed === "Blind / Visual" && inst.blindFeatures.length === 0) return false;
      if (accessNeed === "Hearing" && inst.hearingFeatures.length === 0) return false;
      if (accessNeed === "Wheelchair / Mobility" && inst.wheelchairFeatures.length === 0) return false;
      if (accessNeed === "Speech / Communication") return false;
      if (accessNeed === "Cognitive" && inst.cognitiveFeatures.length === 0) return false;
      if (accessNeed === "Multiple Disabilities") return false;
    }
    return true;
  });
}
