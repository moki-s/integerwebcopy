<?php
// Course Data Definitions
// Scraped from integertraining.com and integer.co.uk

const COURSES_DATA = [
    // --- ACCOUNTING (AAT) ---
    'aat-level-2-accounting' => [
        'id' => 'aat-level-2-accounting',
        'title' => 'AAT Level 2 Certificate in Accounting',
        'category' => 'Accounting',
        'price' => 295,
        'old_price' => 595,
        'monthly_price' => 29,
        'students' => 1250,
        'badge' => 'ENTRY LEVEL',
        'badge_color' => '#2F855A',
        'icon' => '📊',
        'overview' => 'The AAT Level 2 Certificate in Accounting is your gateway to a career in finance. This practical course covers all the foundational aspects of accounting, from bookkeeping and costing to mastering software and understanding business environments. Designed with flexibility in mind, this qualification suits both beginners and those looking to refresh their financial knowledge.',
        'curriculum' => [
            'Introduction to Bookkeeping',
            'Principles of Bookkeeping Controls',
            'Principles of Costing',
            'The Business Environment'
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
        'overview' => 'A short, sharp qualification that delivers the essential skills for manual and digital bookkeeping. Perfect for those who want to focus specifically on bookkeeping roles or run their own small business finances.',
        'curriculum' => [
            'Introduction to Bookkeeping',
            'Principles of Bookkeeping Controls'
        ]
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
        'overview' => 'Master complex financial processes, including final accounts, reports, and returns. This advanced diploma represents the next step for accounting professionals, covering indirect tax, management accounting, and financial accounting.',
        'curriculum' => [
            'Business Awareness',
            'Financial Accounting: Preparing Financial Statements',
            'Management Accounting Techniques',
            'Tax Processes for Businesses'
        ]
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
        'overview' => 'Develop advanced bookkeeping skills needed for senior roles. Learn to prepare financial statements for sole traders and partnerships, and understand the VAT system.',
        'curriculum' => [
            'Financial Accounting: Preparing Financial Statements',
            'Tax Processes for Businesses'
        ]
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
        'overview' => 'The highest level of AAT qualification. Become a fully qualified accounting technician. This course covers complex accounting tasks including drafting financial statements, managing budgets, and evaluating financial performance.',
        'curriculum' => [
            'Applied Management Accounting',
            'Drafting and Interpreting Financial Statements',
            'Internal Accounting Systems and Controls',
            'Credit Management (Optional)',
            'Cash and Treasury Management (Optional)'
        ]
    ],

    // --- HEALTH & SOCIAL CARE ---
    'ncfe-level-2-early-years' => [
        'id' => 'ncfe-level-2-early-years',
        'title' => 'NCFE Level 2 Diploma for the Early Years Practitioner',
        'category' => 'Health & Social Care',
        'price' => 395,
        'old_price' => 650,
        'monthly_price' => 39,
        'students' => 450,
        'badge' => 'PRACTITIONER',
        'badge_color' => '#38B2AC',
        'icon' => '🧸',
        'overview' => 'Provides learners with the knowledge and skills required to work with children from birth to 5 years and up to 7 years. Ideal for those starting a career in nurseries or pre-schools.',
        'curriculum' => [
            'Roles and responsibilities of the early years practitioner',
            'Health and safety of babies and young children',
            'Equality, diversity and inclusive practice',
            'Safeguarding, protection and welfare of babies and young children'
        ]
    ],
    'ncfe-level-2-care' => [
        'id' => 'ncfe-level-2-care',
        'title' => 'NCFE Level 2 Diploma in Care',
        'category' => 'Health & Social Care',
        'price' => 395,
        'old_price' => 650,
        'monthly_price' => 39,
        'students' => 300,
        'badge' => 'CARE',
        'badge_color' => '#38B2AC',
        'icon' => '🩺',
        'overview' => 'The NCFE CACHE Level 2 Diploma in Care is the standard qualification for those working in adult care settings in England. It confirms occupational competence for roles such as Adult Care Worker or Healthcare Assistant.',
        'curriculum' => [
            'Communication in care settings',
            'Handle information in care settings',
            'Personal development in care settings',
            'Implement person-centred approaches'
        ]
    ],
    'ncfe-level-3-adult-care' => [
        'id' => 'ncfe-level-3-adult-care',
        'title' => 'NCFE Level 3 Diploma in Adult Care',
        'category' => 'Health & Social Care',
        'price' => 495,
        'old_price' => 795,
        'monthly_price' => 49,
        'students' => 600,
        'badge' => 'ADVANCED',
        'badge_color' => '#D69E2E',
        'icon' => '🏥',
        'overview' => 'For those working in lead adult care roles. This qualification develops the knowledge and skills required to work in a senior capacity, often supervising others.',
        'curriculum' => [
            'Promote personal development in care settings',
            'Promote equality and inclusion in care settings',
            'Promote communication in care settings',
            'Promote health, safety and wellbeing in care settings'
        ]
    ],
    'ncfe-level-5-adult-care' => [
        'id' => 'ncfe-level-5-adult-care',
        'title' => 'NCFE Level 5 Diploma in Leadership for Adult Care',
        'category' => 'Health & Social Care',
        'price' => 995,
        'old_price' => 1495,
        'monthly_price' => 95,
        'students' => 120,
        'badge' => 'MANAGEMENT',
        'badge_color' => '#805AD5',
        'icon' => '👔',
        'overview' => 'A comprehensive qualification for those managing an adult care service. Covers leadership, governance, regulatory compliance, and strategic management.',
        'curriculum' => [
            'Leadership and management in adult care',
            'Governance and regulatory processes',
            'Communication and information management',
            'Decision making in adult care'
        ]
    ],

    // --- SECURITY & STEWARDING ---
    'highfield-door-supervisor' => [
        'id' => 'highfield-door-supervisor',
        'title' => 'Level 2 Award for Door Supervisors',
        'category' => 'Security',
        'price' => 220,
        'old_price' => 350,
        'monthly_price' => 22,
        'students' => 2100,
        'badge' => 'LICENSE',
        'badge_color' => '#DD6B20',
        'icon' => '🛡️',
        'overview' => 'The standard qualification required to apply for an SIA Door Supervisor license. Covers legal aspects, physical intervention, and conflict management.',
        'curriculum' => [
            'Working in the Private Security Industry',
            'Working as a Door Supervisor',
            'Conflict Management',
            'Physical Intervention Skills'
        ]
    ],
    'highfield-level-2-spectator' => [
        'id' => 'highfield-level-2-spectator',
        'title' => 'Level 2 Certificate in Spectator Safety',
        'category' => 'Security',
        'price' => 195,
        'old_price' => 295,
        'monthly_price' => 19,
        'students' => 1500,
        'badge' => 'STEWARDING',
        'badge_color' => '#DD6B20',
        'icon' => '🏟️',
        'overview' => 'Required for working as a steward at sports grounds and events. Covers crowd control, health and safety, and dealing with accidents and emergencies.',
        'curriculum' => [
            'Prepare for spectator events',
            'Control the entry, exit and movement of people',
            'Monitor spectators and deal with crowd problems',
            'Support the work of the team and organization'
        ]
    ],
    'highfield-level-3-first-aid' => [
        'id' => 'highfield-level-3-first-aid',
        'title' => 'Level 3 Award in Emergency First Aid at Work',
        'category' => 'Security',
        'price' => 120,
        'old_price' => 180,
        'monthly_price' => 0, // usually one-off
        'students' => 3000,
        'badge' => 'SAFETY',
        'badge_color' => '#E53E3E',
        'icon' => '🚑',
        'overview' => 'A one-day course covering the essentials of emergency first aid in the workplace. Meets HSE requirements for low-risk workplaces.',
        'curriculum' => [
            'Roles and responsibilities of a first aider',
            'Assessing an incident',
            'Managing an unresponsive casualty',
            'CPR and AED use',
            'Wounds and bleeding'
        ]
    ],

    // --- BUSINESS ---
    'business-admin-level-3' => [
        'id' => 'business-admin-level-3',
        'title' => 'Business Admin Level 3',
        'category' => 'Business',
        'price' => 350,
        'old_price' => 450,
        'monthly_price' => 35,
        'students' => 560,
        'badge' => 'INTERMEDIATE',
        'badge_color' => '#D69E2E',
        'icon' => '💼',
        'overview' => 'Develop the advanced administrative skills needed for senior roles. This Level 3 course covers business communication, resource management, and principles of business administration.',
        'curriculum' => [
            'Principles of Business Administration',
            'Managing Personal and Professional Development',
            'Communication in a Business Environment',
            'Principles of Business Data and Information'
        ]
    ],
    'customer-service-level-2' => [
        'id' => 'customer-service-level-2',
        'title' => 'Level 2 Certificate in Customer Service',
        'category' => 'Business',
        'price' => 295,
        'old_price' => 450,
        'monthly_price' => 29,
        'students' => 400,
        'badge' => 'SERVICE',
        'badge_color' => '#38B2AC',
        'icon' => '🎧',
        'overview' => 'Improve your customer service skills with this nationally recognized qualification. Learn how to communicate effectively, deal with customer queries, and deliver a great customer experience.',
        'curriculum' => [
            'Delivery of customer service',
            'Understand the customer service environment',
            'Communication in customer service',
            'Principles of customer service'
        ]
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
