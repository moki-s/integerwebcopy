<?php
// Course Data Definitions
// Scraped from integer.co.uk and legacy data

const COURSES_DATA = [
    // --- ACCOUNTING (AAT) ---
    'aat-level-1-business-skills' => [
        'id' => 'aat-level-1-business-skills',
        'title' => 'AAT Level 1 Award in Business Skills',
        'category' => 'Accounting',
        'price' => 150,
        'old_price' => 250,
        'monthly_price' => 15,
        'students' => 120,
        'badge' => 'ENTRY LEVEL',
        'badge_color' => '#2F855A',
        'icon' => '📊',
        'image' => '/assets/images/courses/accounting/aat-level-1-business-skills.png',
        'overview' => 'This entry-level qualification helps you support finance teams with everyday business activities, and understand sales and purchase processes. Perfect for school leavers or those returning to work.',
        'curriculum' => [
            'Working in the Business Environment',
            'Using Numbers in Business',
            'Sales and Purchase Processes'
        ],
        'reviews' => []
    ],
    'aat-level-1-bookkeeping' => [
        'id' => 'aat-level-1-bookkeeping',
        'title' => 'AAT Level 1 Award in Bookkeeping',
        'category' => 'Accounting',
        'price' => 150,
        'old_price' => 250,
        'monthly_price' => 15,
        'students' => 150,
        'badge' => 'ENTRY LEVEL',
        'badge_color' => '#2F855A',
        'icon' => '📒',
        'image' => '/assets/images/courses/accounting/aat-level-1-bookkeeping.png',
        'overview' => 'An introductory course offering a solid foundation in manual bookkeeping skills, including double-entry bookkeeping and associated documents.',
        'curriculum' => [
            'Bookkeeping Fundamentals',
            'Double-Entry Bookkeeping',
            'Business Documents'
        ],
        'reviews' => []
    ],
    'aat-level-2-accounting' => [
        'id' => 'aat-level-2-accounting',
        'title' => 'AAT Level 2 Certificate in Accounting',
        'category' => 'Accounting',
        'price' => 295,
        'old_price' => 595,
        'monthly_price' => 29,
        'students' => 1250,
        'badge' => 'POPULAR',
        'badge_color' => '#2F855A',
        'icon' => '📊',
        'image' => '/assets/images/courses/accounting/aat-level-2-accounting.png',
        'overview' => 'The AAT Level 2 Certificate in Accounting is your gateway to a career in finance. This practical course covers all the foundational aspects of accounting, from bookkeeping and costing to mastering software and understanding business environments. Designed with flexibility in mind, this qualification suits both beginners and those looking to refresh their financial knowledge.',
        'curriculum' => [
            'Introduction to Bookkeeping',
            'Principles of Bookkeeping Controls',
            'Principles of Costing',
            'The Business Environment'
        ],
        'reviews' => [
            ['author' => 'Isabella N.', 'rating' => 5, 'title' => 'Flexible payment options made it easier!', 'text' => 'I was initially hesitant about enrolling because of the payment, but the team explained their flexible options clearly and patiently. They made the whole process so simple, and I’m glad I didn’t let my fear stop me.'],
            ['author' => 'Amelia S.', 'rating' => 5, 'title' => 'Helped me overcome my doubts!', 'text' => 'I was nervous about starting the Access to HE Diploma because I hadn\'t studied in years. The staff reassured me, explained everything step by step, and made me feel confident about taking this leap.']
        ]
    ],
    'aat-level-2-bookkeeping' => [
        'id' => 'aat-level-2-bookkeeping',
        'title' => 'AAT Level 2 Certificate in Bookkeeping',
        'category' => 'Accounting',
        'price' => 250,
        'old_price' => 450,
        'monthly_price' => 25,
        'students' => 980,
        'badge' => 'ENTRY LEVEL',
        'badge_color' => '#2F855A',
        'icon' => '📒',
        'image' => '/assets/images/courses/accounting/aat-level-2-bookkeeping.png',
        'overview' => 'A short, sharp qualification that delivers the essential skills for manual and digital bookkeeping. Perfect for those who want to focus specifically on bookkeeping roles or run their own small business finances.',
        'curriculum' => [
            'Introduction to Bookkeeping',
            'Principles of Bookkeeping Controls'
        ],
        'reviews' => []
    ],
    'aat-level-3-accounting' => [
        'id' => 'aat-level-3-accounting',
        'title' => 'AAT Level 3 Diploma in Accounting',
        'category' => 'Accounting',
        'price' => 495,
        'old_price' => 895,
        'monthly_price' => 45,
        'students' => 1600,
        'badge' => 'ADVANCED',
        'badge_color' => '#D69E2E',
        'icon' => '📈',
        'image' => '/assets/images/courses/accounting/aat-level-3-accounting.png',
        'overview' => 'Master complex financial processes, including final accounts, reports, and returns. This advanced diploma represents the next step for accounting professionals, covering indirect tax, management accounting, and financial accounting.',
        'curriculum' => [
            'Business Awareness',
            'Financial Accounting: Preparing Financial Statements',
            'Management Accounting Techniques',
            'Tax Processes for Businesses'
        ],
        'reviews' => []
    ],
    'aat-level-3-bookkeeping' => [
        'id' => 'aat-level-3-bookkeeping',
        'title' => 'AAT Level 3 Certificate in Bookkeeping',
        'category' => 'Accounting',
        'price' => 350,
        'old_price' => 550,
        'monthly_price' => 35,
        'students' => 540,
        'badge' => 'ADVANCED',
        'badge_color' => '#D69E2E',
        'icon' => '📚',
        'image' => '/assets/images/courses/accounting/aat-level-3-bookkeeping.png',
        'overview' => 'Develop advanced bookkeeping skills needed for senior roles. Learn to prepare financial statements for sole traders and partnerships, and understand the VAT system.',
        'curriculum' => [
            'Financial Accounting: Preparing Financial Statements',
            'Tax Processes for Businesses'
        ],
        'reviews' => []
    ],
    'aat-level-4-accounting' => [
        'id' => 'aat-level-4-accounting',
        'title' => 'AAT Level 4 Diploma in Professional Accounting',
        'category' => 'Accounting',
        'price' => 695,
        'old_price' => 1295,
        'monthly_price' => 65,
        'students' => 320,
        'badge' => 'PROFESSIONAL',
        'badge_color' => '#3182CE',
        'icon' => '🎓',
        'image' => '/assets/images/courses/accounting/aat-level-4-accounting.png',
        'overview' => 'The highest level of AAT qualification. Become a fully qualified accounting technician. This course covers complex accounting tasks including drafting financial statements, managing budgets, and evaluating financial performance.',
        'curriculum' => [
            'Applied Management Accounting',
            'Drafting and Interpreting Financial Statements',
            'Internal Accounting Systems and Controls',
            'Credit Management (Optional)',
            'Cash and Treasury Management (Optional)'
        ],
        'reviews' => []
    ],

    // --- HEALTH & SOCIAL CARE ---
    'ncfe-level-2-care' => [
        'id' => 'ncfe-level-2-care',
        'title' => 'Level 2 Diploma in Care',
        'category' => 'Health & Social Care',
        'price' => 395,
        'old_price' => 650,
        'monthly_price' => 39,
        'students' => 300,
        'badge' => 'CARE',
        'badge_color' => '#38B2AC',
        'icon' => '🩺',
        'image' => '/assets/images/courses/health-social/ncfe-level-2-care.png',
        'overview' => 'The NCFE CACHE Level 2 Diploma in Care is the standard qualification for those working in adult care settings in England. It confirms occupational competence for roles such as Adult Care Worker or Healthcare Assistant.',
        'curriculum' => [
            'Communication in care settings',
            'Handle information in care settings',
            'Personal development in care settings',
            'Implement person-centred approaches'
        ],
        'reviews' => []
    ],
    'ncfe-level-2-early-years' => [
        'id' => 'ncfe-level-2-early-years',
        'title' => 'Level 2 Diploma for the Early Years Practitioner',
        'category' => 'Health & Social Care',
        'price' => 395,
        'old_price' => 650,
        'monthly_price' => 39,
        'students' => 450,
        'badge' => 'PRACTITIONER',
        'badge_color' => '#38B2AC',
        'icon' => '🧸',
        'image' => '/assets/images/courses/health-social/ncfe-level-2-early-years.png',
        'overview' => 'Provides learners with the knowledge and skills required to work with children from birth to 5 years and up to 7 years. Ideal for those starting a career in nurseries or pre-schools.',
        'curriculum' => [
            'Roles and responsibilities of the early years practitioner',
            'Health and safety of babies and young children',
            'Equality, diversity and inclusive practice',
            'Safeguarding, protection and welfare of babies and young children'
        ],
        'reviews' => []
    ],
    'ncfe-level-3-adult-care' => [
        'id' => 'ncfe-level-3-adult-care',
        'title' => 'Level 3 Diploma in Adult Care',
        'category' => 'Health & Social Care',
        'price' => 495,
        'old_price' => 795,
        'monthly_price' => 49,
        'students' => 600,
        'badge' => 'ADVANCED',
        'badge_color' => '#D69E2E',
        'icon' => '🏥',
        'image' => '/assets/images/courses/health-social/ncfe-level-3-adult-care.png',
        'overview' => 'For those working in lead adult care roles. This qualification develops the knowledge and skills required to work in a senior capacity, often supervising others.',
        'curriculum' => [
            'Promote personal development in care settings',
            'Promote equality and inclusion in care settings',
            'Promote communication in care settings',
            'Promote health, safety and wellbeing in care settings'
        ],
        'reviews' => []
    ],
    'ncfe-level-5-adult-care' => [
        'id' => 'ncfe-level-5-adult-care',
        'title' => 'Level 5 Diploma in Leadership and Management for Adult Care',
        'category' => 'Health & Social Care',
        'price' => 995,
        'old_price' => 1495,
        'monthly_price' => 95,
        'students' => 120,
        'badge' => 'MANAGEMENT',
        'badge_color' => '#805AD5',
        'icon' => '👔',
        'image' => '/assets/images/courses/health-social/ncfe-level-5-adult-care.png',
        'overview' => 'A comprehensive qualification for those managing an adult care service. Covers leadership, governance, regulatory compliance, and strategic management.',
        'curriculum' => [
            'Leadership and management in adult care',
            'Governance and regulatory processes',
            'Communication and information management',
            'Decision making in adult care'
        ],
        'reviews' => []
    ],
    'level-5-residential-childcare' => [
        'id' => 'level-5-residential-childcare',
        'title' => 'Level 5 Diploma in Leadership and Management for Residential Childcare (England)',
        'category' => 'Health & Social Care',
        'price' => 1050,
        'old_price' => 1550,
        'monthly_price' => 105,
        'students' => 85,
        'badge' => 'MANAGEMENT',
        'badge_color' => '#805AD5',
        'icon' => '🏠',
        'image' => '/assets/images/courses/health-social/level-5-residential-childcare.png',
        'overview' => 'Designed for those managing residential childcare settings. This qualification covers leading and managing a service, ensuring positive outcomes for children and young people.',
        'curriculum' => [
            'Leading and managing a residential childcare setting',
            'Leading and supporting children and young people',
            'Leading practice to support the safeguarding of children',
            'Managing risk and legal compliance'
        ],
        'reviews' => []
    ],

    // --- OCCUPATIONAL STUDIES ---
    'occ-studies-cert' => [
        'id' => 'occ-studies-cert',
        'title' => 'Certificate in Occupational Studies for the Workplace',
        'category' => 'Occupational Studies',
        'price' => 250,
        'old_price' => 350,
        'monthly_price' => 25,
        'students' => 200,
        'badge' => 'WORKPLACE',
        'badge_color' => '#319795',
        'icon' => '🛠️',
        'image' => '/assets/images/courses/occupational/occ-studies-cert.png',
        'overview' => 'Intended to give learners a solid base from which to further develop their skills and learning. Prepares learners for work through real or simulated work situations.',
        'curriculum' => [
            'Building confidence for the workplace',
            'Understand how to work in a team',
            'Health and safety in the workplace'
        ],
        'reviews' => []
    ],
    'occ-studies-diploma' => [
        'id' => 'occ-studies-diploma',
        'title' => 'Diploma in Occupational Studies for the Workplace',
        'category' => 'Occupational Studies',
        'price' => 350,
        'old_price' => 495,
        'monthly_price' => 35,
        'students' => 150,
        'badge' => 'WORKPLACE',
        'badge_color' => '#319795',
        'icon' => '🏗️',
        'image' => '/assets/images/courses/occupational/occ-studies-diploma.png',
        'overview' => 'A comprehensive qualification providing a range of practical skills and knowledge for the workplace. Ideal for learners seeking to enter a specific vocational area.',
        'curriculum' => [
            'Workplace Preparation',
            'Occupational Skills Development',
            'Effective Communication',
            'Problem Solving at Work'
        ],
        'reviews' => []
    ],
    'level-2-occ-studies' => [
        'id' => 'level-2-occ-studies',
        'title' => 'Level 2 Certificate in Occupational Studies for the Workplace',
        'category' => 'Occupational Studies',
        'price' => 295,
        'old_price' => 450,
        'monthly_price' => 29,
        'students' => 180,
        'badge' => 'LEVEL 2',
        'badge_color' => '#319795',
        'icon' => '⚒️',
        'image' => '/assets/images/courses/occupational/level-2-occ-studies.png',
        'overview' => 'Progression from the Level 1 certificate, this course offers more in-depth knowledge and practical skills for the modern workplace.',
        'curriculum' => [
            'Advanced Workplace Skills',
            'Team Leadership Basics',
            'Vocational Specific Components'
        ],
        'reviews' => []
    ],
    'personal-dev-cert' => [
        'id' => 'personal-dev-cert',
        'title' => 'Certificate in Personal Development for Employability (RQF)',
        'category' => 'Occupational Studies',
        'price' => 220,
        'old_price' => 350,
        'monthly_price' => 22,
        'students' => 300,
        'badge' => 'EMPLOYABILITY',
        'badge_color' => '#ED8936',
        'icon' => '🚀',
        'image' => '/assets/images/courses/occupational/personal-dev-cert.png',
        'overview' => 'Designed to help learners develop the personal and social skills needed for employment. Covers confidence building, job searching, and interview techniques.',
        'curriculum' => [
            'Self-Assessment',
            'Career Planning',
            'Preparing for an Interview',
            'Searching for a Job'
        ],
        'reviews' => []
    ],
    'personal-dev-diploma' => [
        'id' => 'personal-dev-diploma',
        'title' => 'Diploma in Personal Development for Employability (RQF)',
        'category' => 'Occupational Studies',
        'price' => 320,
        'old_price' => 450,
        'monthly_price' => 32,
        'students' => 250,
        'badge' => 'EMPLOYABILITY',
        'badge_color' => '#ED8936',
        'icon' => '🌟',
        'image' => '/assets/images/courses/occupational/personal-dev-diploma.png',
        'overview' => 'An extensive course covering personal development and employability skills. Included extended modules on workplace behaviors and communication.',
        'curriculum' => [
            'Effective Communication',
            'Working as part of a team',
            'Managing personal finance',
            'Rights and responsibilities in the workplace'
        ],
        'reviews' => []
    ],
    'work-related-cert' => [
        'id' => 'work-related-cert',
        'title' => 'Certificate in Work-Related Studies for the Customer Service Sector (RQF)',
        'category' => 'Occupational Studies',
        'price' => 250,
        'old_price' => 395,
        'monthly_price' => 25,
        'students' => 190,
        'badge' => 'CUSTOMER SERVICE',
        'badge_color' => '#4299E1',
        'icon' => '📞',
        'image' => '/assets/images/courses/occupational/work-related-cert.png',
        'overview' => 'Prepares learners for work in the customer service sector. Covers the basics of customer interactions and service delivery.',
        'curriculum' => [
            'Principles of Customer Service',
            'Communication with Customers',
            'Handling Customer Complaints'
        ],
        'reviews' => []
    ],
    'work-related-diploma' => [
        'id' => 'work-related-diploma',
        'title' => 'Diploma in Work-Related Studies for the Customer Service Sector (RQF)',
        'category' => 'Occupational Studies',
        'price' => 350,
        'old_price' => 495,
        'monthly_price' => 35,
        'students' => 140,
        'badge' => 'CUSTOMER SERVICE',
        'badge_color' => '#4299E1',
        'icon' => '🎧',
        'image' => '/assets/images/courses/occupational/work-related-diploma.png',
        'overview' => 'A comprehensive qualification for those wishing to pursue a career in customer service. Includes advanced modules on service standards and customer relationship management.',
        'curriculum' => [
            'Delivering Reliable Customer Service',
            'Understanding Customer Needs',
            'Dealing with Difficult Situations',
            'Processing Customer Info'
        ],
        'reviews' => []
    ],
    'health-safety-award' => [
        'id' => 'health-safety-award',
        'title' => 'Award in the Principles of Health and Safety within the Workplace (RQF)',
        'category' => 'Occupational Studies',
        'price' => 120,
        'old_price' => 200,
        'monthly_price' => 12,
        'students' => 800,
        'badge' => 'SAFETY',
        'badge_color' => '#E53E3E',
        'icon' => '🦺',
        'image' => '/assets/images/courses/occupational/health-safety-award.png',
        'overview' => 'Essential healthy and safety knowledge for any workplace. Covers risk assessment, manual handling, and legal responsibilities.',
        'curriculum' => [
            'Introduction to Health and Safety',
            'Workplace Hazards and Risks',
            'Workplace Conditions',
            'Health and Safety Procedures'
        ],
        'reviews' => []
    ],

    // --- FUNCTIONAL SKILLS ---
    'functional-maths-level-1' => [
        'id' => 'functional-maths-level-1',
        'title' => 'Level 1 Functional Skills Qualification in Mathematics',
        'category' => 'Functional Skills',
        'price' => 195,
        'old_price' => 295,
        'monthly_price' => 19,
        'students' => 2200,
        'badge' => 'MATHS',
        'badge_color' => '#3182CE',
        'icon' => '➗',
        'image' => '/assets/images/courses/functional-skills/functional-maths-level-1.png',
        'overview' => 'Develop practical, transferable skills in Mathematics to work confidently, effectively, and independently in life. Suitable for a wide range of learners.',
        'curriculum' => [
            'Using numbers and the number system',
            'Using common measures, shape and space',
            'Handling information and data'
        ],
        'reviews' => []
    ],
    'functional-maths-level-2' => [
        'id' => 'functional-maths-level-2',
        'title' => 'Level 2 Functional Skills Qualification in Mathematics',
        'category' => 'Functional Skills',
        'price' => 195,
        'old_price' => 295,
        'monthly_price' => 19,
        'students' => 2500,
        'badge' => 'MATHS',
        'badge_color' => '#3182CE',
        'icon' => '📐',
        'image' => '/assets/images/courses/functional-skills/functional-maths-level-2.png',
        'overview' => 'Equivalent to a GCSE Grade 4 (C). This qualification provides the skills needed for further education and employment. Essential for many university applications and job roles.',
        'curriculum' => [
            'Data Handling and Statistics',
            'Fractions, Decimals and Percentages',
            'Formulae and Equations',
            'Geometry and Measure'
        ],
        'reviews' => []
    ],
    'functional-english-level-1' => [
        'id' => 'functional-english-level-1',
        'title' => 'Level 1 Functional Skills Qualification in English',
        'category' => 'Functional Skills',
        'price' => 195,
        'old_price' => 295,
        'monthly_price' => 19,
        'students' => 1800,
        'badge' => 'ENGLISH',
        'badge_color' => '#DD6B20',
        'icon' => '📖',
        'image' => '/assets/images/courses/functional-skills/functional-english-level-1.png',
        'overview' => 'Improve your reading, writing, and communication skills. This course gives you the confidence to apply English skills in work and everyday life.',
        'curriculum' => [
            'Reading',
            'Writing',
            'Speaking, Listening and Communicating'
        ],
        'reviews' => []
    ],
    'functional-english-level-2' => [
        'id' => 'functional-english-level-2',
        'title' => 'Level 2 Functional Skills Qualification in English',
        'category' => 'Functional Skills',
        'price' => 195,
        'old_price' => 295,
        'monthly_price' => 19,
        'students' => 2100,
        'badge' => 'ENGLISH',
        'badge_color' => '#DD6B20',
        'icon' => '✍️',
        'image' => '/assets/images/courses/functional-skills/functional-english-level-2.png',
        'overview' => 'Equivalent to a GCSE Grade 4 (C). Demonstrates the ability to read, write, speak, listen, and communicate in English. Required for many higher education courses.',
        'curriculum' => [
            'Reading for Information',
            'Writing for Different Purposes',
            'Speaking, Listening and Communicating'
        ],
        'reviews' => []
    ],

    // --- SECURITY & STEWARDING ---
    'first-aid-level-3' => [
        'id' => 'first-aid-level-3',
        'title' => 'Level 3 Award in Emergency First Aid at Work (RQF)',
        'category' => 'Security & Stewarding',
        'price' => 120,
        'old_price' => 180,
        'monthly_price' => 0,
        'students' => 3000,
        'badge' => 'SAFETY',
        'badge_color' => '#E53E3E',
        'icon' => '🚑',
        'image' => '/assets/images/courses/security/first-aid-level-3.png',
        'overview' => 'A one-day course covering the essentials of emergency first aid in the workplace. Meets HSE requirements for low-risk workplaces.',
        'curriculum' => [
            'Roles and responsibilities of a first aider',
            'Assessing an incident',
            'Managing an unresponsive casualty',
            'Wounds and bleeding'
        ],
        'reviews' => []
    ],
    'door-supervisor-level-2' => [
        'id' => 'door-supervisor-level-2',
        'title' => 'Level 2 Award for Door Supervisors in the Private Security Industry',
        'category' => 'Security & Stewarding',
        'price' => 220,
        'old_price' => 350,
        'monthly_price' => 22,
        'students' => 2100,
        'badge' => 'LICENSE',
        'badge_color' => '#2A4365',
        'icon' => '🛡️',
        'image' => '/assets/images/courses/security/door-supervisor-level-2.png',
        'overview' => 'The standard qualification required to apply for an SIA Door Supervisor license. Covers legal aspects, physical intervention, and conflict management.',
        'curriculum' => [
            'Working in the Private Security Industry',
            'Working as a Door Supervisor',
            'Conflict Management',
            'Physical Intervention Skills'
        ],
        'reviews' => []
    ],
    'spectator-safety-level-2' => [
        'id' => 'spectator-safety-level-2',
        'title' => 'Level 2 Certificate in Spectator Safety (RQF)',
        'category' => 'Security & Stewarding',
        'price' => 195,
        'old_price' => 295,
        'monthly_price' => 19,
        'students' => 1500,
        'badge' => 'STEWARDING',
        'badge_color' => '#2A4365',
        'icon' => '🏟️',
        'image' => '/assets/images/courses/security/spectator-safety-level-2.png',
        'overview' => 'Required for working as a steward at sports grounds and events. Covers crowd control, health and safety, and dealing with accidents and emergencies.',
        'curriculum' => [
            'Prepare for spectator events',
            'Control the entry, exit and movement of people',
            'Monitor spectators',
            'Deal with crowd problems'
        ],
        'reviews' => []
    ],
    'spectator-safety-level-4' => [
        'id' => 'spectator-safety-level-4',
        'title' => 'Level 4 Diploma in Spectator Safety Management (RQF)',
        'category' => 'Security & Stewarding',
        'price' => 650,
        'old_price' => 895,
        'monthly_price' => 65,
        'students' => 60,
        'badge' => 'MANAGEMENT',
        'badge_color' => '#2A4365',
        'icon' => '📋',
        'image' => '/assets/images/courses/security/spectator-safety-level-4.png',
        'overview' => 'A qualification for Safety Officers and Senior Stewards. Focuses on the planning and management of spectator safety at events.',
        'curriculum' => [
            'Plan for the safety of people at a spectator event',
            'Manage the safety of people at a spectator event',
            'Develop and manage stewarding resources',
            'Manage info for decision making'
        ],
        'reviews' => []
    ],
    'event-security-level-2' => [
        'id' => 'event-security-level-2',
        'title' => 'Level 2 Certificate in Event Security Operations (RQF)',
        'category' => 'Security & Stewarding',
        'price' => 220,
        'old_price' => 350,
        'monthly_price' => 22,
        'students' => 500,
        'badge' => 'SECURITY',
        'badge_color' => '#2A4365',
        'icon' => '🎟️',
        'image' => '/assets/images/courses/security/event-security-level-2.png',
        'overview' => 'Specific training for security operatives working at events and festivals. Covers searching, patrolling, and controlling entry/exit points.',
        'curriculum' => [
            'Event Security Guidelines',
            'Crowd Management',
            'Patrolling and Searching',
            'Customer Service in Security'
        ],
        'reviews' => []
    ],

    // --- BUSINESS STUDIES ---
    'team-leading-cert' => [
        'id' => 'team-leading-cert',
        'title' => 'Certificate in Team Leading Principles (RQF)',
        'category' => 'Business Studies',
        'price' => 295,
        'old_price' => 450,
        'monthly_price' => 29,
        'students' => 560,
        'badge' => 'LEADERSHIP',
        'badge_color' => '#D69E2E',
        'icon' => '💼',
        'image' => '/assets/images/courses/business/team-leading-cert.png',
        'overview' => 'Ideal for new or aspiring team leaders. This course develops the skills needed to lead a team effectively, including communication, coaching, and managing performance.',
        'curriculum' => [
            'Principles of Team Leading',
            'Understanding Business',
            'Communication in the Workplace',
            'Coaching and Mentoring'
        ],
        'reviews' => []
    ]
];

function getCourse($id)
{
    return COURSES_DATA[$id] ?? null;
}

function getAllCourses()
{
    return COURSES_DATA;
}
