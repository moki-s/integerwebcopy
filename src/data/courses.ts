export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CareerRole {
  title: string;
  salary: string;
}

export interface Course {
  // Core fields
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  monthlyPrice: number;
  oldMonthlyPrice: number;
  students: number;
  badge: string;
  badgeColor: string;
  image: string;
  overview: string;
  curriculum: string[];

  // Extended fields (all optional - fallback to defaults on page)
  description?: string; // Long-form "About this course" HTML/text
  glancePoints?: string[]; // "This Course at a Glance" bullets
  whatsIncluded?: string[]; // Override default "What's Included" list
  benefits?: string[]; // Override default benefits list
  faqs?: CourseFAQ[]; // Per-course FAQs (override defaults)
  careerRoles?: CareerRole[]; // Per-course career roles + salaries
  avgSalary?: string; // Per-course average salary (e.g., "£35,000+")
  passRate?: number; // Pass rate percentage (e.g., 93)
  studyHours?: number; // Notional learning hours
  units?: number; // Number of units/modules
  duration?: string; // E.g., "6-12 months"
  assessmentType?: string; // E.g., "Online exams & coursework"
  entryRequirements?: string; // Entry requirement description
  progressionOptions?: string[]; // What you can do after completing
  awardingBody?: string; // E.g., "NCFE", "AAT", "HABC"
  qualificationLevel?: string; // E.g., "Level 2", "Level 5"
  metaTitle?: string; // Custom SEO title
  metaDescription?: string; // Custom SEO meta description
  isActive?: boolean; // Whether course is visible (default true)
  sortOrder?: number; // Display ordering
}

export const COURSES: Record<string, Course> = {
  // --- ACCOUNTING (AAT) ---
  "aat-level-1-business-skills": {
    id: "aat-level-1-business-skills",
    title: "AAT Level 1 Award in Business Skills",
    category: "Accounting",
    price: 150,
    oldPrice: 250,
    monthlyPrice: 15,
    oldMonthlyPrice: 25,
    students: 120,
    badge: "ENTRY LEVEL",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-1-business-skills.png",
    overview:
      "This entry-level qualification helps you support finance teams with everyday business activities, and understand sales and purchase processes.",
    curriculum: [
      "Working in the Business Environment",
      "Using Numbers in Business",
      "Sales and Purchase Processes",
    ],
  },
  "aat-level-1-bookkeeping": {
    id: "aat-level-1-bookkeeping",
    title: "AAT Level 1 Award in Bookkeeping",
    category: "Accounting",
    price: 150,
    oldPrice: 250,
    monthlyPrice: 15,
    oldMonthlyPrice: 25,
    students: 150,
    badge: "ENTRY LEVEL",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-1-bookkeeping.png",
    overview:
      "An introductory course offering a solid foundation in manual bookkeeping skills, including double-entry bookkeeping and associated documents.",
    curriculum: [
      "Bookkeeping Fundamentals",
      "Double-Entry Bookkeeping",
      "Business Documents",
    ],
  },
  "aat-level-2-accounting": {
    id: "aat-level-2-accounting",
    title: "AAT Level 2 Certificate in Accounting",
    category: "Accounting",
    price: 295,
    oldPrice: 595,
    monthlyPrice: 29,
    oldMonthlyPrice: 58,
    students: 1250,
    badge: "POPULAR",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-2-accounting.png",
    overview:
      "The AAT Level 2 Certificate in Accounting is your gateway to a career in finance. Covers foundational aspects from bookkeeping and costing to mastering software.",
    curriculum: [
      "Introduction to Bookkeeping",
      "Principles of Bookkeeping Controls",
      "Principles of Costing",
      "The Business Environment",
    ],
  },
  "aat-level-2-bookkeeping": {
    id: "aat-level-2-bookkeeping",
    title: "AAT Level 2 Certificate in Bookkeeping",
    category: "Accounting",
    price: 250,
    oldPrice: 450,
    monthlyPrice: 25,
    oldMonthlyPrice: 45,
    students: 980,
    badge: "ENTRY LEVEL",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-2-bookkeeping.png",
    overview:
      "A short, sharp qualification that delivers the essential skills for manual and digital bookkeeping.",
    curriculum: [
      "Introduction to Bookkeeping",
      "Principles of Bookkeeping Controls",
    ],
  },
  "aat-level-3-accounting": {
    id: "aat-level-3-accounting",
    title: "AAT Level 3 Diploma in Accounting",
    category: "Accounting",
    price: 495,
    oldPrice: 895,
    monthlyPrice: 45,
    oldMonthlyPrice: 81,
    students: 1600,
    badge: "ADVANCED",
    badgeColor: "#D69E2E",
    image: "/images/courses/accounting/aat-level-3-accounting.png",
    overview:
      "Master complex financial processes, including final accounts, reports, and returns. Covers indirect tax, management accounting, and financial accounting.",
    curriculum: [
      "Business Awareness",
      "Financial Accounting: Preparing Financial Statements",
      "Management Accounting Techniques",
      "Tax Processes for Businesses",
    ],
  },
  "aat-level-3-bookkeeping": {
    id: "aat-level-3-bookkeeping",
    title: "AAT Level 3 Certificate in Bookkeeping",
    category: "Accounting",
    price: 350,
    oldPrice: 550,
    monthlyPrice: 35,
    oldMonthlyPrice: 55,
    students: 540,
    badge: "ADVANCED",
    badgeColor: "#D69E2E",
    image: "/images/courses/accounting/aat-level-3-bookkeeping.png",
    overview:
      "Develop advanced bookkeeping skills needed for senior roles. Learn to prepare financial statements for sole traders and partnerships.",
    curriculum: [
      "Financial Accounting: Preparing Financial Statements",
      "Tax Processes for Businesses",
    ],
  },
  "aat-level-4-accounting": {
    id: "aat-level-4-accounting",
    title: "AAT Level 4 Diploma in Professional Accounting",
    category: "Accounting",
    price: 695,
    oldPrice: 1295,
    monthlyPrice: 65,
    oldMonthlyPrice: 121,
    students: 320,
    badge: "PROFESSIONAL",
    badgeColor: "#3182CE",
    image: "/images/courses/accounting/aat-level-4-accounting.png",
    overview:
      "The highest level of AAT qualification. Become a fully qualified accounting technician covering complex accounting tasks.",
    curriculum: [
      "Applied Management Accounting",
      "Drafting and Interpreting Financial Statements",
      "Internal Accounting Systems and Controls",
      "Credit Management (Optional)",
      "Cash and Treasury Management (Optional)",
    ],
  },

  // --- HEALTH & SOCIAL CARE ---
  "ncfe-level-2-care": {
    id: "ncfe-level-2-care",
    title: "Level 2 Diploma in Care",
    category: "Health & Social Care",
    price: 395,
    oldPrice: 650,
    monthlyPrice: 39,
    oldMonthlyPrice: 64,
    students: 300,
    badge: "CARE",
    badgeColor: "#38B2AC",
    image: "/images/courses/health-social/ncfe-level-2-care.png",
    overview:
      "The standard qualification for those working in adult care settings in England. Confirms occupational competence for roles such as Adult Care Worker.",
    curriculum: [
      "Communication in care settings",
      "Handle information in care settings",
      "Personal development in care settings",
      "Implement person-centred approaches",
    ],
  },
  "ncfe-level-2-early-years": {
    id: "ncfe-level-2-early-years",
    title: "Level 2 Diploma for the Early Years Practitioner",
    category: "Health & Social Care",
    price: 395,
    oldPrice: 650,
    monthlyPrice: 39,
    oldMonthlyPrice: 64,
    students: 450,
    badge: "PRACTITIONER",
    badgeColor: "#38B2AC",
    image: "/images/courses/health-social/ncfe-level-2-early-years.png",
    overview:
      "Provides the knowledge and skills required to work with children from birth to 5 years and up to 7 years.",
    curriculum: [
      "Roles and responsibilities of the early years practitioner",
      "Health and safety of babies and young children",
      "Equality, diversity and inclusive practice",
      "Safeguarding, protection and welfare of babies and young children",
    ],
  },
  "ncfe-level-3-adult-care": {
    id: "ncfe-level-3-adult-care",
    title: "Level 3 Diploma in Adult Care",
    category: "Health & Social Care",
    price: 495,
    oldPrice: 795,
    monthlyPrice: 49,
    oldMonthlyPrice: 79,
    students: 600,
    badge: "ADVANCED",
    badgeColor: "#D69E2E",
    image: "/images/courses/health-social/ncfe-level-3-adult-care.png",
    overview:
      "For those working in lead adult care roles. Develops the knowledge and skills required to work in a senior capacity.",
    curriculum: [
      "Promote personal development in care settings",
      "Promote equality and inclusion in care settings",
      "Promote communication in care settings",
      "Promote health, safety and wellbeing in care settings",
    ],
  },
  "ncfe-level-5-adult-care": {
    id: "ncfe-level-5-adult-care",
    title: "Level 5 Diploma in Leadership and Management for Adult Care",
    category: "Health & Social Care",
    price: 995,
    oldPrice: 1495,
    monthlyPrice: 95,
    oldMonthlyPrice: 143,
    students: 120,
    badge: "MANAGEMENT",
    badgeColor: "#805AD5",
    image: "/images/courses/health-social/ncfe-level-5-adult-care.png",
    overview:
      "A comprehensive qualification for those managing an adult care service. Covers leadership, governance, and strategic management.",
    curriculum: [
      "Leadership and management in adult care",
      "Governance and regulatory processes",
      "Communication and information management",
      "Decision making in adult care",
    ],
  },
  "level-5-residential-childcare": {
    id: "level-5-residential-childcare",
    title:
      "Level 5 Diploma in Leadership and Management for Residential Childcare (England)",
    category: "Health & Social Care",
    price: 1050,
    oldPrice: 1550,
    monthlyPrice: 105,
    oldMonthlyPrice: 155,
    students: 85,
    badge: "MANAGEMENT",
    badgeColor: "#805AD5",
    image: "/images/courses/health-social/level-5-residential-childcare.png",
    overview:
      "Designed for those managing residential childcare settings. Covers leading and managing a service for positive outcomes.",
    curriculum: [
      "Leading and managing a residential childcare setting",
      "Leading and supporting children and young people",
      "Leading practice to support the safeguarding of children",
      "Managing risk and legal compliance",
    ],
  },

  // --- OCCUPATIONAL STUDIES ---
  "occ-studies-cert": {
    id: "occ-studies-cert",
    title: "Certificate in Occupational Studies for the Workplace",
    category: "Occupational Studies",
    price: 250,
    oldPrice: 350,
    monthlyPrice: 25,
    oldMonthlyPrice: 35,
    students: 200,
    badge: "WORKPLACE",
    badgeColor: "#319795",
    image: "/images/courses/occupational/occ-studies-cert.png",
    overview:
      "A solid base from which to further develop your skills and learning. Prepares learners for work through real or simulated work situations.",
    curriculum: [
      "Building confidence for the workplace",
      "Understand how to work in a team",
      "Health and safety in the workplace",
    ],
  },
  "occ-studies-diploma": {
    id: "occ-studies-diploma",
    title: "Diploma in Occupational Studies for the Workplace",
    category: "Occupational Studies",
    price: 350,
    oldPrice: 495,
    monthlyPrice: 35,
    oldMonthlyPrice: 50,
    students: 150,
    badge: "WORKPLACE",
    badgeColor: "#319795",
    image: "/images/courses/occupational/occ-studies-diploma.png",
    overview:
      "A comprehensive qualification providing practical skills and knowledge for the workplace.",
    curriculum: [
      "Workplace Preparation",
      "Occupational Skills Development",
      "Effective Communication",
      "Problem Solving at Work",
    ],
  },
  "level-2-occ-studies": {
    id: "level-2-occ-studies",
    title: "Level 2 Certificate in Occupational Studies for the Workplace",
    category: "Occupational Studies",
    price: 295,
    oldPrice: 450,
    monthlyPrice: 29,
    oldMonthlyPrice: 44,
    students: 180,
    badge: "LEVEL 2",
    badgeColor: "#319795",
    image: "/images/courses/occupational/level-2-occ-studies.png",
    overview:
      "Progression from the Level 1 certificate, offering more in-depth knowledge and practical skills for the modern workplace.",
    curriculum: [
      "Advanced Workplace Skills",
      "Team Leadership Basics",
      "Vocational Specific Components",
    ],
  },
  "personal-dev-cert": {
    id: "personal-dev-cert",
    title: "Certificate in Personal Development for Employability (RQF)",
    category: "Occupational Studies",
    price: 220,
    oldPrice: 350,
    monthlyPrice: 22,
    oldMonthlyPrice: 35,
    students: 300,
    badge: "EMPLOYABILITY",
    badgeColor: "#ED8936",
    image: "/images/courses/occupational/personal-dev-cert.png",
    overview:
      "Develop the personal and social skills needed for employment. Covers confidence building, job searching, and interview techniques.",
    curriculum: [
      "Self-Assessment",
      "Career Planning",
      "Preparing for an Interview",
      "Searching for a Job",
    ],
  },
  "personal-dev-diploma": {
    id: "personal-dev-diploma",
    title: "Diploma in Personal Development for Employability (RQF)",
    category: "Occupational Studies",
    price: 320,
    oldPrice: 450,
    monthlyPrice: 32,
    oldMonthlyPrice: 45,
    students: 250,
    badge: "EMPLOYABILITY",
    badgeColor: "#ED8936",
    image: "/images/courses/occupational/personal-dev-diploma.png",
    overview:
      "An extensive course covering personal development and employability skills with extended workplace behaviour modules.",
    curriculum: [
      "Effective Communication",
      "Working as part of a team",
      "Managing personal finance",
      "Rights and responsibilities in the workplace",
    ],
  },
  "work-related-cert": {
    id: "work-related-cert",
    title:
      "Certificate in Work-Related Studies for the Customer Service Sector (RQF)",
    category: "Occupational Studies",
    price: 250,
    oldPrice: 395,
    monthlyPrice: 25,
    oldMonthlyPrice: 40,
    students: 190,
    badge: "CUSTOMER SERVICE",
    badgeColor: "#4299E1",
    image: "/images/courses/occupational/work-related-cert.png",
    overview:
      "Prepares learners for work in the customer service sector. Covers the basics of customer interactions and service delivery.",
    curriculum: [
      "Principles of Customer Service",
      "Communication with Customers",
      "Handling Customer Complaints",
    ],
  },
  "work-related-diploma": {
    id: "work-related-diploma",
    title:
      "Diploma in Work-Related Studies for the Customer Service Sector (RQF)",
    category: "Occupational Studies",
    price: 350,
    oldPrice: 495,
    monthlyPrice: 35,
    oldMonthlyPrice: 50,
    students: 140,
    badge: "CUSTOMER SERVICE",
    badgeColor: "#4299E1",
    image: "/images/courses/occupational/work-related-diploma.png",
    overview:
      "A comprehensive qualification for those pursuing a career in customer service with advanced service standards modules.",
    curriculum: [
      "Delivering Reliable Customer Service",
      "Understanding Customer Needs",
      "Dealing with Difficult Situations",
      "Processing Customer Info",
    ],
  },
  "health-safety-award": {
    id: "health-safety-award",
    title:
      "Award in the Principles of Health and Safety within the Workplace (RQF)",
    category: "Occupational Studies",
    price: 120,
    oldPrice: 200,
    monthlyPrice: 12,
    oldMonthlyPrice: 20,
    students: 800,
    badge: "SAFETY",
    badgeColor: "#E53E3E",
    image: "/images/courses/occupational/health-safety-award.png",
    overview:
      "Essential health and safety knowledge for any workplace. Covers risk assessment, manual handling, and legal responsibilities.",
    curriculum: [
      "Introduction to Health and Safety",
      "Workplace Hazards and Risks",
      "Workplace Conditions",
      "Health and Safety Procedures",
    ],
  },

  // --- FUNCTIONAL SKILLS ---
  "functional-maths-level-1": {
    id: "functional-maths-level-1",
    title: "Level 1 Functional Skills Qualification in Mathematics",
    category: "Functional Skills",
    price: 195,
    oldPrice: 295,
    monthlyPrice: 19,
    oldMonthlyPrice: 29,
    students: 2200,
    badge: "MATHS",
    badgeColor: "#3182CE",
    image: "/images/courses/functional-skills/functional-maths-level-1.png",
    overview:
      "Develop practical, transferable skills in Mathematics to work confidently, effectively, and independently in life.",
    curriculum: [
      "Using numbers and the number system",
      "Using common measures, shape and space",
      "Handling information and data",
    ],
  },
  "functional-maths-level-2": {
    id: "functional-maths-level-2",
    title: "Level 2 Functional Skills Qualification in Mathematics",
    category: "Functional Skills",
    price: 195,
    oldPrice: 295,
    monthlyPrice: 19,
    oldMonthlyPrice: 29,
    students: 2500,
    badge: "MATHS",
    badgeColor: "#3182CE",
    image: "/images/courses/functional-skills/functional-maths-level-2.png",
    overview:
      "Equivalent to a GCSE Grade 4 (C). Provides skills needed for further education and employment.",
    curriculum: [
      "Data Handling and Statistics",
      "Fractions, Decimals and Percentages",
      "Formulae and Equations",
      "Geometry and Measure",
    ],
  },
  "functional-english-level-1": {
    id: "functional-english-level-1",
    title: "Level 1 Functional Skills Qualification in English",
    category: "Functional Skills",
    price: 195,
    oldPrice: 295,
    monthlyPrice: 19,
    oldMonthlyPrice: 29,
    students: 1800,
    badge: "ENGLISH",
    badgeColor: "#DD6B20",
    image: "/images/courses/functional-skills/functional-english-level-1.png",
    overview:
      "Improve your reading, writing, and communication skills. Gives you the confidence to apply English skills in work and everyday life.",
    curriculum: ["Reading", "Writing", "Speaking, Listening and Communicating"],
  },
  "functional-english-level-2": {
    id: "functional-english-level-2",
    title: "Level 2 Functional Skills Qualification in English",
    category: "Functional Skills",
    price: 195,
    oldPrice: 295,
    monthlyPrice: 19,
    oldMonthlyPrice: 29,
    students: 2100,
    badge: "ENGLISH",
    badgeColor: "#DD6B20",
    image: "/images/courses/functional-skills/functional-english-level-2.png",
    overview:
      "Equivalent to a GCSE Grade 4 (C). Demonstrates the ability to read, write, speak, listen, and communicate in English.",
    curriculum: [
      "Reading for Information",
      "Writing for Different Purposes",
      "Speaking, Listening and Communicating",
    ],
  },

  // --- SECURITY & STEWARDING ---
  "first-aid-level-3": {
    id: "first-aid-level-3",
    title: "Level 3 Award in Emergency First Aid at Work (RQF)",
    category: "Security & Stewarding",
    price: 120,
    oldPrice: 180,
    monthlyPrice: 0,
    oldMonthlyPrice: 0,
    students: 3000,
    badge: "SAFETY",
    badgeColor: "#E53E3E",
    image: "/images/courses/security/first-aid-level-3.png",
    overview:
      "A one-day course covering the essentials of emergency first aid in the workplace. Meets HSE requirements for low-risk workplaces.",
    curriculum: [
      "Roles and responsibilities of a first aider",
      "Assessing an incident",
      "Managing an unresponsive casualty",
      "Wounds and bleeding",
    ],
  },
  "door-supervisor-level-2": {
    id: "door-supervisor-level-2",
    title:
      "Level 2 Award for Door Supervisors in the Private Security Industry",
    category: "Security & Stewarding",
    price: 220,
    oldPrice: 350,
    monthlyPrice: 22,
    oldMonthlyPrice: 35,
    students: 2100,
    badge: "LICENSE",
    badgeColor: "#2A4365",
    image: "/images/courses/security/door-supervisor-level-2.png",
    overview:
      "The standard qualification required to apply for an SIA Door Supervisor license. Covers legal aspects, physical intervention, and conflict management.",
    curriculum: [
      "Working in the Private Security Industry",
      "Working as a Door Supervisor",
      "Conflict Management",
      "Physical Intervention Skills",
    ],
  },
  "spectator-safety-level-2": {
    id: "spectator-safety-level-2",
    title: "Level 2 Certificate in Spectator Safety (RQF)",
    category: "Security & Stewarding",
    price: 195,
    oldPrice: 295,
    monthlyPrice: 19,
    oldMonthlyPrice: 29,
    students: 1500,
    badge: "STEWARDING",
    badgeColor: "#2A4365",
    image: "/images/courses/security/spectator-safety-level-2.png",
    overview:
      "Required for working as a steward at sports grounds and events. Covers crowd control, health and safety, and dealing with emergencies.",
    curriculum: [
      "Prepare for spectator events",
      "Control the entry, exit and movement of people",
      "Monitor spectators",
      "Deal with crowd problems",
    ],
  },
  "spectator-safety-level-4": {
    id: "spectator-safety-level-4",
    title: "Level 4 Diploma in Spectator Safety Management (RQF)",
    category: "Security & Stewarding",
    price: 650,
    oldPrice: 895,
    monthlyPrice: 65,
    oldMonthlyPrice: 90,
    students: 60,
    badge: "MANAGEMENT",
    badgeColor: "#2A4365",
    image: "/images/courses/security/spectator-safety-level-4.png",
    overview:
      "A qualification for Safety Officers and Senior Stewards. Focuses on planning and management of spectator safety at events.",
    curriculum: [
      "Plan for the safety of people at a spectator event",
      "Manage the safety of people at a spectator event",
      "Develop and manage stewarding resources",
      "Manage info for decision making",
    ],
  },
  "event-security-level-2": {
    id: "event-security-level-2",
    title: "Level 2 Certificate in Event Security Operations (RQF)",
    category: "Security & Stewarding",
    price: 220,
    oldPrice: 350,
    monthlyPrice: 22,
    oldMonthlyPrice: 35,
    students: 500,
    badge: "SECURITY",
    badgeColor: "#2A4365",
    image: "/images/courses/security/event-security-level-2.png",
    overview:
      "Specific training for security operatives working at events and festivals. Covers searching, patrolling, and controlling entry/exit.",
    curriculum: [
      "Event Security Guidelines",
      "Crowd Management",
      "Patrolling and Searching",
      "Customer Service in Security",
    ],
  },

  // --- BUSINESS & MANAGEMENT ---
  "team-leading-cert": {
    id: "team-leading-cert",
    title: "Certificate in Team Leading Principles (RQF)",
    category: "Business & Management",
    price: 295,
    oldPrice: 450,
    monthlyPrice: 29,
    oldMonthlyPrice: 44,
    students: 560,
    badge: "LEADERSHIP",
    badgeColor: "#D69E2E",
    image: "/images/courses/business/team-leading-cert.png",
    overview:
      "Ideal for new or aspiring team leaders. Develops the skills needed to lead a team effectively, including communication and coaching.",
    curriculum: [
      "Principles of Team Leading",
      "Understanding Business",
      "Communication in the Workplace",
      "Coaching and Mentoring",
    ],
  },
};

export function getCourse(id: string): Course | undefined {
  return COURSES[id];
}

export function getAllCourses(): Course[] {
  return Object.values(COURSES);
}

export function getCoursesByCategory(category: string): Course[] {
  return Object.values(COURSES).filter((c) => c.category === category);
}

// Map category names to service slugs used in the Astro site
export const categoryToSlug: Record<string, string> = {
  Accounting: "accounting",
  "Health & Social Care": "health-social-care",
  "Occupational Studies": "occupational-studies",
  "Functional Skills": "functional-skills",
  "Security & Stewarding": "security-stewarding",
  "Business & Management": "business-management",
};
