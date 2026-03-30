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
  tutorPrice: number;
  oneOffDiscount: number;
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
  isEnquiryOnly?: boolean; // When true, hide price/cart and show "Enquire Now" instead

  // Custom pricing labels (override "Online Learning" / "Tutor-Led Learning")
  onlinePriceLabel?: string;
  tutorPriceLabel?: string;

  // Rich content fields
  moduleDetails?: ModuleDetail[];
  assessmentDetails?: string;
  qualificationDetails?: string;
  careerDescription?: string;
}

export const COURSES: Record<string, Course> = {
  // --- ACCOUNTING (AAT) ---
  "aat-level-1-business-skills": {
    id: "aat-level-1-business-skills",
    title: "AAT Level 1 Award in Business Skills",
    category: "Accounting",
    price: 150,
    oldPrice: 250,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 15,
    oldMonthlyPrice: 0,
    students: 120,
    badge: "ENTRY LEVEL",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-1-business-skills.webp",
    overview:
      "This entry-level qualification helps you support finance teams with everyday business activities, and understand sales and purchase processes.",
    curriculum: [
      "Working in the Business Environment",
      "Using Numbers in Business",
      "Sales and Purchase Processes",
    ],
    description:
      "This entry-level qualification helps you support finance teams with everyday business activities, and understand sales and purchase processes. It covers a range of skills and relevant supporting knowledge to help prepare students for applying numbers in business and working in a business environment.",
    glancePoints: [
      "AAT-accredited entry-level business qualification",
      "No prior experience or qualifications required",
      "Covers business processes, numeracy, and sales/purchase cycles",
      "100% online with dedicated tutor support",
      "Ideal stepping stone to AAT Level 2 qualifications",
    ],
    faqs: [
      { question: "How long does it take?", answer: "Typically 2-3 months." },
      { question: "Are there exemptions?", answer: "No, this is entry-level." },
      { question: "What is the AAT registration fee?", answer: "£47 one-off fee paid directly to AAT." },
      { question: "Can I study online?", answer: "Yes, via distance learning, blended or classroom through a training provider." },
    ],
    careerRoles: [
      { title: "Office Administrator", salary: "£18,000 - £22,000" },
      { title: "Finance Assistant", salary: "£18,000 - £21,000" },
      { title: "Junior Accounts Clerk", salary: "£17,000 - £20,000" },
    ],
    avgSalary: "£19,000+",
    studyHours: 55,
    duration: "4-6 weeks",
    awardingBody: "AAT",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Good standard of English and maths recommended. Suitable for those with minimal work experience, younger students, trainees, or adults seeking to validate existing skills.",
      assessmentDetails: "Computer-based assessment set and marked by AAT. Time-limited, conducted under controlled conditions at an AAT approved assessment centre. Minimum 70% pass mark required.",
      qualificationDetails: "AAT Level 1 Award in Business Skills (RQF). Qualification Number: 61008199. 75 guided learning hours. Nationally recognised, regulated qualification.",
      careerDescription: "Data Entry Clerk, Accounts Administrator, Administrative Assistant, Receptionist, Retail Assistant, Customer Service Advisor, Dispatch Clerk, Warehouse Operative. Progression to AAT Level 2 Certificate in Accounting or Bookkeeping.",
      moduleDetails: [
      {
        name: "Working in the Business Environment",
        weight: "65%",
        description: "This unit introduces students to the skills needed in the workplace, including the importance of teamwork, communication, effective time management and professional behaviour. Students also learn about core finance processes linked to sales and purchase orders.",
        learningOutcomes: [
          "Develop skills for the workplace – understand the importance of teamwork, communication, time management and professional behaviour",
          "Understand how organisations operate – learn how different organisations in public and private sectors function",
          "Understand how sales and purchases support businesses – learn how money moves in business through sales and purchase processes",
          "Apply business procedures to sales and purchases – understand the documentation and procedures used to move goods and services between businesses",
        ],
      },
      {
        name: "Using Numbers in Business",
        weight: "35%",
        description: "Introduces students to the basic numeracy skills needed when working with numbers in a business environment, developing confidence and skills to use and apply numbers to a wide range of situations.",
        learningOutcomes: [
          "Perform simple business calculations – apply basic mathematical operations in business contexts",
          "Calculate decimals, fractions, percentages, proportions and ratios – use these mathematical concepts in business scenarios",
          "Use tools and techniques to present numerical data – display data using appropriate methods such as tables, charts and graphs",
        ],
      },
    ],
  },
  "aat-level-1-bookkeeping": {
    id: "aat-level-1-bookkeeping",
    title: "AAT Level 1 Award in Bookkeeping",
    category: "Accounting",
    price: 150,
    oldPrice: 250,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 15,
    oldMonthlyPrice: 0,
    students: 150,
    badge: "ENTRY LEVEL",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-1-bookkeeping.webp",
    overview:
      "An introductory course offering a solid foundation in manual bookkeeping skills, including double-entry bookkeeping and associated documents.",
    curriculum: [
      "Bookkeeping Fundamentals",
      "Double-Entry Bookkeeping",
      "Business Documents",
    ],
    description:
      "This entry-level bookkeeping qualification gives learners an understanding of manual, single-entry bookkeeping basics. It introduces the role of a bookkeeper and the underpinning knowledge to carry out simple bookkeeping activities including income and expenditure, profit and loss, and assets and liabilities.",
    glancePoints: [
      "AAT-accredited introductory bookkeeping qualification",
      "Learn double-entry bookkeeping from scratch",
      "No prior qualifications or experience required",
      "100% online with dedicated tutor support",
      "Direct progression to AAT Level 2 Bookkeeping",
    ],
    faqs: [
      { question: "How long does it take?", answer: "3-6 months typically." },
      { question: "Are there exemptions?", answer: "No, entry-level qualification." },
      { question: "What is the registration fee?", answer: "£47 paid to AAT." },
      { question: "Are resits unlimited?", answer: "Yes, no restrictions on resits." },
    ],
    careerRoles: [
      { title: "Junior Bookkeeper", salary: "£18,000 - £22,000" },
      { title: "Accounts Assistant", salary: "£19,000 - £23,000" },
      { title: "Data Entry Clerk (Finance)", salary: "£17,000 - £20,000" },
    ],
    avgSalary: "£19,000+",
    studyHours: 55,
    duration: "4-6 weeks",
    awardingBody: "AAT",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. No prior accounting or bookkeeping knowledge needed. Good standard of English and maths recommended.",
      assessmentDetails: "One 90-minute computer-based objective test set and marked by AAT. Minimum 70% pass mark. Conducted under controlled conditions. Results within 24 hours via MyAAT.",
      qualificationDetails: "AAT Level 1 Award in Bookkeeping (RQF). 75 guided learning hours. Equivalent to GCSE grades 1-3.",
      careerDescription: "Trainee Bookkeeper, Accounts Administrator, Billing/Payments Administrator, Accounts Junior, Accounts Receivable/Payable Assistant, Procurement and Finance Assistant, Assistant Cashier. Progression to AAT Level 2 Certificate in Bookkeeping.",
      moduleDetails: [
      {
        name: "Bookkeeping Fundamentals",
        weight: "100%",
        description: "Introduces students to the role of a bookkeeper and simple bookkeeping techniques, while providing an understanding of why it is important to keep accurate and up-to-date financial information in business. Students learn how to identify a range of bookkeeping transactions and gain an understanding of the benefits and risks of bookkeeping software.",
        learningOutcomes: [
          "Understand the role of the bookkeeper – learn about the importance of confidentiality, accuracy, ethical behaviour and the need for timely, accurate financial information",
          "Understand financial transactions – identify assets, liabilities, income, expenses, capital, profit or loss; understand the differences between trading for cash and trading on credit",
          "Process customer and supplier transactions – record customer invoices, credit notes, receipts and supplier invoices, credit notes and payments",
          "Process receipts and payments – enter receipts and payments into the cash book, check amounts against the bank statement in preparation for bank reconciliation, understand the dual effect of transactions",
          "Understand the benefits and risks of using accounting software to complete bookkeeping tasks – learn about real-time reporting, automation, and security measures in modern bookkeeping",
        ],
      },
    ],
  },
  "aat-level-2-accounting": {
    id: "aat-level-2-accounting",
    title: "AAT Level 2 Certificate in Accounting",
    category: "Accounting",
    price: 599,
    oldPrice: 999,
    tutorPrice: 999,
    oneOffDiscount: 50,
    monthlyPrice: 45.75,
    oldMonthlyPrice: 79.08,
    students: 1250,
    badge: "POPULAR",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-2-accounting.webp",
    overview:
      "The AAT Level 2 Certificate in Accounting is your gateway to a career in finance. Covers foundational aspects from bookkeeping and costing to mastering software.",
    curriculum: [
      "Introduction to Bookkeeping",
      "Principles of Bookkeeping Controls",
      "Principles of Costing",
      "The Business Environment",
    ],
    description:
      "This qualification delivers a solid foundation in finance administration and core accounting skills, including double-entry bookkeeping, basic costing and an understanding of purchase, sales and general ledgers. Students are introduced to ethics, technology, communications and sustainability.",
    glancePoints: [
      "AAT-accredited qualification recognised by employers nationwide",
      "255 guided learning hours across 4 assessed units",
      "Covers bookkeeping, costing, and the business environment",
      "No formal entry requirements — start from any background",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long does it take?", answer: "Average 12 months." },
      { question: "How many exams?", answer: "4 computer-based exams." },
      { question: "What are the exam fees?", answer: "£65-£70 per assessment." },
      { question: "Can I resit?", answer: "Yes, resits available to improve grades." },
    ],
    careerRoles: [
      { title: "Accounts Assistant", salary: "£20,000 - £25,000" },
      { title: "Finance Officer", salary: "£22,000 - £27,000" },
      { title: "Accounts Payable Clerk", salary: "£20,000 - £24,000" },
    ],
    avgSalary: "£23,000+",
    studyHours: 255,
    units: 4,
    duration: "6-12 months",
    assessmentType: "4 computer-based unit assessments",
    entryRequirements: "No formal entry requirements. Suitable for school leavers, adults returning to work, or career changers. Good standard of English and maths recommended.",
    progressionOptions: ["AAT Level 3 Diploma in Accounting", "AAT Level 3 Certificate in Bookkeeping"],
    awardingBody: "AAT",
    qualificationLevel: "Level 2",
      assessmentDetails: "Four computer-based assessments: three unit assessments and one synoptic assessment. Minimum 70% required per assessment. Graded Pass, Merit, or Distinction.",
      qualificationDetails: "AAT Level 2 Certificate in Accounting (RQF). Qualification Number: 603/6338/1. 255 guided learning hours. GCSE equivalent.",
      careerDescription: "Accounts Administrator, Accounts Assistant, Accounts Payable Clerk, Bookkeeper, Finance Assistant, Purchase/Sales Ledger Clerk, Payroll Administrator. Progression to AAT Level 3 Diploma in Accounting.",
      moduleDetails: [
      {
        name: "Introduction to Bookkeeping",
        weight: "25%",
        description: "Provides students with an understanding of manual and digital bookkeeping systems, including associated documents and processes. Students learn the basic principles that underpin double-entry bookkeeping systems.",
        learningOutcomes: [
          "Understand how to set up bookkeeping systems – understand the purpose of business documents, recording transactions, creating and using coding systems",
          "Process customer transactions – calculate invoice and credit note amounts, record in prime entry books, process customer receipts",
          "Process supplier transactions – verify supplier invoices and credit notes, record in prime entry books, process supplier payments",
          "Process receipts and payments – record receipts and payments in analysed cash and petty cash books, balance them, process recurring transactions",
          "Process transactions into ledger accounts – transfer data from prime entry books to ledgers, total and balance ledger accounts",
        ],
      },
      {
        name: "Principles of Bookkeeping Controls",
        weight: "25%",
        description: "Builds on Introduction to Bookkeeping, exploring control accounts, journals and reconciliations. Students prepare VAT control accounts, receivables and payables ledger accounts, use the journal to record transactions including correction of errors, and redraft the initial trial balance.",
        learningOutcomes: [
          "Use control accounts – prepare and reconcile control accounts for trade receivables and trade payables",
          "Reconcile a bank statement with the cash book – identify discrepancies and make adjustments",
          "Use the journal – record opening entries, irrecoverable debts, payroll transactions, and correct errors",
          "Produce trial balances – extract an initial trial balance, identify and correct errors, produce a revised trial balance",
        ],
      },
      {
        name: "Principles of Costing",
        weight: "20%",
        description: "Gives students an introduction to the principles of basic costing, building a solid foundation for more complex management accounting tasks. Students learn the importance of costing systems for planning, decision making and cost control.",
        learningOutcomes: [
          "Understand the cost recording system within an organisation – identify types of costs (materials, labour, overheads), understand cost centres and profit centres",
          "Use cost recording techniques – record and calculate materials costs, labour costs and expenses",
          "Provide information on actual and budgeted cost and income – compare actual costs with budgets, calculate variances",
          "Use tools and techniques to support cost calculations – calculate unit costs, break-even, margins and mark-ups",
        ],
      },
      {
        name: "The Business Environment",
        weight: "30%",
        description: "Provides knowledge of key business concepts and their practical application. Students gain an understanding of the legal system, contract law, business structures, and where the finance function fits within organisations.",
        learningOutcomes: [
          "Understand the principles of contract law – key elements of a valid contract, consumer protection",
          "Understand the external business environment – economic factors, regulation, competition",
          "Understand key principles of corporate social responsibility (CSR), ethics and sustainability",
          "Understand the impact of setting up different types of business entity – sole traders, partnerships, limited companies",
          "Understand the finance function within an organisation – the role of accounting, internal controls, stakeholder relationships",
          "Produce work in appropriate formats and communicate effectively – professional communication, report writing",
          "Understand the importance of information to business operations – data management, information systems",
        ],
      },
    ],
  },
  "aat-level-2-bookkeeping": {
    id: "aat-level-2-bookkeeping",
    title: "AAT Level 2 Certificate in Bookkeeping",
    category: "Accounting",
    price: 399,
    oldPrice: 599,
    tutorPrice: 599,
    oneOffDiscount: 50,
    monthlyPrice: 29.08,
    oldMonthlyPrice: 45.75,
    students: 980,
    badge: "ENTRY LEVEL",
    badgeColor: "#2F855A",
    image: "/images/courses/accounting/aat-level-2-bookkeeping.webp",
    overview:
      "A short, sharp qualification that delivers the essential skills for manual and digital bookkeeping.",
    curriculum: [
      "Introduction to Bookkeeping",
      "Principles of Bookkeeping Controls",
    ],
    description:
      "Gain the skills and essential knowledge for completing manual bookkeeping activities that underpin all accountancy and finance roles. Develop practical skills in double-entry bookkeeping, VAT, control accounts, and trial balances.",
    glancePoints: [
      "AAT-accredited bookkeeping qualification",
      "2 assessed units covering core bookkeeping skills",
      "Learn double-entry, control accounts, and reconciliations",
      "No formal entry requirements needed",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long does it take?", answer: "115 guided learning hours." },
      { question: "How many exams?", answer: "2 computer-based assessments." },
      { question: "Are resits allowed?", answer: "Yes, unlimited resits." },
      { question: "Can I work after this?", answer: "Yes, in junior bookkeeping roles." },
    ],
    careerRoles: [
      { title: "Bookkeeper", salary: "£20,000 - £26,000" },
      { title: "Accounts Payable Clerk", salary: "£20,000 - £24,000" },
      { title: "Purchase Ledger Clerk", salary: "£19,000 - £23,000" },
    ],
    avgSalary: "£22,000+",
    studyHours: 120,
    units: 2,
    duration: "3-6 months",
    assessmentType: "2 computer-based unit assessments",
    entryRequirements: "No formal entry requirements. Basic proficiency in English and Maths advisable. GCSE Level 4 or equivalent recommended.",
    progressionOptions: ["AAT Level 3 Certificate in Bookkeeping", "AAT Level 3 Diploma in Accounting"],
    awardingBody: "AAT",
    qualificationLevel: "Level 2",
      assessmentDetails: "Two computer-based assessments. Minimum 70% pass mark for each. Available at AAT approved centres or via remote invigilation. Graded Pass, Merit, or Distinction.",
      qualificationDetails: "AAT Level 2 Certificate in Bookkeeping (RQF). Qualification Number: 603/6343/5. 115 guided learning hours.",
      careerDescription: "Bookkeeping Assistant, Accounts Clerk, Finance Administrator, Accounts Payable Clerk, Trainee Accountant. Progression to AAT Level 3 Certificate in Bookkeeping or Level 2 Certificate in Accounting.",
      moduleDetails: [
      {
        name: "Introduction to Bookkeeping",
        weight: "50%",
        description: "Provides an understanding of manual and digital bookkeeping systems, including associated documents and processes. Students learn the basic principles that underpin double-entry bookkeeping systems and that digital accounting systems automate some stages.",
        learningOutcomes: [
          "Understand how to set up bookkeeping systems – purpose of business documents, coding systems, chart of accounts",
          "Process customer transactions – invoices, credit notes, receipts in prime entry books",
          "Process supplier transactions – verify and record supplier invoices, credit notes, payments",
          "Process receipts and payments – analysed cash books, petty cash, recurring transactions",
          "Process transactions into the ledger accounts – transfer from prime entry books to ledgers, total and balance",
        ],
      },
      {
        name: "Principles of Bookkeeping Controls",
        weight: "50%",
        description: "Builds on Introduction to Bookkeeping exploring control accounts, journals and reconciliations. Students prepare VAT control accounts, use the journal including correction of errors, and redraft the initial trial balance.",
        learningOutcomes: [
          "Use control accounts – prepare trade receivables and payables control accounts",
          "Reconcile a bank statement with the cash book – identify and resolve discrepancies",
          "Use the journal – record entries including opening balances, irrecoverable debts, error corrections",
          "Produce trial balances – extract, adjust and redraft trial balances",
        ],
      },
    ],
  },
  "aat-level-3-accounting": {
    id: "aat-level-3-accounting",
    title: "AAT Level 3 Diploma in Accounting",
    category: "Accounting",
    price: 699,
    oldPrice: 1200,
    tutorPrice: 1200,
    oneOffDiscount: 50,
    monthlyPrice: 54.08,
    oldMonthlyPrice: 95.83,
    students: 1600,
    badge: "ADVANCED",
    badgeColor: "#D69E2E",
    image: "/images/courses/accounting/aat-level-3-accounting.webp",
    overview:
      "Master complex financial processes, including final accounts, reports, and returns. Covers indirect tax, management accounting, and financial accounting.",
    curriculum: [
      "Business Awareness",
      "Financial Accounting: Preparing Financial Statements",
      "Management Accounting Techniques",
      "Tax Processes for Businesses",
    ],
    description:
      "Covers essential and higher-level accounting techniques including maintaining cost accounting records, advanced bookkeeping and preparation of financial reports and returns. On completion, eligible for AAT bookkeeping membership (AATQB).",
    glancePoints: [
      "400 guided learning hours across 4 advanced units",
      "Covers financial statements, management accounting, and tax",
      "Recognised pathway to senior accounting roles",
      "Recommended: AAT Level 2 Certificate in Accounting",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long does it take?", answer: "10-14 months average." },
      { question: "What membership do I get?", answer: "AATQB (AAT Qualified Bookkeeper)." },
      { question: "Can I become chartered?", answer: "Yes, via ACCA, CIMA, etc. with exemptions." },
      { question: "Is work experience needed?", answer: "Not required but beneficial." },
    ],
    careerRoles: [
      { title: "Assistant Accountant", salary: "£24,000 - £30,000" },
      { title: "Accounts Manager", salary: "£28,000 - £35,000" },
      { title: "Tax Technician", salary: "£25,000 - £32,000" },
    ],
    avgSalary: "£28,000+",
    studyHours: 400,
    units: 4,
    duration: "12-18 months",
    assessmentType: "4 computer-based unit assessments",
    entryRequirements: "Recommended AAT Level 2 Certificate in Accounting or Bookkeeping, or equivalent. Good standard of English and maths. GCSE grade 4 or equivalent in English and Maths recommended.",
    progressionOptions: ["AAT Level 4 Diploma in Professional Accounting", "ACCA, CIMA, or ACA professional qualifications"],
    awardingBody: "AAT",
    qualificationLevel: "Level 3",
      assessmentDetails: "Four computer-based end-of-unit assessments at £65 each. Minimum 70% pass mark. Graded Pass, Merit, or Distinction. Results: instant for some, up to 6 weeks for human-marked.",
      qualificationDetails: "AAT Level 3 Diploma in Accounting (RQF). 400 guided learning hours. A-Level equivalent. Eligible for AATQB membership on completion.",
      careerDescription: "Accounts Assistant, Assistant Accountant, Credit Controller, Finance Assistant, Tax Assistant, Finance Officer, Payroll Supervisor, Senior Bookkeeper, Audit Trainee. Progression to AAT Level 4 or ACCA/CIMA/CIPFA/ICAEW.",
      moduleDetails: [
      {
        name: "Business Awareness",
        weight: "15%",
        description: "Provides an understanding of the business environment and its influences on organisational structure, the accounting function and performance. Students examine business types, stakeholder rights, professional ethics and ethical management.",
        learningOutcomes: [
          "Understand business types, structure and governance and the legal framework in which they operate",
          "Understand the impact of the external and internal environments on business, their performance and decisions",
          "Understand how businesses and accountants comply with principles of professional ethics",
          "Understand the impact of new technologies in accounting and the risks associated with data security",
          "Communicate information to stakeholders",
        ],
      },
      {
        name: "Financial Accounting: Preparing Financial Statements",
        weight: "40%",
        description: "Provides skills for producing statements of profit or loss and statements of financial position for sole traders and partnerships using a trial balance. Students gain advanced double-entry bookkeeping skills for recording financial transactions using a manual bookkeeping system.",
        learningOutcomes: [
          "Understand the accounting principles underlying final accounts preparation",
          "Understand the principles of advanced double-entry bookkeeping",
          "Implement procedures for the acquisition and disposal of non-current assets",
          "Prepare and record depreciation calculations",
          "Record period end adjustments",
          "Produce and extend the trial balance",
          "Produce financial statements for sole traders and partnerships",
          "Interpret financial statements using profitability ratios",
          "Prepare accounting records from incomplete information",
        ],
      },
      {
        name: "Management Accounting Techniques",
        weight: "30%",
        description: "Provides knowledge and skills to understand the role of management accounting and how organisations use information for decision making. Students learn costing methodology, how costs are handled and why organisations treat costs differently.",
        learningOutcomes: [
          "Understand the purpose and use of management accounting within organisations",
          "Use techniques required for dealing with costs",
          "Attribute costs according to organisational requirements",
          "Investigate deviations from budgets",
          "Use spreadsheet techniques to provide management accounting information",
          "Use management accounting techniques to support short-term decision making",
          "Understand principles of cash management",
        ],
      },
      {
        name: "Tax Processes for Businesses",
        weight: "15%",
        description: "Explores tax processes influencing daily business operations. Develops skills in understanding, preparing and submitting VAT returns to HMRC. Provides knowledge of compliance with laws and practices for VAT and payroll.",
        learningOutcomes: [
          "Understand legislation requirements relating to VAT",
          "Calculate VAT",
          "Review and verify VAT returns",
          "Understand principles of payroll",
          "Report information within the organisation",
        ],
      },
    ],
  },
  "aat-level-3-bookkeeping": {
    id: "aat-level-3-bookkeeping",
    title: "AAT Level 3 Certificate in Bookkeeping",
    category: "Accounting",
    price: 499,
    oldPrice: 699,
    tutorPrice: 699,
    oneOffDiscount: 50,
    monthlyPrice: 37.42,
    oldMonthlyPrice: 54.08,
    students: 540,
    badge: "ADVANCED",
    badgeColor: "#D69E2E",
    image: "/images/courses/accounting/aat-level-3-bookkeeping.webp",
    overview:
      "Develop advanced bookkeeping skills needed for senior roles. Learn to prepare financial statements for sole traders and partnerships.",
    curriculum: [
      "Financial Accounting: Preparing Financial Statements",
      "Tax Processes for Businesses",
    ],
    description:
      "Develops complex skills and knowledge for bookkeeping roles or progression to higher level accountancy. Covers accounting principles and concepts, advanced bookkeeping, and preparing financial statements including VAT and payroll understanding.",
    glancePoints: [
      "AAT-accredited advanced bookkeeping qualification",
      "2 units: Financial Statements and Tax Processes",
      "Prepare accounts for sole traders and partnerships",
      "Recommended: AAT Level 2 Certificate in Bookkeeping",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long does it take?", answer: "4-6 months." },
      { question: "What status do I get?", answer: "AATQB membership." },
      { question: "Can I freelance?", answer: "Yes, with AATQB status." },
      { question: "What are assessment fees?", answer: "~£65 per unit." },
    ],
    careerRoles: [
      { title: "Senior Bookkeeper", salary: "£25,000 - £32,000" },
      { title: "Accounts Supervisor", salary: "£26,000 - £33,000" },
      { title: "Payroll Officer", salary: "£23,000 - £28,000" },
    ],
    avgSalary: "£27,000+",
    studyHours: 200,
    units: 2,
    duration: "6-12 months",
    assessmentType: "2 computer-based unit assessments",
    entryRequirements: "Recommended AAT Level 2 Certificate in Bookkeeping or Accounting. Good standard of English and maths.",
    progressionOptions: ["AAT Level 4 Diploma in Professional Accounting", "AAT Licensed Bookkeeper status"],
    awardingBody: "AAT",
    qualificationLevel: "Level 3",
      assessmentDetails: "Two computer-based assessments. Minimum 70% pass mark. Graded Pass, Merit, or Distinction.",
      qualificationDetails: "AAT Level 3 Certificate in Bookkeeping (RQF). Eligible for AATQB membership on completion.",
      careerDescription: "Senior Bookkeeper, Accounts Clerk, Account Manager, Finance Officer, Ledger Manager, Freelance Bookkeeper (with AATQB). Progression to AAT Level 4 Diploma.",
      moduleDetails: [
      {
        name: "Financial Accounting: Preparing Financial Statements",
        weight: "70%",
        description: "Provides skills for producing statements of profit or loss and statements of financial position for sole traders and partnerships. Students gain advanced double-entry bookkeeping skills for recording financial transactions using a manual bookkeeping system.",
        learningOutcomes: [
          "Understand the accounting principles underlying final accounts preparation",
          "Understand the principles of advanced double-entry bookkeeping",
          "Implement procedures for the acquisition and disposal of non-current assets",
          "Prepare and record depreciation calculations",
          "Record period end adjustments",
          "Produce and extend the trial balance",
          "Produce financial statements for sole traders and partnerships",
          "Interpret financial statements using profitability ratios",
          "Prepare accounting records from incomplete information",
        ],
      },
      {
        name: "Tax Processes for Businesses",
        weight: "30%",
        description: "Explores tax processes influencing daily business operations. Develops skills in understanding, preparing and submitting VAT returns to HMRC and understanding payroll requirements.",
        learningOutcomes: [
          "Understand legislation requirements relating to VAT",
          "Calculate VAT",
          "Review and verify VAT returns",
          "Understand principles of payroll",
          "Report information within the organisation",
        ],
      },
    ],
  },
  "aat-level-4-accounting": {
    id: "aat-level-4-accounting",
    title: "AAT Level 4 Diploma in Professional Accounting",
    category: "Accounting",
    price: 799,
    oldPrice: 1595,
    tutorPrice: 1595,
    oneOffDiscount: 50,
    monthlyPrice: 62.42,
    oldMonthlyPrice: 128.75,
    students: 320,
    badge: "PROFESSIONAL",
    badgeColor: "#3182CE",
    image: "/images/courses/accounting/aat-level-4-accounting.webp",
    overview:
      "The highest level of AAT qualification. Become a fully qualified accounting technician covering complex accounting tasks.",
    curriculum: [
      "Applied Management Accounting",
      "Drafting and Interpreting Financial Statements",
      "Internal Accounting Systems and Controls",
      "Credit Management (Optional)",
      "Cash and Treasury Management (Optional)",
    ],
    description:
      "The highest-level AAT qualification enhancing skills from Level 3. Covers complex accounting tasks including financial statements, management accounting, and internal controls. Leads to full AAT membership (MAAT).",
    glancePoints: [
      "Highest AAT qualification — leads to MAAT membership",
      "390 guided learning hours: 3 mandatory + 2 optional units",
      "Covers management accounting, financial statements, and controls",
      "Direct progression to ACCA, CIMA, or ACA",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long does it take?", answer: "12-18 months." },
      { question: "What membership?", answer: "Full MAAT (Member of AAT)." },
      { question: "Can I set up a practice?", answer: "Yes, as a licensed accountant." },
      { question: "University equivalent?", answer: "HNC level." },
    ],
    careerRoles: [
      { title: "Management Accountant", salary: "£32,000 - £45,000" },
      { title: "Financial Analyst", salary: "£30,000 - £42,000" },
      { title: "Senior Accountant", salary: "£35,000 - £50,000" },
    ],
    avgSalary: "£38,000+",
    studyHours: 390,
    units: 5,
    duration: "12-18 months",
    assessmentType: "5 computer-based unit assessments (3 mandatory + 2 optional)",
    entryRequirements: "AAT Level 3 or equivalent qualification. Alternatively, a relevant degree or 12+ months accounting experience. Competent in double-entry bookkeeping.",
    progressionOptions: ["AAT full membership (MAAT)", "AAT Licensed Accountant", "ACCA, CIMA, or ACA professional qualifications"],
    awardingBody: "AAT",
    qualificationLevel: "Level 4",
      assessmentDetails: "Five computer-based assessments (3 mandatory + 2 optional). Graded Pass, Merit, or Distinction. 390 guided learning hours total.",
      qualificationDetails: "AAT Level 4 Diploma in Professional Accounting (RQF). 390 GLH. HNC/first-year degree equivalent. Eligible for full MAAT membership.",
      careerDescription: "Professional Accountant, Management Accountant, Financial Analyst, Tax Advisor, Audit Senior, Financial Controller. Progression to ACCA, CIMA, CIPFA, ICAEW with exemptions.",
      moduleDetails: [
      {
        name: "Drafting and Interpreting Financial Statements",
        weight: "20%",
        description: "Provides skills and knowledge for drafting financial statements of single limited companies and consolidated financial statements for groups of companies. Students apply international accounting standards and understand the regulatory and conceptual frameworks.",
        learningOutcomes: [
          "Understand the reporting frameworks that underpin financial reporting",
          "Draft statutory financial statements for limited companies",
          "Draft consolidated financial statements",
          "Interpret financial statements using ratio analysis",
        ],
      },
      {
        name: "Applied Management Accounting",
        weight: "20%",
        description: "Students learn how the budgetary process is undertaken, construct budgets, identify and report on areas of success and concern. Students critically evaluate organisational performance.",
        learningOutcomes: [
          "Understand the purpose and use of management accounting in organisations",
          "Use techniques for dealing with costs in management accounting",
          "Use cost and management accounting techniques to aid control",
          "Use techniques to aid short-term and long-term decision making",
          "Understand and manage organisational liquidity",
        ],
      },
      {
        name: "Internal Accounting Systems and Controls",
        weight: "20%",
        description: "Teaches the role and importance of internal controls within an organisation, how to identify fraud risks and assess how internal controls can mitigate them. Covers audit principles, corporate governance, and sustainability.",
        learningOutcomes: [
          "Understand business decision making",
          "Understand ethics and law in an accounting environment",
          "Understand the effective use of data in business",
          "Understand the importance of sustainability in business",
        ],
      },
      {
        name: "Business Tax",
        description: "Understanding and computing tax for sole traders, partnerships and limited companies.",
        learningOutcomes: [
        ],
      },
      {
        name: "Personal Tax",
        description: "Understanding and computing income tax and capital gains tax for individuals.",
        learningOutcomes: [
        ],
      },
      {
        name: "Audit and Assurance",
        description: "Understanding audit principles, planning, risk assessment, testing controls and producing audit reports.",
        learningOutcomes: [
        ],
      },
      {
        name: "Cash and Financial Management",
        description: "Managing cash within organisations, preparing cash budgets, understanding financing and investment options.",
        learningOutcomes: [
          "include: Prepare forecasts for cash receipts and payments",
          "Prepare cash budgets and monitor cash flows",
          "Understand the importance of managing finance and liquidity",
          "Understand ways of raising finance and investing funds.",
        ],
      },
      {
        name: "Credit and Debt Management",
        description: "Understanding effective credit control systems and appropriate debt management systems.",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- HEALTH & SOCIAL CARE ---
  "ncfe-level-2-care": {
    id: "ncfe-level-2-care",
    title: "Level 2 Diploma in Care",
    category: "Health & Social Care",
    price: 1000,
    oldPrice: 1100,
    tutorPrice: 1100,
    oneOffDiscount: 100,
    monthlyPrice: 79.17,
    oldMonthlyPrice: 87.50,
    students: 300,
    badge: "CARE",
    badgeColor: "#38B2AC",
    image: "/images/courses/health-social/ncfe-level-2-care.webp",
    overview:
      "The standard qualification for those working in adult care settings in England. Confirms occupational competence for roles such as Adult Care Worker.",
    curriculum: [
      "Communication in care settings",
      "Handle information in care settings",
      "Personal development in care settings",
      "Implement person-centred approaches",
    ],
    description:
      "Designed for learners starting or formalising careers in health and social care. Links with Adult Care Worker and Healthcare Support Worker Apprenticeship standards, covering safeguarding, person-centred care, communication, and health and safety.",
    glancePoints: [
      "Nationally recognised qualification for adult care workers",
      "307 guided learning hours, 46 credits minimum",
      "9 mandatory units + 70+ optional units available",
      "Aligns with Adult Care Worker Apprenticeship Standard",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "12 months standalone, 18-24 months in apprenticeship." },
      { question: "Need to be working?", answer: "Yes." },
      { question: "Grading?", answer: "Achieved or not yet achieved." },
      { question: "Progression?", answer: "Level 3 Diploma in Adult Care." },
    ],
    careerRoles: [
      { title: "Adult Care Worker", salary: "£20,000 - £24,000" },
      { title: "Healthcare Assistant", salary: "£21,000 - £25,000" },
      { title: "Personal Care Assistant", salary: "£19,000 - £23,000" },
    ],
    avgSalary: "£22,000+",
    studyHours: 307,
    units: 9,
    duration: "12 months",
    assessmentType: "Portfolio of evidence assessed internally",
    entryRequirements: "Aged 16+. Must be working, volunteering or on placement to demonstrate competence. No other formal requirements.",
    progressionOptions: ["NCFE CACHE Level 3 Diploma in Adult Care", "Health and Social Care Apprenticeships"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 2",
      assessmentDetails: "Internally assessed using portfolio of evidence. Methods: direct observation, witness evidence, written assignments, reflective accounts, professional discussion. Externally quality assured.",
      qualificationDetails: "NCFE CACHE Level 2 Diploma in Care (RQF). 46 credits minimum.",
      careerDescription: "Adult Care Worker, Healthcare Support Worker, Healthcare Assistant, Care Support Worker, Personal Assistant. Progression to Level 3 Diploma in Adult Care.",
      moduleDetails: [
      {
        name: "Communication in Care Settings",
        description: "Understand the importance of effective communication, different methods, overcoming barriers to communication, confidentiality",
        learningOutcomes: [
        ],
      },
      {
        name: "Personal Development in Care Settings",
        description: "Understand what is required for competence in own role, engage in personal development, reflect on practice",
        learningOutcomes: [
        ],
      },
      {
        name: "Equality and Inclusion in Care Settings",
        description: "Understand the importance of diversity, equality and inclusion; reduce the likelihood of discrimination",
        learningOutcomes: [
        ],
      },
      {
        name: "The Duty of Care in Care Settings",
        description: "Understand how duty of care contributes to safe practice, know how to address conflicts or dilemmas",
        learningOutcomes: [
        ],
      },
      {
        name: "Safeguarding and Protection in Care Settings",
        description: "Understand principles of safeguarding, recognise signs of abuse, respond to suspected abuse, protect people from harm",
        learningOutcomes: [
        ],
      },
      {
        name: "Person-Centred Approaches in Care Settings",
        description: "Understand person-centred values, consent, individual choices and preferences",
        learningOutcomes: [
        ],
      },
      {
        name: "Health, Safety and Well-being in Care Settings",
        description: "Understand responsibilities for health and safety, use risk assessments, move and handle equipment safely",
        learningOutcomes: [
        ],
      },
      {
        name: "Handling Information in Care Settings",
        description: "Understand the need for secure handling of information, access and store records",
        learningOutcomes: [
        ],
      },
      {
        name: "Infection Prevention and Control",
        description: "Understand roles and responsibilities, legislation, systems and procedures for preventing and controlling infection",
        learningOutcomes: [
        ],
      },
    ],
  },
  "ncfe-level-2-early-years": {
    id: "ncfe-level-2-early-years",
    title: "Level 2 Diploma for the Early Years Practitioner",
    category: "Health & Social Care",
    price: 395,
    oldPrice: 650,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 39,
    oldMonthlyPrice: 0,
    students: 450,
    badge: "PRACTITIONER",
    badgeColor: "#38B2AC",
    image: "/images/courses/health-social/ncfe-level-2-early-years.webp",
    overview:
      "Provides the knowledge and skills required to work with children from birth to 5 years and up to 7 years.",
    curriculum: [
      "Roles and responsibilities of the early years practitioner",
      "Health and safety of babies and young children",
      "Equality, diversity and inclusive practice",
      "Safeguarding, protection and welfare of babies and young children",
    ],
    description:
      "Develops skills and knowledge for the Early Years Practitioner role. Covers child development, safeguarding, supporting care routines, promoting play, and meeting needs of babies and young children.",
    glancePoints: [
      "NCFE CACHE-accredited early years qualification",
      "14 mandatory units, 37 credits, 250+ placement hours",
      "Covers child development, safeguarding, and inclusive practice",
      "Recognised by Ofsted and early years employers",
      "Flexible online learning with tutor support",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 12 months." },
      { question: "Need placement?", answer: "Yes, with babies and young children." },
      { question: "Progression?", answer: "Level 3 Early Years Educator qualifications." },
    ],
    careerRoles: [
      { title: "Nursery Assistant", salary: "£18,000 - £21,000" },
      { title: "Pre-School Assistant", salary: "£17,000 - £20,000" },
      { title: "Early Years Support Worker", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£20,000+",
    studyHours: 260,
    units: 14,
    duration: "4-6 months",
    assessmentType: "Portfolio of evidence assessed internally",
    entryRequirements: "Aged 16+. Placement with babies and young children required. No other formal entry requirements.",
    progressionOptions: ["Level 3 Early Years Educator", "Level 3 Diploma in Children and Young People"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      assessmentDetails: "Internally assessed: portfolio of evidence, direct observation, written assignments, reflective accounts. Externally quality assured by NCFE.",
      qualificationDetails: "NCFE CACHE Level 2 Diploma for the Early Years Practitioner (RQF). Counts towards Level 2 ratio in Early Years settings.",
      careerDescription: "Early Years Practitioner (under supervision), Nursery Assistant, Childminder's Assistant, Crèche Worker, Pre-school Assistant. Progression to Level 3 Early Years Educator.",
      moduleDetails: [
      {
        name: "Child Development (T/617/2630)",
        description: "Understand patterns of children's development from birth to 7 years, factors that influence development, and how to support children's learning",
        learningOutcomes: [
        ],
      },
      {
        name: "Safeguarding, Protection and Welfare of Babies and Young Children (A/617/2631)",
        description: "Understand safeguarding legislation, recognise signs of abuse, and how to respond appropriately",
        learningOutcomes: [
        ],
      },
      {
        name: "Health and Safety of Babies and Young Children in the Early Years (F/617/2632)",
        description: "Maintain a safe environment, understand health and safety legislation, risk assessment",
        learningOutcomes: [
        ],
      },
      {
        name: "Equality and Inclusion for Babies and Young Children in Early Years (J/617/2633)",
        description: "Understand and promote equality, diversity and inclusion in early years practice",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Care Routines for Babies and Young Children (M/617/2635)",
        description: "Support feeding, sleeping, hygiene routines, toilet training",
        learningOutcomes: [
        ],
      },
      {
        name: "Support the Planning and Delivery of Activities, Purposeful Play Opportunities and Educational Programmes (T/617/2636)",
        description: "Plan and provide age-appropriate activities",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote Play in an Early Years Setting (A/617/2637)",
        description: "Understand the importance of play, create play environments, support children's play",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Well-Being of Babies and Young Children for Healthy Lifestyles (F/617/2638)",
        description: "Promote healthy eating, physical activity, emotional well-being",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Babies and Young Children to be Physically Active (J/617/2639)",
        description: "Plan and provide physical activities, understand the importance of movement",
        learningOutcomes: [
        ],
      },
      {
        name: "Support the Needs of Babies and Young Children with Special Educational Needs and Disability (L/617/1993)",
        description: "Understand SEND, support inclusive practice",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote Positive Behaviour in Early Years Settings (F/617/2641)",
        description: "Understand expectations, manage behaviour positively",
        learningOutcomes: [
        ],
      },
      {
        name: "Partnership Working in the Early Years (J/617/2642)",
        description: "Work with parents, carers and other professionals",
        learningOutcomes: [
        ],
      },
      {
        name: "Support the Needs of the Child in Preparing for School (L/617/2643)",
        description: "Support transition to school, develop school readiness skills",
        learningOutcomes: [
        ],
      },
    ],
  },
  "ncfe-level-3-adult-care": {
    id: "ncfe-level-3-adult-care",
    title: "Level 3 Diploma in Adult Care",
    category: "Health & Social Care",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 600,
    badge: "ADVANCED",
    badgeColor: "#D69E2E",
    image: "/images/courses/health-social/ncfe-level-3-adult-care.webp",
    overview:
      "For those working in lead adult care roles. Develops the knowledge and skills required to work in a senior capacity.",
    curriculum: [
      "Promote personal development in care settings",
      "Promote equality and inclusion in care settings",
      "Promote communication in care settings",
      "Promote health, safety and wellbeing in care settings",
    ],
    description:
      "Designed for learners starting or formalising careers in health and social care. Links with Adult Care Worker and Healthcare Support Worker Apprenticeship standards, covering safeguarding, person-centred care, communication, and health and safety.",
    glancePoints: [
      "Required qualification for senior care worker roles",
      "Aligns with Lead Adult Care Worker Apprenticeship Standard",
      "Covers safeguarding, leadership, and person-centred care",
      "Portfolio-based assessment in the workplace",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "12 months standalone, 18-24 months in apprenticeship." },
      { question: "Need to be working?", answer: "Yes." },
      { question: "Grading?", answer: "Achieved or not yet achieved." },
      { question: "Progression?", answer: "Level 3 Diploma in Adult Care." },
    ],
    careerRoles: [
      { title: "Senior Care Worker", salary: "£23,000 - £28,000" },
      { title: "Lead Adult Care Worker", salary: "£24,000 - £30,000" },
      { title: "Team Leader (Care)", salary: "£25,000 - £32,000" },
    ],
    avgSalary: "£26,000+",
    studyHours: 450,
    duration: "12-18 months",
    assessmentType: "Portfolio of evidence assessed internally",
    entryRequirements: "Aged 16+. Must be working, volunteering or on placement to demonstrate competence. No other formal requirements.",
    progressionOptions: ["Level 5 Diploma in Leadership and Management for Adult Care"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      assessmentDetails: "Internally assessed using portfolio of evidence. Methods: direct observation, witness evidence, written assignments, reflective accounts, professional discussion. Externally quality assured.",
      qualificationDetails: "NCFE CACHE Level 2 Diploma in Care (RQF). 46 credits minimum.",
      careerDescription: "Adult Care Worker, Healthcare Support Worker, Healthcare Assistant, Care Support Worker, Personal Assistant. Progression to Level 3 Diploma in Adult Care.",
      moduleDetails: [
      {
        name: "Communication in Care Settings",
        description: "Understand communication methods, overcoming barriers, confidentiality, recording information",
        learningOutcomes: [
        ],
      },
      {
        name: "Personal Development in Care Settings",
        description: "Competence in own role, personal development planning, reflection on practice",
        learningOutcomes: [
        ],
      },
      {
        name: "Equality and Inclusion in Care Settings",
        description: "Promote diversity, equality and inclusion; reduce discrimination",
        learningOutcomes: [
        ],
      },
      {
        name: "The Duty of Care in Care Settings",
        description: "Understand duty of care, address conflicts and dilemmas, respond to complaints",
        learningOutcomes: [
        ],
      },
      {
        name: "Safeguarding and Protection in Care Settings",
        description: "Recognise signs of abuse, understand whistleblowing, respond to suspected abuse",
        learningOutcomes: [
        ],
      },
      {
        name: "Person-Centred Approaches in Care Settings",
        description: "Person-centred values, consent, risk-taking, individual care planning",
        learningOutcomes: [
        ],
      },
      {
        name: "Health, Safety and Well-being in Care Settings",
        description: "Health and safety legislation, risk assessment, moving and handling, fire safety, first aid",
        learningOutcomes: [
        ],
      },
      {
        name: "Handling Information in Care Settings",
        description: "Secure handling of information, data protection, recording and storing information",
        learningOutcomes: [
        ],
      },
      {
        name: "Responsibilities of a Care Worker",
        description: "Understand working relationships, agreed ways of working, partnership working",
        learningOutcomes: [
        ],
      },
    ],
  },
  "ncfe-level-5-adult-care": {
    id: "ncfe-level-5-adult-care",
    title: "Level 5 Diploma in Leadership and Management for Adult Care",
    category: "Health & Social Care",
    price: 1500,
    oldPrice: 1600,
    tutorPrice: 1600,
    oneOffDiscount: 200,
    monthlyPrice: 120.83,
    oldMonthlyPrice: 129.17,
    students: 120,
    badge: "MANAGEMENT",
    badgeColor: "#805AD5",
    image: "/images/courses/health-social/ncfe-level-5-adult-care.webp",
    overview:
      "A comprehensive qualification for those managing an adult care service. Covers leadership, governance, and strategic management.",
    curriculum: [
      "Leadership and management in adult care",
      "Governance and regulatory processes",
      "Communication and information management",
      "Decision making in adult care",
    ],
    description:
      "Provides skills and knowledge for managing and leading in adult care settings. Developed with Skills for Care, meets Leader in Adult Care apprenticeship standard requirements.",
    glancePoints: [
      "Meets CQC registered manager requirements",
      "Covers governance, leadership, and strategic management",
      "Required for managers of CQC-regulated services",
      "Portfolio-based assessment with tutor support",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "18-24 months." },
      { question: "Need to be working?", answer: "Yes, in management role." },
      { question: "Meets CQC requirements?", answer: "Yes, for registered managers." },
    ],
    careerRoles: [
      { title: "Registered Manager", salary: "£32,000 - £45,000" },
      { title: "Deputy Manager (Care)", salary: "£28,000 - £36,000" },
      { title: "Service Manager", salary: "£35,000 - £50,000" },
    ],
    avgSalary: "£38,000+",
    studyHours: 600,
    duration: "18-24 months",
    assessmentType: "Portfolio of evidence assessed internally",
    entryRequirements: "Aged 19+. Must be working as deputy manager or manager in adult care. Recommended Level 3 or above in related area.",
    progressionOptions: ["CQC Registered Manager registration", "Continued professional development in health and social care management"],
    awardingBody: "NCFE/TQUK",
    tutorPriceLabel: "NCFE Certification (Online)",
    onlinePriceLabel: "TQUK Certification (Online)",
    qualificationLevel: "Level 5",
      assessmentDetails: "Internally assessed: observation, witness evidence, professional discussion, reflection, written assignments, portfolio of evidence, case studies. Achieved/not yet achieved grading.",
      qualificationDetails: "NCFE CACHE Level 5 Diploma in Leadership and Management for Adult Care (RQF). 95 credits.",
      careerDescription: "Care Home Manager, Service Manager, Deputy Manager, Registered Manager, Area Manager. Progression to degree-level study.",
      moduleDetails: [
      {
        name: "Leadership and Management in Adult Care",
        description: "Understand leadership and management theories and styles, lead and manage a team, manage performance",
        learningOutcomes: [
        ],
      },
      {
        name: "Governance and Regulatory Processes in Adult Care",
        description: "Understand the regulatory framework, CQC requirements, compliance",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication and Information Management in Adult Care",
        description: "Lead effective communication, manage information systems, data protection (GDPR)",
        learningOutcomes: [
        ],
      },
      {
        name: "Safeguarding, Protection and Risk",
        description: "Lead safeguarding practice, manage risk, understand Mental Capacity Act",
        learningOutcomes: [
        ],
      },
      {
        name: "Partnership Working and Relationship Management",
        description: "Work with external agencies, manage working relationships, community engagement",
        learningOutcomes: [
        ],
      },
      {
        name: "Person-Centred Practice for Positive Outcomes",
        description: "Lead person-centred practice, promote independence, dignity and respect",
        learningOutcomes: [
        ],
      },
      {
        name: "Professional Development, Supervision and Performance Management",
        description: "Manage CPD, conduct supervision, appraisals and performance reviews",
        learningOutcomes: [
        ],
      },
      {
        name: "Decision Making Skills",
        description: "Use evidence-based practice, critical thinking, problem solving",
        learningOutcomes: [
        ],
      },
      {
        name: "Entrepreneurial Skills and Innovation",
        description: "Business planning, service improvement, innovation in care delivery",
        learningOutcomes: [
        ],
      },
      {
        name: "Resource Management",
        description: "Manage budgets, staffing, physical resources",
        learningOutcomes: [
        ],
      },
      {
        name: "Quality Assurance and Service Improvement",
        description: "Implement quality systems, auditing, inspection preparation",
        learningOutcomes: [
        ],
      },
      {
        name: "Managing Specific Services",
        description: "Understand different service types, registration requirements, regulatory compliance",
        learningOutcomes: [
        ],
      },
    ],
  },
  "level-5-residential-childcare": {
    id: "level-5-residential-childcare",
    title:
      "Level 5 Diploma in Leadership and Management for Residential Childcare (England)",
    category: "Health & Social Care",
    price: 1600,
    oldPrice: 1600,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 129.17,
    oldMonthlyPrice: 0,
    students: 85,
    badge: "MANAGEMENT",
    badgeColor: "#805AD5",
    image: "/images/courses/health-social/level-5-residential-childcare.webp",
    overview:
      "Designed for those managing residential childcare settings. Covers leading and managing a service for positive outcomes.",
    curriculum: [
      "Leading and managing a residential childcare setting",
      "Leading and supporting children and young people",
      "Leading practice to support the safeguarding of children",
      "Managing risk and legal compliance",
    ],
    description:
      "For those in or aspiring to management roles in children's residential care. Meets qualification requirements under Children's Homes (England) Regulations 2015 for registered managers.",
    glancePoints: [
      "Meets Ofsted requirements for residential childcare managers",
      "Covers leadership, safeguarding, and legal compliance",
      "Designed for managers of children's residential care homes",
      "Portfolio-based assessment with dedicated tutor support",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "18-24 months." },
      { question: "Legal requirement?", answer: "Meets Children's Homes Regulations 2015." },
      { question: "Need to be working?", answer: "Yes, in management role." },
    ],
    careerRoles: [
      { title: "Registered Manager (Children's Home)", salary: "£32,000 - £45,000" },
      { title: "Deputy Manager (Residential Childcare)", salary: "£28,000 - £36,000" },
      { title: "Service Manager (Children's Services)", salary: "£35,000 - £48,000" },
    ],
    avgSalary: "£38,000+",
    studyHours: 600,
    duration: "18-24 months",
    assessmentType: "Portfolio of evidence assessed internally",
    entryRequirements: "Aged 19+. Must be working as deputy/manager in residential childcare. Recommended Level 3 in related area.",
    progressionOptions: ["Ofsted registered manager registration", "Continued professional development in children's services management"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 5",
      assessmentDetails: "Internally assessed: observation, portfolio, assignments, witness testimony, reflective accounts. Externally quality assured.",
      qualificationDetails: "NCFE CACHE Level 5 Diploma in Leadership and Management for Residential Childcare (England) (RQF). 65 credits.",
      careerDescription: "Registered Residential Childcare Manager, Deputy Manager, Team Leader. Progression to Level 6 or degree programmes.",
      moduleDetails: [
      {
        name: "Understand How to Lead and Manage Residential Childcare Settings",
        description: "Leadership theories and styles, managing change, governance",
        learningOutcomes: [
        ],
      },
      {
        name: "Safeguard Children and Young People in Residential Childcare",
        description: "Lead safeguarding practice, manage allegations, interagency working",
        learningOutcomes: [
        ],
      },
      {
        name: "Partnership Working in Residential Childcare",
        description: "Multi-agency collaboration, lead inter-professional working, engage families",
        learningOutcomes: [
        ],
      },
      {
        name: "Professional Development in Residential Childcare Management",
        description: "Manage CPD for self and staff, supervision, appraisal",
        learningOutcomes: [
        ],
      },
      {
        name: "Provide a Supportive Environment for Residential Childcare",
        description: "Create positive living environments, promote attachment and resilience",
        learningOutcomes: [
        ],
      },
      {
        name: "Quality Assurance in Residential Childcare",
        description: "Implement quality systems, self-evaluation, inspection preparation, Ofsted compliance",
        learningOutcomes: [
        ],
      },
      {
        name: "Carry Out Policy in Residential Childcare Settings",
        description: "Develop, implement and review policies and procedures",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote and Develop Best Practice in Residential Childcare",
        description: "Evidence-based practice, research, innovation",
        learningOutcomes: [
        ],
      },
      {
        name: "Team Management in Residential Childcare",
        description: "Recruit, manage and develop staff teams, delegation, rota management",
        learningOutcomes: [
        ],
      },
      {
        name: "Resource Management in Residential Childcare",
        description: "Budget management, physical resources, facilities management",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- OCCUPATIONAL STUDIES ---
  "occ-studies-cert": {
    id: "occ-studies-cert",
    title: "Certificate in Occupational Studies for the Workplace",
    category: "Occupational Studies",
    price: 250,
    oldPrice: 350,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 25,
    oldMonthlyPrice: 0,
    students: 200,
    badge: "WORKPLACE",
    badgeColor: "#319795",
    image: "/images/courses/occupational/occ-studies-cert.webp",
    overview:
      "A solid base from which to further develop your skills and learning. Prepares learners for work through real or simulated work situations.",
    curriculum: [
      "Building confidence for the workplace",
      "Understand how to work in a team",
      "Health and safety in the workplace",
    ],
    description:
      "This Level 1 Certificate provides practical occupational skills for the workplace at Level 1. It develops employability skills and vocational knowledge for entering or progressing in employment.",
    glancePoints: [
      "NCFE-accredited workplace preparation qualification",
      "88 guided learning hours, 13 credits",
      "Practical skills through real or simulated work situations",
      "No formal entry requirements — accessible to all abilities",
      "Progression to Level 2 Occupational Studies available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically up to one year." },
      { question: "Suitable for beginners?", answer: "Yes." },
      { question: "Progression?", answer: "To higher-level occupational studies or vocational qualifications." },
    ],
    careerRoles: [
      { title: "Workplace Trainee", salary: "£16,000 - £19,000" },
      { title: "Admin Assistant", salary: "£17,000 - £20,000" },
      { title: "Customer Service Assistant", salary: "£17,000 - £20,000" },
    ],
    avgSalary: "£18,000+",
    studyHours: 88,
    units: 3,
    duration: "4-8 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Suitable for learners aged 16+. Centres may set own guidelines.",
      assessmentDetails: "Internally assessed through portfolio of evidence, practical demonstrations, assignments, and observation. Externally quality assured by NCFE.",
      qualificationDetails: "NCFE Level 1 Certificate in Occupational Studies for the Workplace (RQF). Nationally recognised.",
      careerDescription: "Entry-level roles across various workplace sectors. Progression to higher-level vocational qualifications.",
      moduleDetails: [
      {
        name: "Preparing for Work",
        description: "Understand different types of employment, rights and responsibilities, job seeking skills",
        learningOutcomes: [
        ],
      },
      {
        name: "Working with Others",
        description: "Teamwork, communication, respecting diversity, resolving conflicts",
        learningOutcomes: [
        ],
      },
      {
        name: "Health and Safety in the Workplace",
        description: "Understand hazards and risks, personal responsibility, safe working practices",
        learningOutcomes: [
          "Using ICT in the Workplace",
          "Working in Hospitality",
          "Working in Retail",
          "Working in Construction",
          "Working in Health and Social Care",
          "Customer Service Skills",
          "Planning an Enterprise Activity",
        ],
      },
    ],
  },
  "occ-studies-diploma": {
    id: "occ-studies-diploma",
    title: "Diploma in Occupational Studies for the Workplace",
    category: "Occupational Studies",
    price: 350,
    oldPrice: 495,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 35,
    oldMonthlyPrice: 0,
    students: 150,
    badge: "WORKPLACE",
    badgeColor: "#319795",
    image: "/images/courses/occupational/occ-studies-diploma.webp",
    overview:
      "A comprehensive qualification providing practical skills and knowledge for the workplace.",
    curriculum: [
      "Workplace Preparation",
      "Occupational Skills Development",
      "Effective Communication",
      "Problem Solving at Work",
    ],
    description:
      "This Level 1 Diploma provides practical occupational skills for the workplace at Level 1. It develops employability skills and vocational knowledge for entering or progressing in employment.",
    glancePoints: [
      "NCFE-accredited comprehensive workplace qualification",
      "Extended programme beyond the Level 1 Certificate",
      "Covers communication, teamwork, and problem-solving",
      "No formal entry requirements needed",
      "Progression to Level 2 Occupational Studies",
    ],
    faqs: [
      { question: "How long?", answer: "Typically up to one year." },
      { question: "Suitable for beginners?", answer: "Yes." },
      { question: "Progression?", answer: "To higher-level occupational studies or vocational qualifications." },
    ],
    careerRoles: [
      { title: "Workplace Trainee", salary: "£16,000 - £19,000" },
      { title: "Retail Assistant", salary: "£17,000 - £20,000" },
      { title: "Warehouse Operative", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£18,000+",
    studyHours: 130,
    duration: "6-10 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Suitable for learners aged 16+. Centres may set own guidelines.",
      assessmentDetails: "Internally assessed through portfolio of evidence, practical demonstrations, assignments, and observation. Externally quality assured by NCFE.",
      qualificationDetails: "NCFE Level 1 Diploma in Occupational Studies for the Workplace (RQF). Nationally recognised.",
      careerDescription: "Entry-level roles across various workplace sectors. Progression to higher-level vocational qualifications.",
      moduleDetails: [
      {
        name: "Preparing for Work",
        description: "Employment types, rights, responsibilities, job seeking, interview skills",
        learningOutcomes: [
        ],
      },
      {
        name: "Working with Others",
        description: "Teamwork, communication, respecting diversity",
        learningOutcomes: [
        ],
      },
      {
        name: "Health and Safety in the Workplace",
        description: "Hazards, risks, personal responsibility, safe working",
        learningOutcomes: [
          "Using ICT in the Workplace",
          "Working in Hospitality / Retail / Construction / Health and Social Care",
          "Customer Service Skills",
          "Planning an Enterprise Activity",
          "Personal Development and Wellbeing",
          "Problem Solving in the Workplace",
        ],
      },
    ],
  },
  "level-2-occ-studies": {
    id: "level-2-occ-studies",
    title: "Level 2 Certificate in Occupational Studies for the Workplace",
    category: "Occupational Studies",
    price: 295,
    oldPrice: 450,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 29,
    oldMonthlyPrice: 0,
    students: 180,
    badge: "LEVEL 2",
    badgeColor: "#319795",
    image: "/images/courses/occupational/level-2-occ-studies.webp",
    overview:
      "Progression from the Level 1 certificate, offering more in-depth knowledge and practical skills for the modern workplace.",
    curriculum: [
      "Advanced Workplace Skills",
      "Team Leadership Basics",
      "Vocational Specific Components",
    ],
    description:
      "This Level 2 Certificate provides practical occupational skills for the workplace at Level 2. It develops employability skills and vocational knowledge for entering or progressing in employment.",
    glancePoints: [
      "NCFE-accredited Level 2 workplace qualification",
      "Progression from Level 1 Occupational Studies",
      "Covers advanced workplace skills and team leadership",
      "Prepares for employment or apprenticeship entry",
      "No formal entry requirements",
    ],
    faqs: [
      { question: "How long?", answer: "Typically up to one year." },
      { question: "Suitable for beginners?", answer: "Yes." },
      { question: "Progression?", answer: "To higher-level occupational studies or vocational qualifications." },
    ],
    careerRoles: [
      { title: "Junior Team Member", salary: "£18,000 - £22,000" },
      { title: "Customer Service Adviser", salary: "£19,000 - £23,000" },
      { title: "Administrative Assistant", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£20,000+",
    studyHours: 150,
    duration: "8-12 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Suitable for learners aged 16+. Centres may set own guidelines.",
      assessmentDetails: "Internally assessed through portfolio of evidence, practical demonstrations, assignments, and observation. Externally quality assured by NCFE.",
      qualificationDetails: "NCFE Level 2 Certificate in Occupational Studies for the Workplace (RQF). Nationally recognised.",
      careerDescription: "Entry-level roles across various workplace sectors. Progression to higher-level vocational qualifications.",
      moduleDetails: [
      {
        name: "Preparing for Work at Level 2",
        description: "Understanding employment, CV writing, interview techniques, career planning",
        learningOutcomes: [
        ],
      },
      {
        name: "Working with Others at Level 2",
        description: "Effective teamwork, leadership awareness, conflict resolution",
        learningOutcomes: [
        ],
      },
      {
        name: "Health and Safety Responsibilities",
        description: "H&S legislation, risk assessment, reporting procedures",
        learningOutcomes: [
          "Digital Skills for the Workplace",
          "Customer Service Excellence",
          "Planning and Running an Enterprise Project",
          "Problem Solving and Decision Making",
          "Sector-specific work-related units (Hospitality, Retail, Construction, Care, etc.)",
        ],
      },
    ],
  },
  "personal-dev-cert": {
    id: "personal-dev-cert",
    title: "Certificate in Personal Development for Employability (RQF)",
    category: "Occupational Studies",
    price: 220,
    oldPrice: 350,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 22,
    oldMonthlyPrice: 0,
    students: 300,
    badge: "EMPLOYABILITY",
    badgeColor: "#ED8936",
    image: "/images/courses/occupational/personal-dev-cert.webp",
    overview:
      "Develop the personal and social skills needed for employment. Covers confidence building, job searching, and interview techniques.",
    curriculum: [
      "Self-Assessment",
      "Career Planning",
      "Preparing for an Interview",
      "Searching for a Job",
    ],
    description:
      "Develops personal skills and attributes for employability including self-awareness, goal-setting, interpersonal skills, and understanding employer expectations.",
    glancePoints: [
      "NCFE-accredited employability qualification",
      "Covers CV writing, interview skills, and career planning",
      "Builds confidence and personal development skills",
      "No prior qualifications required",
      "Flexible online learning with tutor support",
    ],
    faqs: [
      { question: "How long?", answer: "A few weeks to months." },
      { question: "For whom?", answer: "Those seeking basic employability skills." },
      { question: "Progression?", answer: "Level 2 qualifications." },
    ],
    careerRoles: [
      { title: "Customer Service Assistant", salary: "£17,000 - £21,000" },
      { title: "Retail Assistant", salary: "£17,000 - £20,000" },
      { title: "Administrative Assistant", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£19,000+",
    studyHours: 80,
    duration: "4-6 weeks",
    awardingBody: "Highfield",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 16+. For those looking to develop employability skills.",
      assessmentDetails: "Internally assessed through portfolio, assignments, and practical activities. Externally quality assured.",
      qualificationDetails: "Highfield Level 1 Award in Personal Development for Employability (RQF).",
      careerDescription: "Entry-level employment across sectors. Progression to Level 2 employability qualifications.",
      moduleDetails: [
      {
        name: "Self-Assessment and Personal Development Planning",
        description: "Identify strengths, weaknesses, set SMART targets",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication Skills for Employment",
        description: "Verbal and written communication, listening skills, body language",
        learningOutcomes: [
        ],
      },
      {
        name: "Teamwork Skills",
        description: "Working cooperatively, understanding team roles, contributing effectively",
        learningOutcomes: [
        ],
      },
      {
        name: "Preparing for Employment",
        description: "CV writing, application forms, interview preparation",
        learningOutcomes: [
        ],
      },
      {
        name: "Managing Personal Finance",
        description: "Budgeting, understanding payslips, banking basics",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Rights and Responsibilities in the Workplace",
        description: "Employment law basics, equality, health and safety",
        learningOutcomes: [
        ],
      },
      {
        name: "Digital Skills for Work",
        description: "Basic IT skills, email, internet use for work",
        learningOutcomes: [
        ],
      },
    ],
  },
  "personal-dev-diploma": {
    id: "personal-dev-diploma",
    title: "Diploma in Personal Development for Employability (RQF)",
    category: "Occupational Studies",
    price: 320,
    oldPrice: 450,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 32,
    oldMonthlyPrice: 0,
    students: 250,
    badge: "EMPLOYABILITY",
    badgeColor: "#ED8936",
    image: "/images/courses/occupational/personal-dev-diploma.webp",
    overview:
      "An extensive course covering personal development and employability skills with extended workplace behaviour modules.",
    curriculum: [
      "Effective Communication",
      "Working as part of a team",
      "Managing personal finance",
      "Rights and responsibilities in the workplace",
    ],
    description:
      "Builds on Level 1 to further develop personal skills and attributes for employability, providing deeper understanding of workplace skills, career planning, and professional development.",
    glancePoints: [
      "Extended NCFE employability qualification",
      "Covers communication, teamwork, finance, and workplace rights",
      "More comprehensive than the certificate programme",
      "No prior qualifications required",
      "Flexible online learning with tutor support",
    ],
    faqs: [
      { question: "How long?", answer: "Few months." },
      { question: "GCSE equivalent?", answer: "Yes, Level 2." },
      { question: "Progression?", answer: "Sector-specific Level 3 qualifications." },
    ],
    careerRoles: [
      { title: "Team Member", salary: "£18,000 - £22,000" },
      { title: "Customer Service Adviser", salary: "£19,000 - £23,000" },
      { title: "Office Junior", salary: "£17,000 - £20,000" },
    ],
    avgSalary: "£19,000+",
    studyHours: 130,
    duration: "6-10 weeks",
    awardingBody: "Highfield",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 16+. Level 1 Award may be beneficial.",
      assessmentDetails: "Internally assessed through portfolio, assignments, practical activities. Externally quality assured.",
      qualificationDetails: "Highfield Level 2 Certificate in Personal Development for Employability (RQF). Level 2 equivalent.",
      careerDescription: "Employment across various sectors. Progression to Level 3 or vocational qualifications.",
      moduleDetails: [
      {
        name: "Career Planning and Development",
        description: "Research careers, set goals, create action plans",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication and Presentation Skills",
        description: "Present information clearly, use appropriate methods",
        learningOutcomes: [
        ],
      },
      {
        name: "Problem Solving in the Workplace",
        description: "Identify problems, generate solutions, evaluate outcomes",
        learningOutcomes: [
        ],
      },
      {
        name: "Digital Literacy for the Workplace",
        description: "Use software applications, online tools, digital communication",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Employment Rights and Responsibilities",
        description: "Contract types, pay, working hours, disciplinary procedures",
        learningOutcomes: [
        ],
      },
      {
        name: "Working as Part of a Team",
        description: "Leadership, delegation, conflict management",
        learningOutcomes: [
        ],
      },
      {
        name: "Financial Awareness",
        description: "Payroll, deductions, budgeting, financial planning",
        learningOutcomes: [
        ],
      },
      {
        name: "Interview Skills and Techniques",
        description: "Prepare, perform and review interview performance",
        learningOutcomes: [
        ],
      },
      {
        name: "Enterprise and Entrepreneurship",
        description: "Business ideas, planning, marketing basics",
        learningOutcomes: [
        ],
      },
    ],
  },
  "work-related-cert": {
    id: "work-related-cert",
    title:
      "Certificate in Work-Related Studies for the Customer Service Sector (RQF)",
    category: "Occupational Studies",
    price: 250,
    oldPrice: 395,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 25,
    oldMonthlyPrice: 0,
    students: 190,
    badge: "CUSTOMER SERVICE",
    badgeColor: "#4299E1",
    image: "/images/courses/occupational/work-related-cert.webp",
    overview:
      "Prepares learners for work in the customer service sector. Covers the basics of customer interactions and service delivery.",
    curriculum: [
      "Principles of Customer Service",
      "Communication with Customers",
      "Handling Customer Complaints",
    ],
    description:
      "Introduces principles of customer service in a work environment. Covers basic customer service skills, communication, and understanding customer needs.",
    glancePoints: [
      "NCFE-accredited customer service qualification",
      "Covers customer interaction, communication, and complaint handling",
      "Sector-specific preparation for service industry roles",
      "No prior qualifications required",
      "Flexible online learning with tutor support",
    ],
    faqs: [
      { question: "How long?", answer: "A few weeks to months." },
      { question: "For whom?", answer: "Those new to customer service." },
      { question: "Progression?", answer: "Level 1 Diploma or Level 2." },
    ],
    careerRoles: [
      { title: "Customer Service Assistant", salary: "£18,000 - £22,000" },
      { title: "Retail Sales Assistant", salary: "£17,000 - £21,000" },
      { title: "Receptionist", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£20,000+",
    studyHours: 90,
    duration: "4-8 weeks",
    awardingBody: "Highfield",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 16+. For those new to customer service.",
      assessmentDetails: "Internally assessed through portfolio, assignments, and practical demonstrations. Externally quality assured.",
      qualificationDetails: "Highfield Level 1 Award in Work-Related Studies for Customer Service (RQF).",
      careerDescription: "Customer Service Assistant, Retail Assistant, Receptionist, Call Centre Operator. Progression to Level 1 Diploma or Level 2 qualifications.",
      moduleDetails: [
      {
        name: "Introduction to Customer Service",
        description: "What customer service is, why it matters, types of customers",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication in Customer Service",
        description: "Verbal, non-verbal and written communication with customers",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Customer Needs",
        description: "Identifying and meeting customer expectations",
        learningOutcomes: [
        ],
      },
      {
        name: "Working in a Customer Service Team",
        description: "Team roles, supporting colleagues, sharing information",
        learningOutcomes: [
        ],
      },
      {
        name: "Personal Presentation in Customer Service",
        description: "Appearance, attitude, professionalism",
        learningOutcomes: [
        ],
      },
      {
        name: "Handling Customer Queries",
        description: "Taking and passing on messages, providing information, escalating issues",
        learningOutcomes: [
        ],
      },
    ],
  },
  "work-related-diploma": {
    id: "work-related-diploma",
    title:
      "Diploma in Work-Related Studies for the Customer Service Sector (RQF)",
    category: "Occupational Studies",
    price: 350,
    oldPrice: 495,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 35,
    oldMonthlyPrice: 0,
    students: 140,
    badge: "CUSTOMER SERVICE",
    badgeColor: "#4299E1",
    image: "/images/courses/occupational/work-related-diploma.webp",
    overview:
      "A comprehensive qualification for those pursuing a career in customer service with advanced service standards modules.",
    curriculum: [
      "Delivering Reliable Customer Service",
      "Understanding Customer Needs",
      "Dealing with Difficult Situations",
      "Processing Customer Info",
    ],
    description:
      "Provides broader, more comprehensive understanding of customer service than the Award. Prepares learners for customer-facing roles with practical workplace skills.",
    glancePoints: [
      "Comprehensive NCFE customer service qualification",
      "Covers advanced customer service skills and complaint resolution",
      "Builds on the Certificate in Work-Related Studies",
      "Recognised by employers across all service sectors",
      "Flexible online learning with tutor support",
    ],
    faqs: [
      { question: "How long?", answer: "Several months." },
      { question: "Work placement?", answer: "Not always required but recommended." },
      { question: "Progression?", answer: "Level 2 customer service qualifications." },
    ],
    careerRoles: [
      { title: "Customer Service Adviser", salary: "£19,000 - £24,000" },
      { title: "Contact Centre Agent", salary: "£19,000 - £23,000" },
      { title: "Customer Relations Officer", salary: "£20,000 - £25,000" },
    ],
    avgSalary: "£21,000+",
    studyHours: 140,
    duration: "6-10 weeks",
    awardingBody: "Highfield",
    qualificationLevel: "Level 1",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 16+. Level 1 Award completion may be beneficial.",
      assessmentDetails: "Internally assessed through portfolio, assignments, and practical demonstrations. Externally quality assured.",
      qualificationDetails: "Highfield Level 1 Diploma in Work-Related Studies for Customer Service (RQF).",
      careerDescription: "Customer Service Advisor, Retail Sales Assistant, Front of House Staff, Customer Support Representative. Progression to Level 2 qualifications.",
      moduleDetails: [
      {
        name: "Handling Customer Complaints",
        description: "Understanding complaints process, resolution techniques",
        learningOutcomes: [
        ],
      },
      {
        name: "Using Technology in Customer Service",
        description: "Telephone, email, live chat, social media",
        learningOutcomes: [
        ],
      },
      {
        name: "Product and Service Knowledge",
        description: "Understanding what you sell/provide to advise customers",
        learningOutcomes: [
        ],
      },
      {
        name: "Dealing with Different Types of Customers",
        description: "Adapting approach, vulnerable customers, cultural awareness",
        learningOutcomes: [
        ],
      },
      {
        name: "Record Keeping in Customer Service",
        description: "Maintaining customer records, data protection basics",
        learningOutcomes: [
        ],
      },
      {
        name: "Improving Customer Service",
        description: "Gathering feedback, identifying improvements, measuring satisfaction",
        learningOutcomes: [
        ],
      },
    ],
  },
  "health-safety-award": {
    id: "health-safety-award",
    title:
      "Award in the Principles of Health and Safety within the Workplace (RQF)",
    category: "Occupational Studies",
    price: 120,
    oldPrice: 200,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 12,
    oldMonthlyPrice: 0,
    students: 800,
    badge: "SAFETY",
    badgeColor: "#E53E3E",
    image: "/images/courses/occupational/health-safety-award.webp",
    overview:
      "Essential health and safety knowledge for any workplace. Covers risk assessment, manual handling, and legal responsibilities.",
    curriculum: [
      "Introduction to Health and Safety",
      "Workplace Hazards and Risks",
      "Workplace Conditions",
      "Health and Safety Procedures",
    ],
    description:
      "Introduction to workplace health and safety covering key legislation, hazard identification, and risk management principles relevant to all workplaces.",
    glancePoints: [
      "NCFE-accredited health and safety qualification",
      "Covers risk assessment, hazard identification, and safety procedures",
      "Relevant to all industries and workplace settings",
      "Short course — can be completed in 2-4 weeks",
      "No prior qualifications required",
    ],
    faqs: [
      { question: "How long?", answer: "Few days to weeks." },
      { question: "Who needs this?", answer: "Anyone requiring basic H&S awareness." },
      { question: "Progression?", answer: "Level 2 health and safety qualifications." },
    ],
    careerRoles: [
      { title: "Health and Safety Officer", salary: "£25,000 - £35,000" },
      { title: "Site Supervisor", salary: "£28,000 - £38,000" },
      { title: "Facilities Coordinator", salary: "£22,000 - £28,000" },
    ],
    avgSalary: "£25,000+",
    studyHours: 28,
    duration: "2-4 weeks",
    awardingBody: "Highfield",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 16+. For those entering or in the workplace.",
      assessmentDetails: "Internally assessed through written assignments, practical activities, and observation. Externally quality assured.",
      qualificationDetails: "Highfield Level 1 Award in Workplace Health and Safety (RQF).",
      careerDescription: "Applicable to all workplace roles. Supports employment in any sector. Progression to Level 2 health and safety qualifications.",
      moduleDetails: [
      {
        name: "The Importance of Health and Safety in the Workplace",
        description: "Why health and safety matters, employer and employee responsibilities, health and safety legislation overview",
        learningOutcomes: [
        ],
      },
      {
        name: "Identifying Hazards and Assessing Risks",
        description: "Common workplace hazards, risk assessment basics, control measures",
        learningOutcomes: [
        ],
      },
      {
        name: "Maintaining a Safe Working Environment",
        description: "Housekeeping, personal protective equipment (PPE), safe use of equipment",
        learningOutcomes: [
        ],
      },
      {
        name: "Emergency and First Aid Procedures",
        description: "Fire safety, evacuation procedures, basic first aid awareness, accident reporting",
        learningOutcomes: [
        ],
      },
      {
        name: "Safe Manual Handling",
        description: "Principles of safe lifting, moving and carrying loads",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- FUNCTIONAL SKILLS ---
  "functional-maths-level-1": {
    id: "functional-maths-level-1",
    title: "Level 1 Functional Skills Qualification in Mathematics",
    category: "Functional Skills",
    price: 200,
    oldPrice: 200,
    tutorPrice: 0,
    oneOffDiscount: 50,
    monthlyPrice: 12.50,
    oldMonthlyPrice: 0,
    students: 2200,
    badge: "MATHS",
    badgeColor: "#3182CE",
    image: "/images/courses/functional-skills/functional-maths-level-1.webp",
    overview:
      "Develop practical, transferable skills in Mathematics to work confidently, effectively, and independently in life.",
    curriculum: [
      "Using numbers and the number system",
      "Using common measures, shape and space",
      "Handling information and data",
    ],
    description:
      "Assesses ability to apply mathematical skills to practical, real-world situations. Covers essential numeracy including whole numbers, fractions, decimals, and data interpretation.",
    glancePoints: [
      "NCFE-accredited Functional Skills qualification",
      "Covers number, measure, shape, and data handling",
      "Stepping stone to Level 2 (GCSE equivalent)",
      "Externally assessed exam",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "GCSE equivalent?", answer: "Below GCSE grade 4." },
      { question: "Recognised by employers?", answer: "Yes." },
      { question: "Progression?", answer: "Level 2 Functional Skills Mathematics." },
    ],
    careerRoles: [
      { title: "Administrative Assistant", salary: "£18,000 - £22,000" },
      { title: "Retail Assistant", salary: "£17,000 - £20,000" },
      { title: "Customer Service Adviser", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£19,000+",
    studyHours: 55,
    duration: "4-8 weeks",
    assessmentType: "Externally set and marked examination",
    entryRequirements: "No formal entry requirements. Aged 16+. Entry Level qualification may provide useful foundation.",
    progressionOptions: ["Level 2 Functional Skills in Mathematics (GCSE equivalent)"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 1",
      assessmentDetails: "Externally set and marked examination (on-screen or paper-based). Pass/Fail grading.",
      qualificationDetails: "NCFE Level 1 Functional Skills Qualification in Mathematics (RQF). Below GCSE grade 4.",
      careerDescription: "Supports employment across all sectors. Meets prerequisites for further education. Progression to Level 2 Functional Skills Mathematics.",
      moduleDetails: [
      {
        name: "Representing",
        description: "",
        learningOutcomes: [
          "Understand practical problems in familiar and unfamiliar contexts",
          "Identify and obtain necessary information to tackle problems",
          "Select mathematics to find solutions",
        ],
      },
      {
        name: "Analysing",
        description: "",
        learningOutcomes: [
          "Use appropriate mathematics to find solutions",
          "Use appropriate checking procedures at each stage",
        ],
      },
      {
        name: "Interpreting",
        description: "",
        learningOutcomes: [
          "Interpret and communicate solutions to practical problems",
          "Draw conclusions and make recommendations",
          "Whole numbers and number operations (addition, subtraction, multiplication, division)",
          "Fractions, decimals and percentages – understand, compare, calculate",
          "Ratio and proportion – understand and use simple ratios",
          "Measures – length, weight, capacity, time, temperature",
          "Shape and space – basic 2D and 3D shapes, perimeter, area",
          "Data handling – collect, organise and interpret data using tables, charts, diagrams, averages",
        ],
      },
    ],
  },
  "functional-maths-level-2": {
    id: "functional-maths-level-2",
    title: "Level 2 Functional Skills Qualification in Mathematics",
    category: "Functional Skills",
    price: 250,
    oldPrice: 250,
    tutorPrice: 0,
    oneOffDiscount: 50,
    monthlyPrice: 16.67,
    oldMonthlyPrice: 0,
    students: 2500,
    badge: "MATHS",
    badgeColor: "#3182CE",
    image: "/images/courses/functional-skills/functional-maths-level-2.webp",
    overview:
      "Equivalent to a GCSE Grade 4 (C). Provides skills needed for further education and employment.",
    curriculum: [
      "Data Handling and Statistics",
      "Fractions, Decimals and Percentages",
      "Formulae and Equations",
      "Geometry and Measure",
    ],
    description:
      "Assesses mathematical skills at a level equivalent to GCSE grade 4 (C). Widely accepted for employment, apprenticeships, and further education entry.",
    glancePoints: [
      "Equivalent to GCSE Grade 4 (C) in Mathematics",
      "Recognised by universities and employers nationwide",
      "Externally assessed exam (non-calculator + calculator)",
      "Required for many university courses and apprenticeships",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "GCSE equivalent?", answer: "Yes, grade 4 (C)." },
      { question: "University entry?", answer: "Meets requirements for many courses." },
      { question: "Calculator allowed?", answer: "Calculator and non-calculator sections." },
    ],
    careerRoles: [
      { title: "Apprentice (various sectors)", salary: "£18,000 - £25,000" },
      { title: "Trainee Nurse", salary: "£25,000 - £28,000" },
      { title: "Teaching Assistant", salary: "£18,000 - £24,000" },
    ],
    avgSalary: "£22,000+",
    studyHours: 55,
    duration: "4-8 weeks",
    assessmentType: "Externally set and marked examination (non-calculator + calculator sections)",
    entryRequirements: "No formal entry requirements. Level 1 Functional Skills or equivalent recommended. Aged 16+.",
    progressionOptions: ["University degree courses", "Apprenticeships requiring GCSE Maths equivalent", "Further professional qualifications"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 2",
      assessmentDetails: "Externally set and marked examination. Non-calculator and calculator sections. Pass/Fail grading.",
      qualificationDetails: "NCFE Level 2 Functional Skills Qualification in Mathematics (RQF). Equivalent to GCSE grade 4 (C).",
      careerDescription: "Required for many jobs and apprenticeships. Prerequisite for teaching, nursing, police. Supports career progression across all sectors.",
      moduleDetails: [
      {
        name: "Representing",
        description: "",
        learningOutcomes: [
          "Understand practical problems in a wide range of contexts",
          "Identify and obtain necessary information",
          "Select appropriate mathematics and methods",
        ],
      },
      {
        name: "Analysing",
        description: "",
        learningOutcomes: [
          "Apply mathematics to find solutions to complex problems",
          "Use checking procedures and evaluate methods",
        ],
      },
      {
        name: "Interpreting",
        description: "",
        learningOutcomes: [
          "Interpret and communicate solutions",
          "Draw conclusions, justify findings and make recommendations",
          "Number and the number system – integers, fractions, decimals, powers, roots",
          "Fractions, decimals, percentages and ratio – complex calculations, proportion, scaling",
          "Measures, shape and space – perimeter, area, volume of complex shapes, scale drawings, units of measurement, time calculations",
          "Handling data and probability – mean, median, mode, range, probability, interpret charts, scatter graphs, two-way tables, grouped frequency tables",
        ],
      },
    ],
  },
  "functional-english-level-1": {
    id: "functional-english-level-1",
    title: "Level 1 Functional Skills Qualification in English",
    category: "Functional Skills",
    price: 200,
    oldPrice: 200,
    tutorPrice: 0,
    oneOffDiscount: 50,
    monthlyPrice: 12.50,
    oldMonthlyPrice: 0,
    students: 1800,
    badge: "ENGLISH",
    badgeColor: "#DD6B20",
    image: "/images/courses/functional-skills/functional-english-level-1.webp",
    overview:
      "Improve your reading, writing, and communication skills. Gives you the confidence to apply English skills in work and everyday life.",
    curriculum: ["Reading", "Writing", "Speaking, Listening and Communicating"],
    description:
      "Assesses ability to read, write, and communicate effectively in practical contexts. Develops essential English skills for the workplace and everyday life.",
    glancePoints: [
      "NCFE-accredited Functional Skills qualification",
      "Covers reading, writing, and spoken communication",
      "Stepping stone to Level 2 (GCSE equivalent)",
      "Externally assessed exam",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "GCSE equivalent?", answer: "Below GCSE grade 4." },
      { question: "Components?", answer: "Reading, Writing, and Speaking/Listening." },
      { question: "Progression?", answer: "Level 2 Functional Skills English." },
    ],
    careerRoles: [
      { title: "Administrative Assistant", salary: "£18,000 - £22,000" },
      { title: "Retail Assistant", salary: "£17,000 - £20,000" },
      { title: "Care Worker", salary: "£19,000 - £23,000" },
    ],
    avgSalary: "£19,000+",
    studyHours: 55,
    duration: "4-8 weeks",
    assessmentType: "Externally set and marked examination + internal speaking assessment",
    entryRequirements: "No formal entry requirements. Aged 16+. Entry Level qualification may provide useful foundation.",
    progressionOptions: ["Level 2 Functional Skills in English (GCSE equivalent)"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 1",
      assessmentDetails: "Reading and Writing: externally set and marked. Speaking, Listening and Communicating: internally assessed. Pass/Fail grading.",
      qualificationDetails: "NCFE Level 1 Functional Skills Qualification in English (RQF).",
      careerDescription: "Supports employment across sectors. Meets further education prerequisites. Progression to Level 2 Functional Skills English.",
      moduleDetails: [
      {
        name: "Speaking, Listening and Communicating (internally assessed)",
        description: "",
        learningOutcomes: [
          "Take part in formal and informal discussions and exchanges",
          "Make relevant contributions, respond appropriately to others",
          "Present information clearly and adapt language for audience and purpose",
        ],
      },
      {
        name: "Reading (externally assessed)",
        description: "",
        learningOutcomes: [
          "Read and understand a range of texts of varying complexity",
          "Identify the purpose and main ideas of texts",
          "Use strategies to find and obtain information",
          "Compare information from different sources",
        ],
      },
      {
        name: "Writing (externally assessed)",
        description: "",
        learningOutcomes: [
          "Write clearly and coherently for different purposes and audiences",
          "Organise writing logically with appropriate structure",
          "Use correct spelling, punctuation and grammar",
          "Present information in appropriate formats (letters, emails, reports, articles)",
        ],
      },
    ],
  },
  "functional-english-level-2": {
    id: "functional-english-level-2",
    title: "Level 2 Functional Skills Qualification in English",
    category: "Functional Skills",
    price: 250,
    oldPrice: 250,
    tutorPrice: 0,
    oneOffDiscount: 50,
    monthlyPrice: 16.67,
    oldMonthlyPrice: 0,
    students: 2100,
    badge: "ENGLISH",
    badgeColor: "#DD6B20",
    image: "/images/courses/functional-skills/functional-english-level-2.webp",
    overview:
      "Equivalent to a GCSE Grade 4 (C). Demonstrates the ability to read, write, speak, listen, and communicate in English.",
    curriculum: [
      "Reading for Information",
      "Writing for Different Purposes",
      "Speaking, Listening and Communicating",
    ],
    description:
      "Assesses English skills at GCSE grade 4 (C) equivalent. Widely accepted for employment, apprenticeships, teacher training, and further education entry.",
    glancePoints: [
      "Equivalent to GCSE Grade 4 (C) in English",
      "Recognised by universities and employers nationwide",
      "Covers reading, writing, and spoken communication",
      "Required for nursing, teaching, and many other career paths",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "GCSE equivalent?", answer: "Yes, grade 4 (C)." },
      { question: "For teacher training?", answer: "Yes, meets the English requirement." },
      { question: "Resits?", answer: "Yes, available." },
    ],
    careerRoles: [
      { title: "Apprentice (various sectors)", salary: "£18,000 - £25,000" },
      { title: "Trainee Nurse", salary: "£25,000 - £28,000" },
      { title: "Teaching Assistant", salary: "£18,000 - £24,000" },
    ],
    avgSalary: "£22,000+",
    studyHours: 55,
    duration: "4-8 weeks",
    assessmentType: "Externally set and marked examination + internal speaking assessment",
    entryRequirements: "No formal entry requirements. Level 1 Functional Skills or equivalent recommended. Aged 16+.",
    progressionOptions: ["University degree courses", "Apprenticeships requiring GCSE English equivalent", "Further professional qualifications"],
    awardingBody: "NCFE",
    qualificationLevel: "Level 2",
      assessmentDetails: "Reading and Writing: externally set and marked. Speaking, Listening and Communicating: internally assessed. Pass/Fail.",
      qualificationDetails: "NCFE Level 2 Functional Skills Qualification in English (RQF). Equivalent to GCSE grade 4 (C).",
      careerDescription: "Required for many employment opportunities. Prerequisite for teaching, nursing, policing. Supports career progression.",
      moduleDetails: [
      {
        name: "Speaking, Listening and Communicating (internally assessed)",
        description: "",
        learningOutcomes: [
          "Make detailed presentations adapted for audience and purpose",
          "Participate in discussions, making relevant and constructive contributions",
          "Listen and respond appropriately, ask questions for clarification",
        ],
      },
      {
        name: "Reading (externally assessed)",
        description: "",
        learningOutcomes: [
          "Read and understand a range of complex texts",
          "Compare information, ideas and opinions from different sources",
          "Identify implicit meaning, bias and points of view",
          "Analyse texts critically and evaluate effectiveness",
        ],
      },
      {
        name: "Writing (externally assessed)",
        description: "",
        learningOutcomes: [
          "Write complex texts for a wide range of purposes and audiences",
          "Organise writing effectively with logical structure and coherent paragraphs",
          "Use a range of sentence structures for clarity and effect",
          "Apply correct spelling, punctuation and grammar consistently",
          "Use format and style appropriate to purpose (formal letters, reports, articles, reviews)",
        ],
      },
    ],
  },

  // --- SECURITY & STEWARDING ---
  "first-aid-level-3": {
    id: "first-aid-level-3",
    title: "Level 3 Award in Emergency First Aid at Work (RQF)",
    category: "Security & Stewarding",
    price: 120,
    oldPrice: 180,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 0,
    oldMonthlyPrice: 0,
    students: 3000,
    badge: "SAFETY",
    badgeColor: "#E53E3E",
    image: "/images/courses/security/first-aid-level-3.webp",
    overview:
      "A one-day course covering the essentials of emergency first aid in the workplace. Meets HSE requirements for low-risk workplaces.",
    curriculum: [
      "Roles and responsibilities of a first aider",
      "Assessing an incident",
      "Managing an unresponsive casualty",
      "Wounds and bleeding",
    ],
    description:
      "Provides skills for emergency first aid in the workplace. Meets Health and Safety (First-Aid) Regulations 1981 requirements for appointed emergency first aiders.",
    glancePoints: [
      "HSE-compliant first aid qualification",
      "One-day classroom course — valid for 3 years",
      "Classroom-based with practical assessment",
      "In-person attendance required — hands-on training with experienced tutors",
      "Nationally recognised by employers",
    ],
    faqs: [
      { question: "How long valid?", answer: "3 years, then renewal." },
      { question: "Legal requirement?", answer: "Employers must provide adequate first aid." },
      { question: "Course length?", answer: "One day (6-7 hours)." },
      { question: "In person?", answer: "Yes, practical assessment required." },
    ],
    careerRoles: [
      { title: "First Aider (Workplace)", salary: "£20,000 - £30,000" },
      { title: "Health and Safety Officer", salary: "£25,000 - £35,000" },
      { title: "Event Steward", salary: "£18,000 - £22,000" },
    ],
    avgSalary: "£24,000+",
    studyHours: 7,
    duration: "1 day",
    assessmentType: "Practical assessment and written assessment",
    awardingBody: "Highfield",
    qualificationLevel: "Level 3",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 14+ (16 for workplace compliance). Suitable for anyone in the workplace.",
      assessmentDetails: "Practical assessment and written/oral knowledge assessment. One-day course (6-7 hours). Assessed by qualified trainer.",
      qualificationDetails: "Highfield Level 3 Award in Emergency First Aid at Work (RQF). HSE compliant. Valid for 3 years.",
      careerDescription: "Emergency First Aider in any workplace. Meets employer legal requirements. Applicable to all industries.",
      moduleDetails: [
      {
        name: "Emergency First Aid at Work",
        description: "Covers all practical and theoretical knowledge needed to provide emergency first aid in the workplace. Meets HSE requirements.",
        learningOutcomes: [
          "The role and responsibilities of an emergency first aider",
          "Assessing an incident – scene safety, primary survey, calling emergency services",
          "Managing an unresponsive casualty who is breathing – recovery position",
          "Managing an unresponsive casualty who is not breathing – CPR (cardiopulmonary resuscitation)",
          "Recognising and assisting a casualty who is choking – back blows and abdominal thrusts",
          "Managing a casualty with external bleeding – direct pressure, dressings, tourniquets",
          "Managing a casualty who is in shock – recognition and treatment",
          "Managing minor injuries – cuts, grazes, burns, scalds, bumps and bruises",
        ],
      },
    ],
  },
  "door-supervisor-level-2": {
    id: "door-supervisor-level-2",
    title:
      "Level 2 Award for Door Supervisors in the Private Security Industry",
    category: "Security & Stewarding",
    price: 220,
    oldPrice: 350,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 22,
    oldMonthlyPrice: 0,
    students: 2100,
    badge: "LICENSE",
    badgeColor: "#2A4365",
    image: "/images/courses/security/door-supervisor-level-2.webp",
    overview:
      "The standard qualification required to apply for an SIA Door Supervisor license. Covers legal aspects, physical intervention, and conflict management.",
    curriculum: [
      "Working in the Private Security Industry",
      "Working as a Door Supervisor",
      "Conflict Management",
      "Physical Intervention Skills",
    ],
    description:
      "For individuals wishing to work as door supervisors in private security. Meets SIA (Security Industry Authority) requirements for obtaining a Door Supervisor licence.",
    glancePoints: [
      "Required for SIA Door Supervisor licence application",
      "38 guided learning hours across 4 mandatory units",
      "Covers conflict management and physical intervention",
      "In-person attendance required — hands-on training with experienced tutors",
      "Classroom-based with practical assessment",
    ],
    faqs: [
      { question: "Course length?", answer: "4-6 days." },
      { question: "SIA licence?", answer: "This enables you to apply for one." },
      { question: "Licence validity?", answer: "3 years." },
      { question: "Renewal?", answer: "Every 3 years with updated training." },
    ],
    careerRoles: [
      { title: "Door Supervisor", salary: "£22,000 - £30,000" },
      { title: "Head Door Supervisor", salary: "£25,000 - £35,000" },
      { title: "Close Protection Officer", salary: "£30,000 - £50,000" },
    ],
    avgSalary: "£26,000+",
    studyHours: 38,
    duration: "4-6 days",
    assessmentType: "Written exam and practical assessment",
    entryRequirements: "Aged 18+. Must hold valid first aid qualification. Must pass SIA identity and criminal record check. Good English required.",
    awardingBody: "Highfield",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      assessmentDetails: "Written multiple-choice exams plus practical assessments for physical intervention and conflict management. Must pass all components.",
      qualificationDetails: "Highfield Level 2 Award for Door Supervisors in the Private Security Industry (RQF). Meets SIA licensing requirements.",
      careerDescription: "Door Supervisor, Nightclub/Bar Security, Event Security, Retail Security. Progression to Close Protection or Security Management.",
      moduleDetails: [
      {
        name: "Working in the Private Security Industry",
        description: "Understanding the private security industry, legislation, SIA licensing, roles and responsibilities, communication skills.",
        learningOutcomes: [
        ],
      },
      {
        name: "Working as a Door Supervisor",
        description: "Core door supervisor duties including access control, search procedures, arrest procedures, drug awareness, and emergency procedures.",
        learningOutcomes: [
        ],
      },
      {
        name: "Conflict Management for Door Supervisors",
        description: "Understanding and managing conflict situations through communication, de-escalation and dynamic risk assessment.",
        learningOutcomes: [
        ],
      },
      {
        name: "Physical Intervention Skills for Door Supervisors",
        description: "Practical skills for managing aggressive and violent behaviour using approved physical intervention techniques.",
        learningOutcomes: [
        ],
      },
    ],
  },
  "spectator-safety-level-2": {
    id: "spectator-safety-level-2",
    title: "Level 2 Certificate in Spectator Safety (RQF)",
    category: "Security & Stewarding",
    price: 195,
    oldPrice: 295,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 19,
    oldMonthlyPrice: 0,
    students: 1500,
    badge: "STEWARDING",
    badgeColor: "#2A4365",
    image: "/images/courses/security/spectator-safety-level-2.webp",
    overview:
      "Required for working as a steward at sports grounds and events. Covers crowd control, health and safety, and dealing with emergencies.",
    curriculum: [
      "Prepare for spectator events",
      "Control the entry, exit and movement of people",
      "Monitor spectators",
      "Deal with crowd problems",
    ],
    description:
      "For those working or seeking to work as stewards at sporting events, concerts, and public gatherings. Provides knowledge and skills for spectator safety at live events.",
    glancePoints: [
      "Required qualification for event and sports ground stewards",
      "Meets Green Guide safety requirements",
      "Covers crowd management and emergency procedures",
      "In-person attendance required — hands-on training with experienced tutors",
      "Classroom-based with practical scenarios",
    ],
    faqs: [
      { question: "How long?", answer: "Several weeks." },
      { question: "Required for stewarding?", answer: "Often required by employers/venues." },
      { question: "Progression?", answer: "Level 4 Diploma in Spectator Safety Management." },
    ],
    careerRoles: [
      { title: "Event Steward", salary: "£18,000 - £23,000" },
      { title: "Stadium Steward", salary: "£19,000 - £24,000" },
      { title: "Senior Steward", salary: "£22,000 - £28,000" },
    ],
    avgSalary: "£22,000+",
    studyHours: 35,
    duration: "3-5 days",
    assessmentType: "Written assessment and practical observation",
    awardingBody: "Highfield",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 16+. Relevant to those in or seeking event stewarding roles.",
      assessmentDetails: "Internally assessed: practical observation, written assignments, portfolio. Assessed in real or simulated event environments.",
      qualificationDetails: "Highfield Level 2 Certificate in Spectator Safety (RQF). Meets NVQ requirements for stewarding.",
      careerDescription: "Event Steward, Safety Steward, Concert Steward, Festival Safety Staff. Progression to Level 4 Diploma in Spectator Safety Management.",
      moduleDetails: [
      {
        name: "Preparing for Spectator Events",
        description: "Understanding your venue, pre-event checks, briefing procedures, equipment checks",
        learningOutcomes: [
        ],
      },
      {
        name: "Monitoring Spectators and Dealing with Crowd Problems",
        description: "Crowd monitoring, recognising signs of distress, crowd dynamics, preventing overcrowding",
        learningOutcomes: [
        ],
      },
      {
        name: "Responding to Incidents at Spectator Events",
        description: "Emergency procedures, evacuation, first aid awareness, working with emergency services",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Stewarding at Spectator Events",
        description: "Role and responsibilities of stewards, legal framework, duty of care, event regulations",
        learningOutcomes: [
        ],
      },
      {
        name: "Customer Service for Spectator Safety",
        description: "Welcoming spectators, providing information, assisting people with additional needs, handling complaints",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication in Spectator Safety",
        description: "Using radios, reporting procedures, chain of command, log-keeping",
        learningOutcomes: [
        ],
      },
    ],
  },
  "spectator-safety-level-4": {
    id: "spectator-safety-level-4",
    title: "Level 4 Diploma in Spectator Safety Management (RQF)",
    category: "Security & Stewarding",
    price: 650,
    oldPrice: 895,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 65,
    oldMonthlyPrice: 0,
    students: 60,
    badge: "MANAGEMENT",
    badgeColor: "#2A4365",
    image: "/images/courses/security/spectator-safety-level-4.webp",
    overview:
      "A qualification for Safety Officers and Senior Stewards. Focuses on planning and management of spectator safety at events.",
    curriculum: [
      "Plan for the safety of people at a spectator event",
      "Manage the safety of people at a spectator event",
      "Develop and manage stewarding resources",
      "Manage info for decision making",
    ],
    description:
      "Advanced qualification for management and supervisory roles in spectator safety. Covers strategic and operational management of safety at events and venues.",
    glancePoints: [
      "Management-level spectator safety qualification",
      "For Safety Officers and Senior Stewards",
      "Classroom-based with hands-on training from experienced tutors",
      "In-person attendance required — portfolio-based assessment",
      "Meets requirements for senior safety roles at venues",
    ],
    faqs: [
      { question: "How long?", answer: "12-18 months." },
      { question: "Experience needed?", answer: "Yes, in spectator safety." },
      { question: "Required?", answer: "Increasingly expected for senior safety roles." },
    ],
    careerRoles: [
      { title: "Safety Officer", salary: "£28,000 - £40,000" },
      { title: "Spectator Safety Manager", salary: "£32,000 - £45,000" },
      { title: "Head of Security (Events)", salary: "£35,000 - £50,000" },
    ],
    avgSalary: "£35,000+",
    studyHours: 200,
    duration: "6-12 months",
    assessmentType: "Portfolio of evidence",
    entryRequirements: "Experience in spectator safety or event management recommended. Level 2/3 qualification beneficial. For supervisory/management roles.",
    awardingBody: "Highfield",
    qualificationLevel: "Level 4",
    isEnquiryOnly: true,
      assessmentDetails: "Internally assessed: portfolio, written assignments, case studies, practical demonstrations. Externally quality assured.",
      qualificationDetails: "Level 4 Diploma in Spectator Safety Management (RQF).",
      careerDescription: "Safety Officer, Head Steward, Event Safety Manager, Venue Safety Manager, Ground Safety Officer. Progression to higher management.",
      moduleDetails: [
      {
        name: "Managing Spectator Safety at Events and Venues",
        description: "Strategic safety planning, crowd management principles, capacity management",
        learningOutcomes: [
        ],
      },
      {
        name: "Risk Assessment and Management for Events",
        description: "Conducting risk assessments, implementing control measures, dynamic risk assessment",
        learningOutcomes: [
        ],
      },
      {
        name: "Emergency Planning and Response",
        description: "Developing emergency plans, evacuation procedures, business continuity, major incident management",
        learningOutcomes: [
        ],
      },
      {
        name: "Managing Safety Teams",
        description: "Recruitment, training, deployment and management of safety personnel",
        learningOutcomes: [
        ],
      },
      {
        name: "Legal and Regulatory Compliance",
        description: "Health and Safety at Work Act, Safety of Sports Grounds Act, event licensing, local authority regulations",
        learningOutcomes: [
        ],
      },
      {
        name: "Stakeholder Communication and Management",
        description: "Working with police, fire service, local authorities, promoters and organisers",
        learningOutcomes: [
        ],
      },
      {
        name: "Continuous Improvement in Spectator Safety",
        description: "Debriefing, lessons learned, implementing improvements, benchmarking",
        learningOutcomes: [
        ],
      },
      {
        name: "Managing Crowd Dynamics",
        description: "Understanding crowd behaviour, modelling, monitoring technology",
        learningOutcomes: [
        ],
      },
    ],
  },
  "event-security-level-2": {
    id: "event-security-level-2",
    title: "Level 2 Certificate in Event Security Operations (RQF)",
    category: "Security & Stewarding",
    price: 220,
    oldPrice: 350,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 22,
    oldMonthlyPrice: 0,
    students: 500,
    badge: "SECURITY",
    badgeColor: "#2A4365",
    image: "/images/courses/security/event-security-level-2.webp",
    overview:
      "Specific training for security operatives working at events and festivals. Covers searching, patrolling, and controlling entry/exit.",
    curriculum: [
      "Event Security Guidelines",
      "Crowd Management",
      "Patrolling and Searching",
      "Customer Service in Security",
    ],
    description:
      "Provides knowledge and skills for event security operations including stewarding duties, security procedures, and managing incidents at events and venues.",
    glancePoints: [
      "Specialist qualification for event security operatives",
      "Covers crowd management, searching, and patrolling",
      "Relevant to festivals, concerts, and corporate events",
      "In-person attendance required — hands-on training with experienced tutors",
      "Classroom-based with practical assessment",
    ],
    faqs: [
      { question: "How long?", answer: "Several weeks." },
      { question: "SIA licence needed?", answer: "Depends on role; recommended alongside Door Supervisor qualification for SIA-regulated roles." },
    ],
    careerRoles: [
      { title: "Event Security Operative", salary: "£20,000 - £28,000" },
      { title: "Festival Security Officer", salary: "£22,000 - £30,000" },
      { title: "Security Supervisor (Events)", salary: "£25,000 - £35,000" },
    ],
    avgSalary: "£25,000+",
    studyHours: 35,
    duration: "3-5 days",
    assessmentType: "Written exam and practical assessment",
    awardingBody: "Highfield",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Aged 18+. For those in or seeking event security roles.",
      assessmentDetails: "Internally assessed: practical observation, written assignments, portfolio. May include simulated scenarios.",
      qualificationDetails: "Highfield Level 2 Certificate in Event Security Operations (RQF).",
      careerDescription: "Event Security Officer, Security Steward, Venue Security Staff. Progression to supervisory security qualifications.",
      moduleDetails: [
      {
        name: "Event Security Operations Principles",
        description: "Understanding security roles, responsibilities and legal powers at events",
        learningOutcomes: [
        ],
      },
      {
        name: "Crowd Monitoring and Control",
        description: "Monitor crowd movement, identify potential issues, implement control measures",
        learningOutcomes: [
        ],
      },
      {
        name: "Incident Management at Events",
        description: "Respond to security incidents, emergency procedures, evidence preservation",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication in Event Security",
        description: "Radio procedures, reporting, briefing and debriefing, chain of command",
        learningOutcomes: [
        ],
      },
      {
        name: "Working in an Event Security Team",
        description: "Team roles, coordination, briefing procedures, handovers",
        learningOutcomes: [
        ],
      },
      {
        name: "Search Procedures at Events",
        description: "Bag searches, personal searches, searching venues and areas",
        learningOutcomes: [
        ],
      },
      {
        name: "Health and Safety at Events",
        description: "Risk awareness, personal safety, environmental awareness, welfare facilities",
        learningOutcomes: [
        ],
      },
      {
        name: "Customer Care in Event Security",
        description: "Balancing security with customer experience, dealing with vulnerable people",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- BUSINESS & MANAGEMENT ---
  "team-leading-cert": {
    id: "team-leading-cert",
    title: "Certificate in Team Leading Principles (RQF)",
    category: "Business & Management",
    price: 295,
    oldPrice: 450,
    tutorPrice: 0,
    oneOffDiscount: 0,
    monthlyPrice: 29,
    oldMonthlyPrice: 0,
    students: 560,
    badge: "LEADERSHIP",
    badgeColor: "#D69E2E",
    image: "/images/courses/business/team-leading-cert.webp",
    overview:
      "Ideal for new or aspiring team leaders. Develops the skills needed to lead a team effectively, including communication and coaching.",
    curriculum: [
      "Principles of Team Leading",
      "Understanding Business",
      "Communication in the Workplace",
      "Coaching and Mentoring",
    ],
    description:
      "Develops understanding and skills in team leading principles including communication, motivation, problem solving, and managing team performance.",
    glancePoints: [
      "NCFE-accredited team leadership qualification",
      "Covers leadership, communication, and coaching skills",
      "Ideal for new and aspiring team leaders",
      "Recognised across all industries and sectors",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Several weeks to months." },
      { question: "Need to be in a team leader role?", answer: "Not essential but beneficial." },
      { question: "Progression?", answer: "Level 3 management qualifications." },
    ],
    careerRoles: [
      { title: "Team Leader", salary: "£22,000 - £30,000" },
      { title: "Shift Supervisor", salary: "£22,000 - £28,000" },
      { title: "First Line Manager", salary: "£25,000 - £32,000" },
    ],
    avgSalary: "£26,000+",
    studyHours: 120,
    duration: "6-10 weeks",
    assessmentType: "Portfolio of evidence assessed internally",
    awardingBody: "Highfield",
    qualificationLevel: "Level 2",
    isEnquiryOnly: true,
      entryRequirements: "No formal entry requirements. Suitable for those in or aspiring to team leading roles.",
      assessmentDetails: "Internally assessed through assignments, case studies, and portfolio of evidence. Externally quality assured.",
      qualificationDetails: "Highfield Level 2 Certificate in Team Leading Principles (RQF).",
      careerDescription: "Team Leader, Supervisor, Shift Manager, Line Manager. Progression to Level 3 management qualifications.",
      moduleDetails: [
      {
        name: "Understanding the Principles of Team Leading",
        description: "Roles and responsibilities of a team leader, leadership vs management, leadership styles",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Business",
        description: "Organisational structures, aims and objectives, how teams contribute to business success",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding How to Communicate Work-Related Information",
        description: "Methods of communication, barriers, active listening, giving instructions clearly",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding How to Motivate Team Members",
        description: "Motivation theories, recognising individual needs, creating a positive work environment",
        learningOutcomes: [
        ],
      },
      {
        name: "Problem Solving and Decision Making",
        description: "Identifying problems, generating solutions, making decisions, evaluating outcomes",
        learningOutcomes: [
        ],
      },
      {
        name: "Planning and Allocating Work",
        description: "Setting SMART objectives, delegating tasks, monitoring progress, prioritising workload",
        learningOutcomes: [
        ],
      },
      {
        name: "Managing Conflict within a Team",
        description: "Causes of conflict, approaches to resolution, mediation, building team cohesion",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Performance Management",
        description: "Setting targets, giving feedback, conducting appraisals, identifying development needs",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- HEALTH & SOCIAL CARE (NEW) ---
  "ncfe-level-3-residential-childcare": {
    id: "ncfe-level-3-residential-childcare",
    title: "Level 3 Diploma in Residential Childcare",
    category: "Health & Social Care",
    price: 1600,
    oldPrice: 1600,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 129.17,
    oldMonthlyPrice: 0,
    students: 180,
    badge: "CHILDCARE",
    badgeColor: "#38B2AC",
    image: "/images/courses/health-social/ncfe-level-3-residential-childcare.png",
    overview:
      "Gain the skills and knowledge required to work in residential childcare settings. This qualification covers the care, well-being, and development of children and young people in residential environments.",
    curriculum: [
      "Understanding residential childcare",
      "Supporting positive outcomes for children and young people",
      "Safeguarding and child protection",
      "Health, well-being, and development of children",
      "Working with families and carers",
    ],
    description:
      "Required qualification for working in children's homes under the Children's Homes (England) Regulations 2015. Develops knowledge and skills for residential childcare including child development, safeguarding, wellbeing, relationships, and positive outcomes.",
    glancePoints: [
      "Ofsted-recognised qualification for residential childcare workers",
      "Covers safeguarding, child development, and family engagement",
      "100% online with dedicated tutor support",
      "Study around your existing work commitments",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 12 months." },
      { question: "Legal requirement?", answer: "Yes, under Children's Homes Regulations 2015." },
      { question: "Placement needed?", answer: "Yes, 400 hours in residential childcare." },
    ],
    careerRoles: [
      { title: "Residential Childcare Worker", salary: "£22,000 - £28,000" },
      { title: "Senior Support Worker", salary: "£25,000 - £32,000" },
      { title: "Children's Home Support Worker", salary: "£23,000 - £30,000" },
    ],
    avgSalary: "£26,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Aged 18+. Must be working, volunteering or on placement in residential childcare. 400 hours practice required.",
      assessmentDetails: "Internally assessed: coursework, portfolio, practical demonstration, direct observation, witness evidence. 61 credits required (53 mandatory, 8+ optional). Externally quality assured.",
      qualificationDetails: "NCFE CACHE Level 3 Diploma for Residential Childcare (England) (RQF). Qualification Number: 601/4852/4. Required under Children's Homes Regulations 2015.",
      careerDescription: "Residential Childcare Worker, Senior Care Worker, Support Worker. Progression to Level 5 Diploma in Leadership and Management for Residential Childcare.",
      moduleDetails: [
      {
        name: "Understand the Development of Children and Young People in Residential Childcare (F/506/7653)",
        description: "Expected patterns of development from birth to 19 years, impact of trauma, loss and separation, importance of attachment and resilience",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Safeguard and Protect Children and Young People in Residential Childcare (T/506/8363)",
        description: "Safeguarding legislation, policies, procedures, recognising signs of abuse",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Support Children and Young People Who Have Experienced Harm or Abuse (A/506/8364)",
        description: "Effects of abuse on development and behaviour, therapeutic approaches",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote Effective Communication and Information Handling in Residential Childcare Settings (A/506/8526)",
        description: "Communication methods, information management, confidentiality",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Risk Management in Residential Childcare (J/506/7587)",
        description: "Health and safety requirements, support children to manage risk, respond to accidents and emergencies",
        learningOutcomes: [
        ],
      },
      {
        name: "Assessment and Planning with Children and Young People in Residential Childcare (A/506/7828)",
        description: "Purpose and principles of assessment and planning, place children at centre, implement and review plans",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Group Living in Residential Childcare (L/506/7588)",
        description: "Theories of group living, daily routines, creating a positive living environment",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Support Positive Outcomes for Children and Young People in Residential Childcare (A/506/7618)",
        description: "Promote positive outcomes, rights of children, advocacy",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Attachment and Positive Relationships for Children and Young People in Residential Childcare (M/506/7616)",
        description: "Attachment theory, building trust, maintaining relationships",
        learningOutcomes: [
        ],
      },
      {
        name: "Support the Well-Being and Resilience of Children and Young People in Residential Childcare (T/506/7617)",
        description: "Emotional well-being, building resilience, managing transitions",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Children and Young People in Residential Childcare to Achieve Their Learning Potential (L/506/7798)",
        description: "Supporting education, liaising with schools, promoting learning",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Children and Young People in Residential Childcare to Manage Their Health (D/506/7594)",
        description: "Physical and mental health, healthy lifestyles, accessing health services",
        learningOutcomes: [
        ],
      },
      {
        name: "Support the Development of Socially Aware Behaviour with Children and Young People in Residential Childcare (Y/506/8193)",
        description: "Social skills, appropriate behaviour, community engagement",
        learningOutcomes: [
        ],
      },
      {
        name: "Engage in Professional Development in Residential Childcare Settings (F/506/7782)",
        description: "CPD, reflective practice, supervision",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote the Health and Safety of Children and Young People in Residential Childcare (J/506/7814)",
        description: "Fire safety, food safety, infection control, first aid awareness",
        learningOutcomes: [
        ],
      },
      {
        name: "Participate in Teams to Benefit Children and Young People in Residential Childcare (F/506/7605)",
        description: "Team working, roles, responsibilities, multi-agency working",
        learningOutcomes: [
          "Understand Residential Childcare for Children with Complex Disabilities",
          "Support Children and Young People Regarding Sexual Exploitation",
          "Work with Families of Children and Young People in Residential Childcare",
          "Understand How to Address the Needs of Young People who are in the Youth Justice System",
        ],
      },
    ],
  },
  "ncfe-level-3-children-young-people": {
    id: "ncfe-level-3-children-young-people",
    title: "Level 3 Diploma in Children and Young People",
    category: "Health & Social Care",
    price: 1700,
    oldPrice: 1700,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 137.5,
    oldMonthlyPrice: 0,
    students: 150,
    badge: "CHILDREN",
    badgeColor: "#38B2AC",
    image: "/images/courses/health-social/ncfe-level-3-children-young-people.png",
    overview:
      "A comprehensive qualification for those working with children and young people across a range of settings including schools, nurseries, and youth services.",
    curriculum: [
      "Child and young person development",
      "Communication and professional relationships",
      "Safeguarding the welfare of children and young people",
      "Supporting children and young people's health and safety",
      "Promoting equality, diversity and inclusion",
    ],
    description:
      "Develops knowledge and skills for working with children and young people. Covers core competencies including child development, safeguarding, communication, and partnership working.",
    glancePoints: [
      "Nationally recognised Level 3 qualification",
      "Covers children from birth to 19 years",
      "Includes safeguarding and child development modules",
      "Flexible online learning with 1-to-1 tutor support",
      "0% interest payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Usually 1 year." },
      { question: "Need to be working?", answer: "Yes." },
      { question: "Pathways?", answer: "Social Care, Early Years, Learning Development." },
    ],
    careerRoles: [
      { title: "Nursery Practitioner", salary: "£20,000 - £25,000" },
      { title: "Teaching Assistant", salary: "£18,000 - £24,000" },
      { title: "Youth Support Worker", salary: "£22,000 - £28,000" },
    ],
    avgSalary: "£24,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Must be working, volunteering or on placement. Need to demonstrate competence in knowledge and skills.",
      assessmentDetails: "Internally assessed: observation, portfolio, written assignments. Externally quality assured. Usually completed in 1 year.",
      qualificationDetails: "NCFE CACHE Level 3 Diploma for the Children and Young People's Workforce (England) (RQF).",
      careerDescription: "Youth Worker, Family Support Worker, Social Work Assistant, Children's Home Worker, Play Worker. Progression to Level 5 or Foundation Degree.",
      moduleDetails: [
      {
        name: "Promote Communication in Health, Social Care or Children's and Young People's Settings",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Engage in Personal Development in Health, Social Care or Children's and Young People's Settings",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote Good Practice in Handling Information in Health and Social Care Settings",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Principles for Implementing Duty of Care in Health, Social Care or Children's and Young People's Settings",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Assessment and Planning with Children and Young People",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand Child and Young Person Development",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Safeguard the Well-Being of Children and Young People",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Children and Young People's Health and Safety",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Develop Positive Relationships with Children, Young People and Others",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Work with Children and Young People in a Residential Care Setting",
        description: "",
        learningOutcomes: [
        ],
      },
    ],
  },
  "ncfe-level-5-hsc-cyp-leadership": {
    id: "ncfe-level-5-hsc-cyp-leadership",
    title: "Level 5 Diploma in Leadership for HSC & CYP Services",
    category: "Health & Social Care",
    price: 1800,
    oldPrice: 1800,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 145.83,
    oldMonthlyPrice: 0,
    students: 90,
    badge: "LEADERSHIP",
    badgeColor: "#805AD5",
    image: "/images/courses/health-social/ncfe-level-5-hsc-cyp-leadership.png",
    overview:
      "A senior management qualification for leaders in health and social care or children and young people's services. Covers strategic leadership, governance, and quality improvement.",
    curriculum: [
      "Leading and managing in health and social care or CYP settings",
      "Governance and regulatory processes",
      "Managing quality in care services",
      "Strategic planning and resource management",
      "Safeguarding and professional accountability",
    ],
    description:
      "Provides skills for managing practice and leading others in adult care or children's services. Has five pathways for adults and children/young people.",
    glancePoints: [
      "Meets CQC and Ofsted registered manager requirements",
      "Covers strategic leadership and governance",
      "Suitable for managers in adult care and children's services",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "18-24 months." },
      { question: "Pathways?", answer: "Adults' Management, Adults' Residential, Adults' Advanced Practice, CYP Management, CYP Residential." },
      { question: "Need to work?", answer: "Yes, in management role." },
    ],
    careerRoles: [
      { title: "Registered Manager", salary: "£32,000 - £45,000" },
      { title: "Deputy Manager", salary: "£28,000 - £36,000" },
      { title: "Service Manager", salary: "£35,000 - £50,000" },
    ],
    avgSalary: "£38,000+",
    duration: "18-24 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 5",
      entryRequirements: "Aged 19+. Recommended Level 3 in related area. Must be working as deputy/manager in appropriate setting.",
      assessmentDetails: "Internally assessed portfolio. Methods: observation, witness evidence, professional discussion, reflection, assignments, case studies. Externally quality assured.",
      qualificationDetails: "NCFE CACHE Level 5 Diploma in Leadership for Health and Social Care and Children and Young People's Services (England) (RQF). 90 credits.",
      careerDescription: "Registered Manager, Service Manager, Deputy Manager, Area Manager, Operations Manager. Progression to degree study.",
      moduleDetails: [
      {
        name: "Use and Develop Systems That Promote Communication",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Promote Professional Development",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Champion Equality, Diversity and Inclusion",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Develop Health and Safety and Risk Management Policies, Procedures and Practices",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Work in Partnership in Health and Social Care or Children and Young People's Settings",
        description: "",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand Safeguarding and Protection",
        description: "",
        learningOutcomes: [
          "Adults' Management Pathway – managing care services, resource management, quality assurance",
          "Adults' Residential Management Pathway – above plus assessment in group living settings",
          "Adults' Advanced Practice Pathway – advanced practice, research, leading change",
          "Children and Young People's Management Pathway – managing children's services, outcome-based practice",
          "Children and Young People's Residential Management Pathway – managing residential settings for children",
        ],
      },
    ],
  },

  // --- DIGITAL TECHNOLOGY ---
  "cyber-security-level-4": {
    id: "cyber-security-level-4",
    title: "Level 4 Diploma: Cyber Security Engineer",
    category: "Digital Technology",
    price: 1500,
    oldPrice: 1600,
    tutorPrice: 1600,
    oneOffDiscount: 200,
    monthlyPrice: 120.83,
    oldMonthlyPrice: 129.17,
    students: 75,
    badge: "CYBER",
    badgeColor: "#2A4365",
    image: "/images/courses/digital-technology/cyber-security-level-4.png",
    overview:
      "Develop the technical skills and knowledge required to work as a cyber security engineer. Covers network security, threat analysis, incident response, and security architecture.",
    curriculum: [
      "Fundamentals of Cyber Security",
      "Network Security and Architecture",
      "Threat Intelligence and Vulnerability Assessment",
      "Incident Response and Management",
      "Security Operations and Monitoring",
      "Governance, Risk and Compliance",
    ],
    description:
      "This qualification provides specialist knowledge and skills in cyber security engineering. It covers network security, threat analysis, risk management, and security technologies for those seeking careers in the cyber security sector.",
    glancePoints: [
      "Industry-recognised Level 4 qualification in cyber security",
      "Covers network security, threat analysis, and incident response",
      "100% online with dedicated tutor support",
      "Suitable for career changers and IT professionals",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 12-18 months." },
      { question: "Industry recognised?", answer: "Yes, Ofqual regulated." },
      { question: "Progression?", answer: "Specialist cyber security certifications or degree study." },
    ],
    careerRoles: [
      { title: "Cyber Security Analyst", salary: "£30,000 - £50,000" },
      { title: "SOC Analyst", salary: "£28,000 - £45,000" },
      { title: "IT Security Consultant", salary: "£35,000 - £60,000" },
    ],
    avgSalary: "£42,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 4",
      entryRequirements: "Recommended to have Level 3 qualifications or equivalent experience in IT. Good understanding of computing and networking fundamentals.",
      assessmentDetails: "Internally assessed through portfolio of evidence, practical demonstrations, assignments, and projects. Externally quality assured by NCFE.",
      qualificationDetails: "NCFE Level 4 Diploma in Cyber Security Engineer (RQF).",
      careerDescription: "Cyber Security Engineer, Security Analyst, Information Security Officer, Penetration Tester, Security Consultant. Progression to degree-level study or specialist certifications.",
      moduleDetails: [
      {
        name: "Fundamentals of Cyber Security",
        description: "Threat landscape, security principles (CIA triad), security models, risk management frameworks",
        learningOutcomes: [
        ],
      },
      {
        name: "Network Security",
        description: "Network architecture, firewalls, intrusion detection/prevention, VPNs, wireless security, network monitoring",
        learningOutcomes: [
        ],
      },
      {
        name: "Threat Intelligence and Vulnerability Assessment",
        description: "Threat analysis, vulnerability scanning, penetration testing concepts, risk assessment",
        learningOutcomes: [
        ],
      },
      {
        name: "Security Architecture and Design",
        description: "Secure system design, defence in depth, zero trust architecture, cloud security",
        learningOutcomes: [
        ],
      },
      {
        name: "Cryptography",
        description: "Encryption algorithms, public key infrastructure (PKI), digital signatures, hashing, secure communications",
        learningOutcomes: [
        ],
      },
      {
        name: "Incident Response and Management",
        description: "Incident detection, containment, eradication, recovery, forensic investigation, reporting",
        learningOutcomes: [
        ],
      },
      {
        name: "Security Operations",
        description: "Security Operations Centre (SOC), SIEM tools, log management, continuous monitoring",
        learningOutcomes: [
        ],
      },
      {
        name: "Ethical Hacking and Penetration Testing",
        description: "Methodologies, tools, reporting, remediation recommendations",
        learningOutcomes: [
        ],
      },
      {
        name: "Governance, Risk and Compliance",
        description: "Cyber security legislation (Computer Misuse Act, GDPR), industry standards (ISO 27001, NIST), compliance frameworks",
        learningOutcomes: [
        ],
      },
      {
        name: "Secure Software Development",
        description: "Secure coding principles, OWASP, application security testing",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- TEACHING QUALIFICATION ---
  "education-training-level-3": {
    id: "education-training-level-3",
    title: "Level 3 Award in Education and Training",
    category: "Teaching Qualification",
    price: 500,
    oldPrice: 500,
    tutorPrice: 0,
    oneOffDiscount: 50,
    monthlyPrice: 37.50,
    oldMonthlyPrice: 0,
    students: 820,
    badge: "TEACHING",
    badgeColor: "#D69E2E",
    image: "/images/courses/teaching/education-training-level-3.png",
    overview:
      "The essential introductory teaching qualification. Gain the skills to plan, deliver, and assess inclusive teaching sessions in the further education and skills sector.",
    curriculum: [
      "Understanding roles, responsibilities and relationships in education and training",
      "Planning inclusive teaching and learning",
      "Delivering education and training sessions",
      "Assessing learners in education and training",
    ],
    description:
      "Introductory teaching qualification. Depending on optional units chosen, learners undertake microteaching or teaching practice. Suitable for those not yet in a teaching role (microteaching option) or current practitioners.",
    glancePoints: [
      "Formerly known as PTLLS (Preparing to Teach in the Lifelong Learning Sector)",
      "Recognised entry-level teaching qualification",
      "Covers planning, delivery, and assessment of learning",
      "100% online with tutor support",
      "Flexible study around your schedule",
    ],
    faqs: [
      { question: "How long?", answer: "Typically weeks to months." },
      { question: "Need teaching experience?", answer: "Not if microteaching option taken." },
      { question: "Progression?", answer: "Level 4 Certificate or Level 5 Diploma in Education and Training." },
      { question: "Can I teach after this?", answer: "It's introductory; Level 5 is the full teaching qualification." },
    ],
    careerRoles: [
      { title: "FE Tutor", salary: "£24,000 - £35,000" },
      { title: "Corporate Trainer", salary: "£26,000 - £40,000" },
      { title: "Adult Education Tutor", salary: "£22,000 - £32,000" },
    ],
    avgSalary: "£30,000+",
    duration: "6-10 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Aged 19+. No formal qualification requirements but subject specialism at Level 3+ recommended. Initial assessment of English, maths and ICT skills required.",
      assessmentDetails: "Internally assessed portfolio of evidence including a microteaching session (minimum 1 hour) or observed teaching practice. Must be synchronous/live. Externally quality assured.",
      qualificationDetails: "NCFE Level 3 Award in Education and Training (RQF). Qualification Number: 601/1620/1. Minimum 12 credits.",
      careerDescription: "Teaching Assistant, Trainer, Assessor, Tutor in further education and training. Progression to Level 4/5 teaching qualifications (Certificate/Diploma in Education and Training).",
      moduleDetails: [
      {
        name: "Understanding Roles, Responsibilities and Relationships in Education and Training (3 credits, Level 3)",
        description: "Understand the teaching role, responsibilities, relationships between teachers and learners, and points of referral to meet individual needs.",
        learningOutcomes: [
          "Understand the teaching role and responsibilities in education and training",
          "Understand ways to maintain a safe and supportive learning environment",
          "Understand the relationships between teachers and other professionals in education and training",
          "Create an inclusive teaching and learning environment",
          "Plan, deliver and evaluate inclusive teaching and learning",
          "Includes a MICROTEACHING element (minimum 1 hour)",
          "For those facilitating learning one-to-one in the workplace",
          "For those facilitating group learning in the workplace",
          "Types of assessment, assessment methods, giving feedback",
          "Principles and requirements of assessment, planning and conducting assessment",
        ],
      },
    ],
  },
  "assessing-vocational-level-3": {
    id: "assessing-vocational-level-3",
    title: "Level 3 Certificate in Assessing Vocational Achievement",
    category: "Teaching Qualification",
    price: 500,
    oldPrice: 500,
    tutorPrice: 0,
    oneOffDiscount: 50,
    monthlyPrice: 37.50,
    oldMonthlyPrice: 0,
    students: 640,
    badge: "ASSESSING",
    badgeColor: "#D69E2E",
    image: "/images/courses/teaching/assessing-vocational-level-3.png",
    overview:
      "Become a qualified vocational assessor. Learn to plan assessments, make assessment decisions, and provide constructive feedback to learners in vocational settings.",
    curriculum: [
      "Understanding the principles and practices of assessment",
      "Assessing occupational competence in the work environment",
      "Assessing vocational skills, knowledge and understanding",
    ],
    description:
      "Provides the knowledge and skills needed to assess learners' vocational competence in the workplace. Covers assessment planning, methods, decisions, and quality assurance. Essential for those assessing NVQs and other competence-based qualifications.",
    glancePoints: [
      "Replaces the former A1 Assessor Award",
      "Qualifies you to assess NVQs and vocational qualifications",
      "Covers assessment planning, observation, and feedback",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 3-6 months." },
      { question: "Need to be assessing?", answer: "Yes, real assessment practice required." },
      { question: "What can I assess?", answer: "NVQs and competence-based qualifications in your area of expertise." },
    ],
    careerRoles: [
      { title: "NVQ Assessor", salary: "£24,000 - £32,000" },
      { title: "Vocational Assessor", salary: "£23,000 - £30,000" },
      { title: "Internal Quality Assurer", salary: "£26,000 - £35,000" },
    ],
    avgSalary: "£28,000+",
    duration: "8-12 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Must have relevant occupational expertise and competence in the area being assessed. Should be working in or have access to an assessment role. No specific prior qualifications required.",
      assessmentDetails: "Internally assessed through portfolio of evidence including observed assessment practice. Requires real assessment in the work environment. Externally quality assured.",
      qualificationDetails: "NCFE Level 3 Certificate in Assessing Vocational Achievement (RQF). Qualification Number: 601/1432/1.",
      careerDescription: "Workplace Assessor, NVQ Assessor, Vocational Assessor, Training Assessor. Progression to Internal Quality Assurance qualifications.",
      moduleDetails: [
      {
        name: "Understanding the Principles and Practices of Assessment (3 credits)",
        description: "Understand the principles and requirements of assessment. Covers assessment methods, quality assurance, and legislation.",
        learningOutcomes: [
          "Understand the principles and requirements of assessment",
          "Understand different types of assessment methods",
          "Understand how to plan assessment",
          "Understand how to involve learners and others in assessment",
          "Understand how to make assessment decisions",
          "Understand quality assurance of the assessment process",
          "Understand how to manage information relating to assessment",
        ],
      },
      {
        name: "Assess Occupational Competence in the Work Environment (6 credits)",
        description: "Assess learners' competence in a real work environment using observation, questioning and other methods.",
        learningOutcomes: [
          "Be able to plan the assessment of occupational competence",
          "Be able to make assessment decisions about occupational competence",
          "Be able to provide required information following the assessment of occupational competence",
          "Be able to maintain legal and good practice requirements when assessing occupational competence",
        ],
      },
      {
        name: "Assess Vocational Skills, Knowledge and Understanding (6 credits)",
        description: "Assess learners' vocational skills, knowledge and understanding in environments other than the workplace.",
        learningOutcomes: [
          "Be able to prepare assessments of vocational skills, knowledge and understanding",
          "Be able to carry out assessments of vocational skills, knowledge and understanding",
          "Be able to provide required information following the assessment",
          "Be able to maintain legal and good practice requirements",
        ],
      },
    ],
  },
  "supporting-teaching-cert-level-3": {
    id: "supporting-teaching-cert-level-3",
    title: "Level 3 Certificate in Supporting Teaching and Learning",
    category: "Teaching Qualification",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 420,
    badge: "SUPPORT",
    badgeColor: "#38B2AC",
    image: "/images/courses/teaching/supporting-teaching-cert-level-3.png",
    overview:
      "Develop the skills needed to support teaching and learning in schools. Covers child development, supporting literacy and numeracy, and working with teachers to create effective learning environments.",
    curriculum: [
      "Supporting the teacher in managing the learning environment",
      "Supporting children and young people's literacy and numeracy",
      "Understanding child and young person development",
      "Communication and professional relationships in education",
      "Promoting equality, diversity and inclusion",
    ],
    description:
      "Provides knowledge and skills for supporting teaching and learning in schools and colleges. Covers child development, safeguarding, health and safety, and supporting learning activities.",
    glancePoints: [
      "Nationally recognised qualification for teaching assistants",
      "Covers child development, literacy support, and inclusion",
      "Suitable for aspiring and current teaching assistants",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Usually within 6 months." },
      { question: "Placement needed?", answer: "Yes, in a school or college." },
      { question: "Progression?", answer: "Level 3 Diploma, then PGCE or higher." },
    ],
    careerRoles: [
      { title: "Teaching Assistant", salary: "£18,000 - £24,000" },
      { title: "Learning Support Assistant", salary: "£18,000 - £23,000" },
      { title: "Higher Level Teaching Assistant", salary: "£22,000 - £28,000" },
    ],
    avgSalary: "£22,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Aged 16+. Need to be working or volunteering in a school or college (from Key Stage 1) as placement evidence required.",
      assessmentDetails: "Internally assessed through portfolio of evidence, direct observation, written assignments. Externally quality assured. Usually completed within 6 months.",
      qualificationDetails: "NCFE CACHE Level 3 Certificate in Supporting Teaching and Learning (RQF). Qualification Number: 603/2495/8.",
      careerDescription: "Teaching Assistant, Learning Support Assistant, Special Needs Assistant. Progression to Level 3 Diploma in Supporting Teaching and Learning.",
      moduleDetails: [
      {
        name: "Schools and Colleges as Organisations (L/616/5876)",
        description: "Understand the structure, roles and responsibilities within schools and colleges.",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Health and Safety in a Learning Environment (R/616/5877)",
        description: "Health and safety legislation, risk assessment, emergency procedures.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Safeguard Children and Young People (M/616/5880)",
        description: "Safeguarding legislation, recognising abuse, reporting procedures, e-safety.",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication and Professional Relationships with Children, Young People and Adults (T/616/5881)",
        description: "Effective communication, building relationships, respecting diversity.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand Child and Young Person Development (A/616/5882)",
        description: "Patterns of development, factors influencing development, monitoring and intervention.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Support Children and Young People's Positive Behaviour (J/616/5884)",
        description: "Behaviour policies, promoting positive behaviour, managing challenging behaviour.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand the Purpose and Requirements of Assessment in Supporting Teaching and Learning (R/616/5894)",
        description: "Types of assessment, formative and summative, assessment for learning, record keeping.",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Assessment for Learning (Y/616/5895)",
        description: "Supporting assessment processes, giving feedback, recording progress.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand Equality, Diversity and Inclusion in Work with Children and Young People (D/616/5896)",
        description: "Legislation, inclusive practice, challenging discrimination.",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Learning Activities (K/616/5898)",
        description: "Planning, delivering and reviewing learning activities, supporting individual needs.",
        learningOutcomes: [
        ],
      },
      {
        name: "Provide Literacy and Numeracy Support (T/616/5900)",
        description: "Supporting literacy and numeracy development across the curriculum.",
        learningOutcomes: [
        ],
      },
    ],
  },
  "send-leadership-level-4": {
    id: "send-leadership-level-4",
    title: "Level 4 Award in SEND Leadership & Management (Early Years)",
    category: "Teaching Qualification",
    price: 1500,
    oldPrice: 1500,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 120.83,
    oldMonthlyPrice: 0,
    students: 110,
    badge: "SEND",
    badgeColor: "#805AD5",
    image: "/images/courses/teaching/send-leadership-level-4.png",
    overview:
      "Develop the leadership and management skills needed to lead SEND provision in early years settings. Covers policy, practice, and multi-agency working for children with special educational needs.",
    curriculum: [
      "Leading SEND provision in early years",
      "Understanding SEND policy and legislation",
      "Multi-agency working for SEND",
      "Developing inclusive practice in early years",
      "Managing resources and staff for SEND support",
    ],
    description:
      "Provides knowledge and skills for the role of SEND Leadership and Management in early years settings. Covers inclusive practice, the SEND Code of Practice, and leadership strategies for supporting children with SEND.",
    glancePoints: [
      "Designed for SEND leaders in early years settings",
      "Covers the SEND Code of Practice and legislation",
      "Includes multi-agency working and inclusive practice",
      "100% online with tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Less than one year." },
      { question: "Need to be working?", answer: "In or preparing for SEND leadership role recommended." },
      { question: "External exams?", answer: "No, internally assessed only." },
    ],
    careerRoles: [
      { title: "Early Years SENCO", salary: "£26,000 - £35,000" },
      { title: "SEND Manager", salary: "£30,000 - £40,000" },
      { title: "Inclusion Lead", salary: "£28,000 - £38,000" },
    ],
    avgSalary: "£32,000+",
    duration: "8-12 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 4",
      entryRequirements: "Suitable for those in or preparing for SEND leadership roles in early years. Recommended to hold Level 3 qualification in early years.",
      assessmentDetails: "Internally assessed. Non-mandatory internal assessment task. No external assessment. Usually completed within one year.",
      qualificationDetails: "NCFE CACHE Level 4 Award in Special Educational Needs and Disability (SEND) Leadership and Management in the Early Years (RQF).",
      careerDescription: "SEND Coordinator, SEND Lead, Early Years Manager, Inclusion Manager. Progression to Level 5 qualifications or degree study.",
      moduleDetails: [
      {
        name: "Understanding SEND in the Early Years Context",
        description: "Types of SEND, prevalence, impact on children and families",
        learningOutcomes: [
        ],
      },
      {
        name: "The SEND Code of Practice",
        description: "Legislative framework, requirements for early years settings, graduated approach (Assess, Plan, Do, Review)",
        learningOutcomes: [
        ],
      },
      {
        name: "Leading SEND Provision in Early Years",
        description: "Role of the SEND leader, strategic planning, resource allocation, monitoring effectiveness",
        learningOutcomes: [
        ],
      },
      {
        name: "Working in Partnership",
        description: "Collaboration with parents/carers, external agencies (speech therapy, educational psychology, health visitors), local authority SEND teams",
        learningOutcomes: [
        ],
      },
      {
        name: "Inclusive Practice in Early Years",
        description: "Adapting environments, differentiated planning, reasonable adjustments, promoting participation",
        learningOutcomes: [
        ],
      },
      {
        name: "Assessment and Planning for Children with SEND",
        description: "Individual Education Plans (IEPs), Education Health and Care Plans (EHCPs), transition planning",
        learningOutcomes: [
        ],
      },
    ],
  },
  "advanced-practitioner-level-4": {
    id: "advanced-practitioner-level-4",
    title: "Level 4 Certificate for Advanced Practitioner in Schools",
    category: "Teaching Qualification",
    price: 1400,
    oldPrice: 1400,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 112.50,
    oldMonthlyPrice: 0,
    students: 95,
    badge: "ADVANCED",
    badgeColor: "#805AD5",
    image: "/images/courses/teaching/advanced-practitioner-level-4.png",
    overview:
      "Advance your career in education with this Level 4 qualification. Develop higher-level skills in supporting teaching, leading staff, and improving outcomes for learners.",
    curriculum: [
      "Advanced teaching and learning support",
      "Leading and managing a team of support staff",
      "Contributing to assessment for learning",
      "Supporting children and young people with special needs",
      "Professional development and reflective practice",
    ],
    description:
      "Provides knowledge and skills for advanced practitioners working in schools and colleges. Covers mentoring, leading practice, research skills, and specialist areas to support professional development.",
    glancePoints: [
      "Level 4 qualification for experienced school support staff",
      "Covers leadership, advanced support, and SEND",
      "Progression pathway from Level 3 teaching assistant roles",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically up to one year." },
      { question: "Need experience?", answer: "Yes, should be experienced practitioner." },
      { question: "Progression?", answer: "Level 5 qualifications or degree programmes." },
    ],
    careerRoles: [
      { title: "Higher Level Teaching Assistant", salary: "£22,000 - £28,000" },
      { title: "Cover Supervisor", salary: "£20,000 - £26,000" },
      { title: "Learning Mentor", salary: "£22,000 - £30,000" },
    ],
    avgSalary: "£26,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 4",
      entryRequirements: "Suitable for experienced practitioners in schools or colleges working at an advanced level. Recommended to hold Level 3 qualification in relevant area.",
      assessmentDetails: "Internally assessed through portfolio of evidence, assignments, and practical demonstrations. Externally quality assured.",
      qualificationDetails: "NCFE CACHE Level 4 Certificate for the Advanced Practitioner in Schools and Colleges (RQF).",
      careerDescription: "Advanced Teaching Assistant, Lead Practitioner, Specialist Support Worker, Mentor. Progression to Level 5 qualifications or degree study.",
      moduleDetails: [
      {
        name: "Leading and Mentoring Others in Educational Settings",
        description: "Mentoring skills, coaching techniques, supporting colleagues' professional development",
        learningOutcomes: [
        ],
      },
      {
        name: "Leading Practice in Your Area of Specialism",
        description: "Developing expertise, sharing best practice, curriculum development",
        learningOutcomes: [
        ],
      },
      {
        name: "Research and Evidence-Based Practice",
        description: "Research methods, evaluating evidence, applying research to practice",
        learningOutcomes: [
        ],
      },
      {
        name: "Professional Development and Reflective Practice",
        description: "Critical reflection, CPD planning, career development",
        learningOutcomes: [
        ],
      },
      {
        name: "Working Collaboratively and in Partnership",
        description: "Multi-agency working, engaging parents and the wider community",
        learningOutcomes: [
        ],
      },
      {
        name: "Innovation in Teaching and Learning",
        description: "Implementing new approaches, evaluating impact, leading change",
        learningOutcomes: [
        ],
      },
    ],
  },
  "sen-coordinators-level-3": {
    id: "sen-coordinators-level-3",
    title: "Level 3 Award for SEN Coordinators in Early Years",
    category: "Teaching Qualification",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 130,
    badge: "SENCO",
    badgeColor: "#38B2AC",
    image: "/images/courses/teaching/sen-coordinators-level-3.png",
    overview:
      "Prepare for the SENCO role in early years settings. Covers the SEND Code of Practice, assessment and planning for children with SEN, and working with families and professionals.",
    curriculum: [
      "Understanding the SENCO role in early years",
      "SEND Code of Practice and legislation",
      "Assessment and planning for children with SEN",
      "Working with families and multi-agency professionals",
      "Creating inclusive early years environments",
    ],
    description:
      "Provides knowledge and skills for the SENCo role in early years settings. Covers the SEND Code of Practice, working with families, multi-agency working, and creating inclusive environments for children with SEND.",
    glancePoints: [
      "Essential qualification for early years SENCOs",
      "Covers the SEND Code of Practice in depth",
      "Includes multi-agency working and family partnerships",
      "100% online with tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Less than one year." },
      { question: "Is it required for SENCos?", answer: "Meets DfE criteria for SENCo role in early years." },
      { question: "External exam?", answer: "No." },
    ],
    careerRoles: [
      { title: "Early Years SENCO", salary: "£24,000 - £32,000" },
      { title: "Inclusion Coordinator", salary: "£24,000 - £30,000" },
      { title: "SEN Support Worker", salary: "£20,000 - £26,000" },
    ],
    avgSalary: "£27,000+",
    duration: "8-12 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Suitable for those in or preparing for the SENCo role in early years. No formal entry requirements but early years experience recommended.",
      assessmentDetails: "Internally assessed. Non-mandatory assessment task at end of qualification. No external assessment. Less than one year to complete.",
      qualificationDetails: "NCFE CACHE Level 3 Award for Special Educational Needs Coordinators in Early Years Settings (RQF). Qualification Number: 603/3476/9.",
      careerDescription: "Special Educational Needs Coordinator (SENCo) in early years, Inclusion Lead, SEND Advisor. Progression to Level 4 SEND qualifications.",
      moduleDetails: [
      {
        name: "Understanding the Role of the SENCo in Early Years",
        description: "Responsibilities, statutory requirements, the graduated approach",
        learningOutcomes: [
        ],
      },
      {
        name: "The SEND Code of Practice and Legislation",
        description: "Children and Families Act 2014, Equality Act 2010, EYFS requirements for SEND",
        learningOutcomes: [
        ],
      },
      {
        name: "Working with Families and External Agencies",
        description: "Partnership with parents, referral processes, multi-agency working, Local Offer",
        learningOutcomes: [
        ],
      },
      {
        name: "Identifying and Supporting Children with SEND",
        description: "Observation and assessment, early identification, intervention strategies",
        learningOutcomes: [
        ],
      },
      {
        name: "Creating Inclusive Environments",
        description: "Adapting provision, removing barriers, reasonable adjustments, differentiated planning",
        learningOutcomes: [
        ],
      },
      {
        name: "Monitoring and Reviewing SEND Provision",
        description: "Tracking progress, evaluating effectiveness, reporting to management",
        learningOutcomes: [
        ],
      },
    ],
  },

  // --- ACCESS TO HE ---
  "access-he-nursing": {
    id: "access-he-nursing",
    title: "Level 3 Access To HE Diploma (Nursing)",
    category: "Access To HE",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 950,
    badge: "ACCESS",
    badgeColor: "#3182CE",
    image: "/images/courses/access-to-he/access-he-nursing.png",
    overview:
      "A nationally recognised route into university nursing programmes. Covers human biology, health studies, and academic skills needed for higher education entry.",
    curriculum: [
      "Human Biology and Anatomy",
      "Health Studies and Public Health",
      "Psychology for Health Professionals",
      "Academic Writing and Study Skills",
      "Research Methods",
    ],
    description:
      "Designed for adults who wish to study nursing at university but lack traditional qualifications. Provides the academic knowledge and study skills needed for entry to a nursing degree programme.",
    glancePoints: [
      "Recognised by universities across the UK for nursing degree entry",
      "Covers biology, health studies, psychology, and academic skills",
      "Designed for adults without traditional A-Level qualifications",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 1 year full-time or 2 years part-time." },
      { question: "Accepted by universities?", answer: "Yes, widely accepted for nursing degrees." },
      { question: "UCAS points?", answer: "Up to 144 UCAS tariff points at Distinction." },
      { question: "Funding?", answer: "May be eligible for Advanced Learner Loan (written off on completion of health degree)." },
    ],
    careerRoles: [
      { title: "Registered Nurse (Adult)", salary: "£27,000 - £36,000" },
      { title: "Mental Health Nurse", salary: "£27,000 - £36,000" },
      { title: "Community Nurse", salary: "£28,000 - £38,000" },
    ],
    avgSalary: "£33,000+",
    duration: "9-12 months",
    awardingBody: "SEG",
    qualificationLevel: "Level 3",
      entryRequirements: "Usually aged 19+. No formal entry requirements but GCSE Maths and English at grade C/4 or above often required. Some providers may require an interview.",
      assessmentDetails: "Internally assessed through essays, assignments, presentations, reports, and examinations. Graded with UCAS tariff points (Distinction, Merit, Pass). 60 credits required at Level 3.",
      qualificationDetails: "Access to HE Diploma (Nursing). Validated by Skills and Education Group Access. Nationally recognised for university entry.",
      careerDescription: "Entry to university nursing degree programmes (Adult, Child, Mental Health, Learning Disability nursing). Also accepted for other health-related degrees. Progression to BSc (Hons) Nursing.",
      moduleDetails: [
      {
        name: "Academic Writing Skills",
        description: "Essay structure, referencing, avoiding plagiarism",
        learningOutcomes: [
        ],
      },
      {
        name: "Study Skills",
        description: "Time management, note-taking, critical reading",
        learningOutcomes: [
        ],
      },
      {
        name: "Research Methods",
        description: "Research techniques, evaluating sources, academic integrity",
        learningOutcomes: [
        ],
      },
      {
        name: "Human Biology and Physiology",
        description: "Cells, tissues, organ systems, homeostasis, cardiovascular system, respiratory system, nervous system",
        learningOutcomes: [
        ],
      },
      {
        name: "Psychology for Health Professionals",
        description: "Psychological perspectives, mental health, behaviour change, health psychology",
        learningOutcomes: [
        ],
      },
      {
        name: "Sociology for Health",
        description: "Social structures, inequality, health inequalities, cultural influences on health",
        learningOutcomes: [
        ],
      },
      {
        name: "Health Studies",
        description: "Health promotion, public health, NHS structure, patient care principles",
        learningOutcomes: [
        ],
      },
      {
        name: "Chemistry for Healthcare",
        description: "Atoms, molecules, chemical reactions relevant to the body, pharmaceuticals",
        learningOutcomes: [
        ],
      },
      {
        name: "Understanding Illness and Disease",
        description: "Pathology, infectious disease, chronic conditions, treatment approaches",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication in Healthcare",
        description: "Patient communication, barriers, cultural competence",
        learningOutcomes: [
        ],
      },
      {
        name: "Values and Ethics in Healthcare",
        description: "Professional ethics, dignity, consent, confidentiality",
        learningOutcomes: [
        ],
      },
    ],
  },
  "access-he-midwifery": {
    id: "access-he-midwifery",
    title: "Level 3 Access To HE Diploma (Midwifery)",
    category: "Access To HE",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 680,
    badge: "ACCESS",
    badgeColor: "#3182CE",
    image: "/images/courses/access-to-he/access-he-midwifery.png",
    overview:
      "Prepare for university midwifery programmes with this Access to HE Diploma. Covers biology, reproductive health, psychology, and the academic skills required for degree-level study.",
    curriculum: [
      "Human Biology and Reproductive Health",
      "Psychology of Pregnancy and Childbirth",
      "Health Promotion and Public Health",
      "Academic Writing and Research Skills",
      "Sociology of Health and Illness",
    ],
    description:
      "Designed for adults wishing to study midwifery at university. Provides academic knowledge and study skills for university entry including biological sciences and healthcare knowledge.",
    glancePoints: [
      "University-recognised pathway to BSc Midwifery programmes",
      "Covers reproductive health, psychology, and academic skills",
      "Designed for mature learners and career changers",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "1 year full-time or 2 years part-time." },
      { question: "Accepted for midwifery?", answer: "Yes, by most UK universities." },
      { question: "Funding?", answer: "Advanced Learner Loan available (written off on completion of health degree)." },
    ],
    careerRoles: [
      { title: "Registered Midwife", salary: "£27,000 - £36,000" },
      { title: "Community Midwife", salary: "£28,000 - £38,000" },
      { title: "Specialist Midwife", salary: "£35,000 - £45,000" },
    ],
    avgSalary: "£34,000+",
    duration: "9-12 months",
    awardingBody: "SEG",
    qualificationLevel: "Level 3",
      entryRequirements: "Usually aged 19+. GCSE Maths and English at grade C/4 or above often required. Some providers require interview. Check specific university entry requirements.",
      assessmentDetails: "Internally assessed through essays, assignments, presentations, reports, and exams. Graded with UCAS tariff points (Distinction, Merit, Pass). 60 credits at Level 3 required.",
      qualificationDetails: "Access to HE Diploma (Midwifery). Validated by Skills and Education Group Access. Nationally recognised for university entry.",
      careerDescription: "Entry to university midwifery degree programmes. Also accepted for nursing and health-related degrees. Progression to BSc (Hons) Midwifery.",
      moduleDetails: [
      {
        name: "Academic Writing Skills",
        description: "Essay structure, Harvard referencing, critical analysis",
        learningOutcomes: [
        ],
      },
      {
        name: "Study Skills and Personal Development",
        description: "Time management, reflective practice",
        learningOutcomes: [
        ],
      },
      {
        name: "Research Methods",
        description: "Research techniques, data analysis, ethical considerations",
        learningOutcomes: [
        ],
      },
      {
        name: "Human Biology and Anatomy",
        description: "Cells, tissues, organ systems with emphasis on reproductive system",
        learningOutcomes: [
        ],
      },
      {
        name: "Reproductive Biology",
        description: "Conception, pregnancy, foetal development, birth processes, postnatal physiology",
        learningOutcomes: [
        ],
      },
      {
        name: "Psychology for Midwifery",
        description: "Psychological perspectives, attachment theory, perinatal mental health",
        learningOutcomes: [
        ],
      },
      {
        name: "Sociology for Midwifery",
        description: "Social determinants of health, family structures, cultural practices around birth",
        learningOutcomes: [
        ],
      },
      {
        name: "Health Studies for Midwifery",
        description: "Antenatal care, health promotion, public health, NHS maternity services",
        learningOutcomes: [
        ],
      },
      {
        name: "Chemistry for Healthcare",
        description: "Biochemistry relevant to pregnancy, nutrition, pharmacology basics",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication in Maternity Care",
        description: "Person-centred care, informed consent, supporting vulnerable women",
        learningOutcomes: [
        ],
      },
      {
        name: "Ethical Issues in Midwifery Practice",
        description: "Professional standards, confidentiality, safeguarding, ethical dilemmas",
        learningOutcomes: [
        ],
      },
    ],
  },
  "teaching-fe-skills-level-5": {
    id: "teaching-fe-skills-level-5",
    title: "NCFE Level 5 Diploma in Teaching (FE and Skills)",
    category: "Teaching Qualification",
    price: 1500,
    oldPrice: 1500,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 120.83,
    oldMonthlyPrice: 0,
    students: 350,
    badge: "TEACHING",
    badgeColor: "#805AD5",
    image: "/images/courses/access-to-he/teaching-fe-skills-level-5.png",
    overview:
      "The full teaching qualification for the further education and skills sector. Achieve Qualified Teacher Learning and Skills (QTLS) status and teach across FE colleges, adult education, and training providers.",
    curriculum: [
      "Teaching, learning and assessment in education and training",
      "Developing teaching, learning and assessment in education and training",
      "Theories, principles and models in education and training",
      "Wider professional practice and development",
      "Action research",
    ],
    description:
      "The full teaching qualification for the further education and skills sector. Provides in-depth knowledge and practical skills for planning, delivering, and assessing learning. Equivalent to a Certificate in Education.",
    glancePoints: [
      "Full teaching qualification for the FE and skills sector",
      "Pathway to QTLS (Qualified Teacher Learning and Skills) status",
      "Replaces the former DTLLS and Cert Ed",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 1-2 years." },
      { question: "Teaching practice needed?", answer: "Yes, minimum 100 hours." },
      { question: "Is it equivalent to PGCE?", answer: "Equivalent to Cert Ed; can lead to QTLS." },
      { question: "Can I teach in schools?", answer: "QTLS is recognised as equivalent to QTS in schools." },
    ],
    careerRoles: [
      { title: "FE Lecturer", salary: "£26,000 - £40,000" },
      { title: "Adult Education Tutor", salary: "£24,000 - £35,000" },
      { title: "Skills Trainer", salary: "£25,000 - £38,000" },
    ],
    avgSalary: "£33,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 5",
      entryRequirements: "Aged 19+. Should hold subject specialism at Level 3 or above. Should be teaching or have access to teaching practice. English and Maths at Level 2 or above.",
      assessmentDetails: "Internally assessed through portfolio of evidence, observed teaching practice (minimum 100 hours), assignments, and reflective journals. Externally quality assured. Teaching observations are a key component.",
      qualificationDetails: "NCFE Level 5 Diploma in Teaching (Further Education and Skills) (RQF). Full teaching qualification equivalent to a Certificate in Education (Cert Ed).",
      careerDescription: "FE Lecturer, Teacher in adult education, Trainer, Skills Coach, Curriculum Leader. Meets requirements for QTLS (Qualified Teacher Learning and Skills) status via the Society for Education and Training.",
      moduleDetails: [
      {
        name: "Developing Teaching, Learning and Assessment in Education and Training (20 credits)",
        description: "Understand roles, responsibilities and relationships. Use inclusive approaches. Understand and use assessment methods.",
        learningOutcomes: [
          "Plan inclusive sessions",
          "deliver using a range of methods",
          "assess learning",
          "evaluate own practice",
        ],
      },
      {
        name: "Theories, Principles and Models in Education and Training (20 credits)",
        description: "Apply theories and principles of learning, communication, assessment and curriculum to practice.",
        learningOutcomes: [
        ],
      },
      {
        name: "Wider Professional Practice in Education and Training (20 credits)",
        description: "Understand professionalism, dual professional status, quality improvement, and wider policy context.",
        learningOutcomes: [
        ],
      },
      {
        name: "Developing, Using and Organising Resources in a Specialist Area (15 credits)",
        description: "Select, develop and adapt resources for your specialist subject area.",
        learningOutcomes: [
        ],
      },
      {
        name: "Literacy and the Learners (15 credits) OR Numeracy and the Learners (15 credits) OR ICT and the Learners (15 credits)",
        description: "Understand how to support learners' development in your chosen minimum core area.",
        learningOutcomes: [
        ],
      },
      {
        name: "Action Research (optional but commonly included)",
        description: "Plan and carry out a small-scale research project to improve practice.",
        learningOutcomes: [
        ],
      },
    ],
  },
  "assessing-competence-level-3": {
    id: "assessing-competence-level-3",
    title: "Level 3 Award in Assessing Competence in the Work Environment",
    category: "Teaching Qualification",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 290,
    badge: "ASSESSING",
    badgeColor: "#D69E2E",
    image: "/images/courses/access-to-he/assessing-competence-level-3.png",
    overview:
      "Qualify to assess learner competence in their workplace. Covers observation, questioning, and professional discussion techniques for workplace assessment.",
    curriculum: [
      "Understanding the principles and practices of assessment",
      "Assessing occupational competence in the work environment",
      "Making assessment decisions",
      "Providing constructive feedback",
    ],
    description:
      "Provides the knowledge and skills to assess learners' competence in the work environment. Suitable for those responsible for assessing NVQs and competence-based qualifications.",
    glancePoints: [
      "Focused workplace assessment qualification",
      "Covers observation, questioning, and feedback techniques",
      "Shorter alternative to the full CAVA certificate",
      "100% online with tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 3-6 months." },
      { question: "Need to be assessing?", answer: "Yes." },
      { question: "Difference from Certificate?", answer: "Award is one unit; Certificate covers broader assessment." },
    ],
    careerRoles: [
      { title: "Workplace Assessor", salary: "£23,000 - £30,000" },
      { title: "NVQ Assessor", salary: "£24,000 - £32,000" },
      { title: "Training Assessor", salary: "£24,000 - £30,000" },
    ],
    avgSalary: "£27,000+",
    duration: "6-10 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Must have occupational competence in the area being assessed. Should be working in or have access to an assessment role.",
      assessmentDetails: "Internally assessed through portfolio of evidence and observed assessment practice. Real work environment assessment required. Externally quality assured.",
      qualificationDetails: "NCFE Level 3 Award in Assessing Competence in the Work Environment (RQF).",
      careerDescription: "Workplace Assessor, NVQ Assessor, Vocational Assessor. Progression to Level 3 Certificate in Assessing Vocational Achievement or IQA qualifications.",
      moduleDetails: [
      {
        name: "Understanding the Principles and Practices of Assessment (3 credits)",
        description: "Understand the principles and requirements of assessment, types of assessment methods, planning, quality assurance, and legislation.",
        learningOutcomes: [
          "Understand the principles and requirements of assessment",
          "Understand different types of assessment methods",
          "Understand how to plan and conduct assessment",
          "Understand how to involve learners and others in assessment",
          "Understand quality assurance of the assessment process",
        ],
      },
      {
        name: "Assess Occupational Competence in the Work Environment (6 credits)",
        description: "Plan and carry out assessments of occupational competence in the workplace using observation, questioning and other methods.",
        learningOutcomes: [
          "Be able to plan the assessment of occupational competence",
          "Be able to make assessment decisions about occupational competence",
          "Be able to provide required information following assessment",
          "Be able to maintain legal and good practice requirements",
        ],
      },
    ],
  },
  "supporting-teaching-level-2": {
    id: "supporting-teaching-level-2",
    title: "Level 2 Certificate in Supporting Teaching and Learning",
    category: "Teaching Qualification",
    price: 1000,
    oldPrice: 1000,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 79.17,
    oldMonthlyPrice: 0,
    students: 540,
    badge: "SUPPORT",
    badgeColor: "#38B2AC",
    image: "/images/courses/access-to-he/supporting-teaching-level-2.png",
    overview:
      "An introductory qualification for those wanting to support teaching and learning in schools. Covers the fundamentals of working with children and young people in educational settings.",
    curriculum: [
      "Supporting the teacher in the learning environment",
      "Safeguarding children and young people",
      "Communication and professional relationships",
      "Understanding child and young person development",
      "Promoting equality, diversity and inclusion in education",
    ],
    description:
      "Provides foundational knowledge for supporting teaching and learning in schools. Covers child development, communication, safeguarding, and creating positive learning environments.",
    glancePoints: [
      "Entry-level qualification for aspiring teaching assistants",
      "Covers child development, safeguarding, and inclusion",
      "Stepping stone to Level 3 teaching support qualifications",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "6-12 months." },
      { question: "Placement needed?", answer: "Recommended but not essential." },
      { question: "Progression?", answer: "Level 3 Certificate or Diploma." },
    ],
    careerRoles: [
      { title: "Classroom Support Assistant", salary: "£16,000 - £20,000" },
      { title: "Lunchtime Supervisor", salary: "£14,000 - £17,000" },
      { title: "After School Club Worker", salary: "£16,000 - £20,000" },
    ],
    avgSalary: "£18,000+",
    duration: "8-12 weeks",
    awardingBody: "NCFE",
    qualificationLevel: "Level 2",
      entryRequirements: "Aged 16+. No formal entry requirements. Work placement not essential but recommended.",
      assessmentDetails: "Internally assessed through portfolio of evidence and assignments. Externally quality assured. Usually completed within 6-12 months.",
      qualificationDetails: "NCFE CACHE Level 2 Certificate in Supporting Teaching and Learning (RQF).",
      careerDescription: "Teaching Assistant (Level 2), Learning Support Assistant, Classroom Helper. Progression to Level 3 Certificate or Diploma in Supporting Teaching and Learning.",
      moduleDetails: [
      {
        name: "Schools and Colleges as Organisations (L/616/5876)",
        description: "Understand the structure, roles and governance of schools and colleges, the school workforce, how schools are funded.",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Health and Safety in a Learning Environment (R/616/5877)",
        description: "Health and safety legislation, risk assessment, emergency procedures in schools.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand How to Safeguard Children and Young People (M/616/5880)",
        description: "Safeguarding legislation and policies, recognising signs of abuse, procedures for reporting concerns, e-safety.",
        learningOutcomes: [
        ],
      },
      {
        name: "Communication and Professional Relationships (T/616/5881)",
        description: "Communicating effectively with children, young people and adults, building professional relationships.",
        learningOutcomes: [
        ],
      },
      {
        name: "Understand Child and Young Person Development (A/616/5882)",
        description: "Patterns of development from birth to 19, factors influencing development, monitoring and intervention.",
        learningOutcomes: [
        ],
      },
    ],
  },
  "supporting-teaching-diploma-level-3": {
    id: "supporting-teaching-diploma-level-3",
    title: "Level 3 Diploma in Supporting Teaching and Learning",
    category: "Teaching Qualification",
    price: 1300,
    oldPrice: 1300,
    tutorPrice: 0,
    oneOffDiscount: 200,
    monthlyPrice: 104.17,
    oldMonthlyPrice: 0,
    students: 380,
    badge: "DIPLOMA",
    badgeColor: "#38B2AC",
    image: "/images/courses/access-to-he/supporting-teaching-diploma-level-3.jpg",
    overview:
      "The comprehensive Level 3 qualification for teaching assistants. Covers all aspects of supporting teaching and learning, including specialist areas such as SEN support, behaviour management, and assessment.",
    curriculum: [
      "Supporting teaching and learning in schools",
      "Supporting children and young people with SEN",
      "Behaviour management strategies",
      "Assessment for learning",
      "Communication and professional practice",
      "Promoting positive behaviour",
    ],
    description:
      "Comprehensive qualification for teaching assistants working in schools. Covers advanced knowledge of child development, supporting curriculum delivery, safeguarding, and working with SEND pupils.",
    glancePoints: [
      "Comprehensive Level 3 qualification for teaching assistants",
      "Covers SEN support, behaviour management, and assessment",
      "Recognised by schools across the UK",
      "100% online with dedicated tutor support",
      "Interest-free payment plans available",
    ],
    faqs: [
      { question: "How long?", answer: "Typically 1 year." },
      { question: "Must be in school?", answer: "Yes, working or volunteering." },
      { question: "Can I teach?", answer: "Supports progression to teaching qualifications." },
      { question: "Pay increase?", answer: "Often eligible for higher grade on school pay scales." },
    ],
    careerRoles: [
      { title: "Teaching Assistant", salary: "£18,000 - £24,000" },
      { title: "SEN Teaching Assistant", salary: "£19,000 - £25,000" },
      { title: "Higher Level Teaching Assistant", salary: "£22,000 - £28,000" },
    ],
    avgSalary: "£23,000+",
    duration: "12-18 months",
    awardingBody: "NCFE",
    qualificationLevel: "Level 3",
      entryRequirements: "Aged 16+. Must be working or volunteering in a school or college from Key Stage 1. Practical placement evidence and observations required.",
      assessmentDetails: "Internally assessed through portfolio of evidence including workplace observations, assignments, witness testimonies. Externally quality assured. Usually completed in 1 year.",
      qualificationDetails: "NCFE CACHE Level 3 Diploma in Supporting Teaching and Learning (RQF). Full qualification for teaching assistants.",
      careerDescription: "Senior Teaching Assistant, Senior Learning Support Assistant, Senior Special Needs Assistant, Higher Level Teaching Assistant (with further training). Progression to Foundation Degree or teaching qualifications.",
      moduleDetails: [
      {
        name: "Support Children and Young People with Special Educational Needs and Disabilities",
        description: "Understanding SEND, supporting individual needs, working with SEND professionals",
        learningOutcomes: [
        ],
      },
      {
        name: "Support Children and Young People During Transitions",
        description: "Types of transitions, supporting emotional wellbeing during change",
        learningOutcomes: [
        ],
      },
      {
        name: "Use ICT to Support Teaching and Learning",
        description: "Using technology effectively in the classroom, e-safety, digital resources",
        learningOutcomes: [
          "Support Bilingual/Multilingual Learners",
          "Support Children's Speech, Language and Communication",
          "Invigilate Tests and Examinations",
          "Prepare and Maintain Learning Environments",
        ],
      },
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
  "Digital Technology": "digital-technology",
  "Teaching Qualification": "teaching-qualification",
  "Access To HE": "access-to-he",
};
