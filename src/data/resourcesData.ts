import { BookOpen, GraduationCap, Briefcase, Scale, Cpu, Users } from "lucide-react";
import type { ElementType } from "react";

export interface Article {
  title: string;
  content: string;
}

export interface ResourceCategory {
  icon: ElementType;
  title: string;
  description: string;
  articles: Article[];
}

export const resources: ResourceCategory[] = [
  {
    icon: BookOpen,
    title: "Disability Awareness",
    description: "Understand different types of disabilities and how to create more inclusive environments.",
    articles: [
      {
        title: "Introduction to Disability Types",
        content: `Disability is a broad term that encompasses a wide range of conditions. Understanding the different types helps us build more inclusive communities.\n\n**Physical/Mobility Disabilities**\nThese affect a person's physical functioning, mobility, dexterity or stamina. Examples include spinal cord injuries, cerebral palsy, muscular dystrophy and limb differences. People with mobility disabilities may use wheelchairs, walking aids or prosthetics.\n\n**Visual Disabilities**\nThese range from low vision to total blindness. Many people with visual disabilities use screen readers, magnification software or braille displays. The key is to provide information in accessible formats.\n\n**Hearing Disabilities**\nThese range from hard of hearing to total deafness. Communication may involve sign language, captioning, hearing aids or cochlear implants. Visual communication methods are essential.\n\n**Intellectual/Cognitive Disabilities**\nThese affect learning, memory, attention and judgement. People may benefit from simplified information, clear instructions and additional processing time.\n\n**Psychosocial Disabilities**\nThese include mental health conditions such as depression, anxiety, bipolar disorder and schizophrenia. Accommodations may include flexible schedules and quiet workspaces.\n\n**Key Principle:** Always treat people with disabilities as individuals. Avoid assumptions about what someone can or cannot do.`,
      },
      {
        title: "Communication Etiquette",
        content: `Effective communication with people with disabilities is about respect, clarity and common sense.\n\n**General Guidelines**\n• Speak directly to the person, not to their companion or interpreter\n• Use a normal tone of voice — don't shout unless asked\n• Ask "How can I best communicate with you?" if unsure\n• Be patient and allow extra time if needed\n• Don't finish sentences or make assumptions\n\n**Communicating with People Who Are Blind**\n• Identify yourself when approaching\n• Say when you're leaving\n• Describe your environment when relevant\n• Offer your arm rather than grabbing theirs\n• Describe visual information when relevant\n\n**Communicating with Deaf/Hard-of-Hearing People**\n• Face the person directly when speaking\n• Speak clearly at a normal pace\n• Use gestures and visual cues\n• Write things down if communication is difficult\n• Use captioning services when available\n\n**Communicating with People with Speech Disabilities**\n• Be patient and listen carefully\n• Don't pretend to understand if you don't — ask them to repeat\n• Don't finish their sentences\n• Use communication boards or AAC devices if offered\n\n**Communicating with People with Cognitive Disabilities**\n• Use simple, clear language\n• Break information into small chunks\n• Use visual aids when possible\n• Repeat or rephrase if needed\n• Give the person time to process`,
      },
      {
        title: "Inclusive Language Guide",
        content: `Language shapes perception. Using inclusive language helps create a respectful and welcoming environment.\n\n**Person-First vs Identity-First**\nSome people prefer "person with a disability" (person-first), while others prefer "disabled person" (identity-first). The best approach is to ask the individual their preference. Many in the disability community prefer identity-first language as it acknowledges disability as a natural part of human diversity.\n\n**Words to Use**\n• "Person with a disability" or "disabled person" (depending on preference)\n• "Wheelchair user" (not "wheelchair-bound" or "confined to a wheelchair")\n• "Person who is blind/has low vision"\n• "Person who is Deaf/hard of hearing"\n• "Person with a mental health condition"\n• "Accessible" (not "handicapped")\n• "Inclusive" (not "special")\n\n**Words to Avoid**\n• "Handicapped" — outdated and has negative connotations\n• "Special needs" — many find this euphemistic and patronising\n• "Confined to a wheelchair" — wheelchairs provide freedom, not confinement\n• "Suffers from" or "afflicted with" — disability is not inherently suffering\n• "Normal" — implies disabled people are abnormal\n• "Inspiring" or "brave" — simply existing is not inspirational\n\n**Tips**\n• When in doubt, ask\n• Stay updated — language evolves\n• Focus on accessibility, not charity`,
      },
    ],
  },
  {
    icon: GraduationCap,
    title: "Education Resources",
    description: "Accessible learning materials, inclusive education strategies and academic support.",
    articles: [
      {
        title: "Accessible Learning Platforms",
        content: `Finding the right learning platform can make a significant difference. Here are key features to look for:\n\n**Screen-Reader Compatibility**\nLook for platforms that work well with screen readers like JAWS, NVDA, VoiceOver and TalkBack. Test navigation, headings, forms and dynamic content.\n\n**Captions and Transcripts**\nVideo content should have accurate captions and transcripts. Look for auto-generated captions that have been reviewed for accuracy.\n\n**Keyboard Navigation**\nEvery feature should be accessible via keyboard alone. Test Tab, Enter, Space, Escape and arrow key navigation.\n\n**Accessible PDFs**\nPDFs should be tagged for accessibility, with proper headings, alt text for images and logical reading order. Look for HTML alternatives.\n\n**Audio Learning Materials**\nSome platforms offer audio versions of text content, which is excellent for people with visual disabilities or learning differences.\n\n**Adjustable Text Size**\nPlatforms should allow users to increase text size without breaking the layout. Look for responsive design and user controls.\n\n**Assistive Technology Support**\nCheck if the platform provides built-in support for assistive technologies, or at least doesn't block them.\n\n**Recommended Accessible Platforms:**\n• Khan Academy — Good keyboard navigation and screen reader support\n• Coursera — Improving accessibility with captions\n• edX — Multiple accessibility features\n• Open University — Strong accessibility track record`,
      },
      {
        title: "Study Techniques for Different Needs",
        content: `Everyone learns differently. Here are effective study techniques adapted for various needs:\n\n**Audio-Based Learning**\n• Record lectures and listen back\n• Use text-to-speech software for reading materials\n• Listen to audiobooks and podcasts\n• Discuss topics verbally with study partners\n\n**Screen-Reader-Friendly Notes**\n• Use structured headings (H1, H2, H3) in digital notes\n• Use bullet points and numbered lists\n• Avoid images of text — always use actual text\n• Use accessible note-taking apps like Notion or OneNote\n\n**Structured Study Schedules**\n• Break study sessions into 25-minute blocks (Pomodoro technique)\n• Take regular breaks every 25-30 minutes\n• Use calendar apps with reminders\n• Set consistent study times\n\n**Visual/Tactile Learning**\n• Use mind maps and diagrams\n• Create physical flashcards with large text\n• Use tactile models when available\n• Organise materials by colour or texture\n\n**Captioned Videos**\n• Always enable captions on educational videos\n• Take notes from captions\n• Rewind and review sections as needed\n\n**Breaks and Focus Techniques**\n• Use the 20-20-20 rule for eye strain (every 20 min, look at something 20 feet away for 20 seconds)\n• Take movement breaks\n• Use noise-cancelling headphones if needed\n• Find your peak focus time and study then`,
      },
      {
        title: "Inclusive Classroom Strategies",
        content: `Creating an inclusive classroom benefits all students. Here are proven strategies:\n\n**Accessible Classroom Materials**\n• Provide materials in multiple formats (text, audio, large print)\n• Use high-contrast slides with large fonts\n• Ensure all documents are screen-reader compatible\n• Offer braille versions when needed\n\n**Flexible Teaching Methods**\n• Combine visual, auditory and kinesthetic activities\n• Provide options for how students demonstrate learning\n• Offer both individual and group work\n• Allow flexible deadlines when appropriate\n\n**Captions and Sign Language**\n• Use live captioning for lectures\n• Provide sign language interpreters when requested\n• Record lectures with captions for later review\n\n**Assistive Technology**\n• Allow students to use their preferred assistive technology\n• Ensure classroom technology is accessible\n• Provide training on available assistive tools\n\n**Accessible Assessments**\n• Offer multiple ways to demonstrate knowledge\n• Provide extended time when needed\n• Use accessible testing formats\n• Allow assistive technology during exams\n\n**Peer Support**\n• Create buddy systems\n• Foster a culture of inclusion\n• Train all students on disability awareness\n• Encourage peer note-taking`,
      },
    ],
  },
  {
    icon: Briefcase,
    title: "Career Resources",
    description: "Job search tips, workplace accommodations and career development for people with disabilities.",
    articles: [
      {
        title: "Resume Writing Tips",
        content: `An accessible, well-crafted resume opens doors. Here's how to create one:\n\n**Format for Accessibility**\n• Use simple, clean layouts — avoid complex tables and graphics\n• Use standard fonts (Arial, Calibri, Verdana) in 10-12pt size\n• Use clear headings (Contact, Experience, Education, Skills)\n• Use bullet points for easy scanning\n• Save as both DOCX and plain text\n\n**Content Tips**\n• Lead with your strongest qualifications\n• Focus on skills and achievements, not limitations\n• You do NOT have to disclose your disability\n• Include relevant assistive technology skills\n• Quantify achievements where possible\n\n**About Disability Disclosure**\n• You are NOT required to disclose on your resume\n• You may choose to mention relevant accommodations\n• If you have employment gaps, you can explain briefly\n• Focus on what you CAN do\n\n**Digital Accessibility**\n• Ensure your online resume/portfolio is screen-reader accessible\n• Use semantic HTML for web-based resumes\n• Test with a screen reader before submitting`,
      },
      {
        title: "Workplace Accommodation Guide",
        content: `Understand your right to reasonable workplace accommodations.\n\n**What Are Reasonable Accommodations?**\nAdjustments to the work environment or job duties that enable a person with a disability to perform their job. Under the Rights of Persons with Disabilities Act 2016 (India) and similar laws worldwide, employers must provide reasonable accommodations.\n\n**Common Accommodations**\n\n*For Visual Disabilities:*\n• Screen reader software\n• Large print materials\n• Magnification software\n• Braille displays\n• Good lighting\n\n*For Hearing Disabilities:*\n• Sign language interpreters\n• Captioning services\n• Visual alerts and notifications\n• Written communication\n• Hearing loop systems\n\n*For Mobility Disabilities:*\n• Wheelchair-accessible workspace\n• Adjustable desk height\n• Accessible parking\n• Modified equipment\n• Flexible work schedule\n\n*Cognitive/Mental Health:*\n• Quiet workspace\n• Flexible deadlines\n• Reduced distractions\n• Clear written instructions\n• Regular check-ins\n\n**How to Request Accommodations**\n1. Know your rights\n2. Document your needs\n3. Make a formal request in writing\n4. Engage in the interactive process\n5. Follow up in writing`,
      },
      {
        title: "Interview Preparation",
        content: `Preparing for a job interview? Here's how to feel confident and ready.\n\n**Before the Interview**\n• Research the company's disability inclusion policies\n• Prepare answers for common questions\n• Practice with a friend or mentor\n• Plan your route and test accessibility\n• Request accommodations in advance if needed\n\n**Disclosure Decisions**\n• You don't have to disclose your disability\n• If you need accommodations for the interview, you may need to mention your needs\n• Focus the conversation on your skills and qualifications\n\n**Common Questions & Answers**\n\nQ: "Tell me about yourself"\nA: Focus on your professional background, skills and goals. You may or may not mention your disability.\n\nQ: "What are your strengths?"\nA: Highlight specific skills, experiences and qualities relevant to the role.\n\nQ: "Do you need any accommodations?"\nA: Be direct and specific. "I use a screen reader, so I'd appreciate accessible documents being shared in advance."\n\n**Accessibility Tips for Virtual Interviews**\n• Test your technology beforehand\n• Ensure your screen reader works with the video platform\n• Request captioning if needed\n• Have a backup plan for technical issues\n• Choose a quiet, well-lit space`,
      },
    ],
  },
  {
    icon: Scale,
    title: "Rights & Accessibility Information",
    description: "Know your rights. Learn about disability legislation, accessibility standards and advocacy.",
    articles: [
      {
        title: "Disability Rights Overview",
        content: `Understanding your rights is the first step to exercising them.\n\n**Key Legislation in India**\n\n*The Rights of Persons with Disabilities Act, 2016 (RPwD Act)*\n• Recognises 21 categories of disability\n• Mandates 4% reservation in government jobs\n• Requires accessibility in public buildings and transport\n• Establishes Central and State Advisory Boards\n• Ensures right to education, employment and social participation\n\n*The Americans with Disabilities Act (ADA) — International Reference*\n• Prohibits discrimination in employment, public services and accommodations\n• Requires reasonable accommodations\n• Sets accessibility standards for buildings and technology\n\n**Your Rights Include:**\n• Right to education in an inclusive environment\n• Right to employment with reasonable accommodations\n• Right to access public spaces and services\n• Right to legal protection against discrimination\n• Right to accessibility in digital services\n• Right to live independently\n\n**How to Advocate**\n• Know your specific rights under local law\n• Document accessibility barriers you encounter\n• File complaints with relevant authorities\n• Connect with disability rights organisations\n• Use social media to raise awareness`,
      },
      {
        title: "ADA Information",
        content: `The Americans with Disabilities Act (ADA) is a landmark civil rights law. Here's what it covers:\n\n**Title I — Employment**\n• Prohibits discrimination in hiring, promotion and other employment practices\n• Requires reasonable accommodations for qualified individuals\n• Applies to employers with 15+ employees\n\n**Title II — Public Services**\n• Requires state and local government services to be accessible\n• Covers transportation, voting, public meetings\n\n**Title III — Public Accommodations**\n• Requires private businesses to be accessible\n• Covers restaurants, hotels, retail stores, doctors' offices\n• Requires effective communication with customers with disabilities\n\n**Title IV — Telecommunications**\n• Requires telephone and internet companies to provide relay services\n\n**Web Accessibility Under ADA**\n• Courts have increasingly ruled that websites are "places of public accommodation"\n• WCAG 2.1 Level AA is the accepted standard\n• Organisations should ensure their digital presence is accessible`,
      },
      {
        title: "UN Convention on Disability Rights",
        content: `The UN Convention on the Rights of Persons with Disabilities (CRPD) is the most comprehensive international human rights treaty on disability.\n\n**Key Principles**\n• Respect for inherent dignity\n• Non-discrimination\n• Full and effective participation\n• Respect for difference and acceptance\n• Equality of opportunity\n• Accessibility\n• Gender equality\n• Respect for evolving capacities\n\n**What the CRPD Requires**\n• States must ensure accessibility of physical environment, information and communications\n• States must promote accessible technology and design\n• States must ensure inclusive education\n• States must protect against discrimination in employment\n• States must ensure social protection and independent living\n\n**Why It Matters**\nThe CRPD provides a framework for national disability legislation. Many countries, including India (which signed but has not yet ratified), use the CRPD as a guide for domestic disability law.`,
      },
    ],
  },
  {
    icon: Cpu,
    title: "Assistive Technology",
    description: "Guides to choosing, using and getting the most from assistive technology devices.",
    articles: [
      {
        title: "Screen Reader Setup Guide",
        content: `Screen readers convert on-screen content to speech or braille. Here's how to get started:\n\n**Popular Screen Readers**\n\n*NVDA (NonVisual Desktop Access)*\n• Free and open-source\n• Works on Windows\n• Excellent for beginners\n• Download from: nvaccess.org\n\n*JAWS (Job Access With Speech)*\n• Industry standard for professional use\n• Works on Windows\n• Most feature-rich option\n• Paid software (free trial available)\n\n*VoiceOver*\n• Built into macOS, iOS and iPadOS\n• Free with Apple devices\n• Well-integrated with Apple ecosystem\n\n*TalkBack*\n• Built into Android devices\n• Free with Android\n• Works with Google apps and services\n\n**Getting Started**\n1. Choose a screen reader for your device\n2. Install and enable it\n3. Learn basic navigation keys\n4. Practice with familiar websites\n5. Gradually explore more features\n\n**Basic Navigation Keys (NVDA/JAWS)**\n• H — Next heading\n• K — Next link\n• Tab — Next interactive element\n• Enter — Activate link/button\n• Escape — Close dialog\n• Insert+F7 — List of links/headings`,
      },
      {
        title: "Voice Control Setup",
        content: `Voice control lets you operate your computer or phone using spoken commands.\n\n**Built-in Voice Control**\n\n*Windows — Speech Recognition*\n• Open Settings > Accessibility > Speech\n• Enable voice control\n• Complete the training tutorial\n\n*macOS — Voice Control*\n• Open System Settings > Accessibility > Voice Control\n• Enable Voice Control\n• Choose your language and voice\n\n*Android — Voice Access*\n• Download Voice Access from Google Play\n• Enable in Accessibility settings\n• Complete the tutorial\n\n*iOS — Voice Control*\n• Open Settings > Accessibility > Voice Control\n• Enable Voice Control\n• Say "Show numbers" to see element labels\n\n**Tips for Effective Voice Control**\n• Speak clearly and at a consistent pace\n• Minimise background noise\n• Customise commands for your workflow\n• Use "Show grid" for precise pointing\n• Combine with keyboard shortcuts`,
      },
      {
        title: "Choosing Braille Displays",
        content: `A braille display is an output device that renders braille characters using tactile pins.\n\n**How Braille Displays Work**\n• Connect to a computer, phone or tablet via Bluetooth or USB\n• Receive text from the screen reader and display it in braille\n• Many have a refreshable braille keyboard for input\n\n**Factors to Consider**\n\n*Display Width:*\n• 20 cells — compact and portable\n• 40 cells — good balance of size and usability\n• 80 cells — full-width, professional use\n\n*Connectivity:*\n• Bluetooth — wireless, works with mobile devices\n• USB — reliable, works with most computers\n• Some support both\n\n*Key Features:*\n• Routing keys — for editing text\n• Braille keyboard — for input\n• Battery life — important for portable use\n• Compatibility with your screen reader\n\n**Popular Models**\n• Humanware Brailliant — reliable, well-supported\n• Freedom Scientific Focus — professional standard\n• APH Mantis — QWERTY keyboard + braille\n• Orbit Reader — affordable option\n\n**Cost Considerations**\nBraille displays can be expensive. Check with:\n• Government disability schemes\n• NGO grants\n• Educational institution support\n• AccessBridge Assistive Technology Grant`,
      },
    ],
  },
  {
    icon: Users,
    title: "Caregiver Resources",
    description: "Support materials for parents, family members, teachers and care workers.",
    articles: [
      {
        title: "Supporting Daily Activities",
        content: `Effective support means enabling independence, not creating dependency.\n\n**Principles of Good Support**\n• Ask before helping — don't assume someone needs help\n• Encourage independence wherever possible\n• Be patient and give time\n• Focus on what the person CAN do\n• Respect choices and preferences\n\n**Morning Routines**\n• Allow extra time — don't rush\n• Set up accessible tools in advance\n• Use consistent routines for predictability\n• Adjust the environment (lighting, temperature) for comfort\n\n**Meals and Nutrition**\n• Use accessible kitchen tools (easy-grip utensils, non-slip mats)\n• Adapt recipes for different abilities\n• Involve the person in meal planning\n• Ensure dining area is accessible\n\n**Communication Support**\n• Learn the person's preferred communication method\n• Be patient with AAC device users\n• Use visual schedules and reminders\n• Celebrate communication successes\n\n**Evening Routines**\n• Create a calming routine\n• Ensure assistive devices are charged/ready\n• Prepare for the next day together`,
      },
      {
        title: "Emotional Wellbeing",
        content: `Caregiving is rewarding but can also be demanding. Here's how to maintain emotional wellbeing:\n\n**For the Person You Support**\n• Encourage social connections and friendships\n• Support participation in activities they enjoy\n• Watch for signs of anxiety, depression or frustration\n• Ensure they have a voice in decisions about their life\n• Celebrate achievements, big and small\n\n**For Caregivers**\n• Acknowledge that caregiving is hard work\n• Take regular breaks — respite care is available\n• Connect with other caregivers for support\n• Maintain your own health and interests\n• Seek professional help when needed\n\n**Managing Stress**\n• Identify your triggers\n• Practice breathing exercises\n• Set realistic expectations\n• Accept help when offered\n• Prioritise sleep and nutrition\n\n**Building Resilience**\n• Focus on what's going well\n• Celebrate small wins\n• Maintain social connections\n• Pursue hobbies and interests\n• Consider counselling or support groups`,
      },
      {
        title: "Finding Community Support",
        content: `You don't have to navigate this alone. Here are ways to find support:\n\n**Disability Organisations in India**\n• National Centre for Promotion of Employment for Disabled Persons (NCPEDP)\n• Disability Rights India Foundation\n• National Association of the Blind\n• All India Confederation of Blind\n• Indian National Association for the Blind\n\n**Online Communities**\n• Disability-focused forums and social media groups\n• AccessBridge Community section\n• Caregiver support networks\n• Condition-specific support groups\n\n**Government Schemes**\n• ADIP Scheme (Assistance to Disabled Persons)\n• National Programme for Prevention of Blindness\n• Disability Pension Scheme\n• Accessible India Campaign (Sugamya Bharat Abhiyan)\n\n**Professional Support**\n• Occupational therapists\n• Speech therapists\n• Physiotherapists\n• Special educators\n• Psychologists and counsellors\n\n**How to Find Local Support**\n1. Contact your district disability office\n2. Search for local disability NGOs\n3. Ask your doctor or hospital\n4. Check with schools and colleges\n5. Search AccessBridge's Community section`,
      },
    ],
  },
];
