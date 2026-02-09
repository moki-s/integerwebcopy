<?php
// Information Pages View (About, Policies, etc.)

// Determine active section based on query param or route
// For now, we assume $section is passed from the controller/router, or default to 'history'
$section = $section ?? 'history';


$sidebarLinks = [
    'history' => 'Our History',
    'beliefs' => 'Our Beliefs',
    'accreditations' => 'Our Accreditations',
    'policies' => 'Policies',
    'iag' => 'Information Advice and Guidance',
    'learner-support' => 'Learner Support',
    'privacy' => 'Privacy Policy',
    'quality' => 'Quality Assurance'
];
?>

<div class="about-hero" style="background-color: var(--color-primary-navy); color: white; padding: 4rem 0;">
    <div class="container" style="text-align: center;">
        <h1 style="margin: 0; font-size: 2.5rem;"><?php echo $sidebarLinks[$section] ?? 'About Us'; ?></h1>
        <p style="opacity: 0.9; margin-top: 1rem; max-width: 600px; margin-left: auto; margin-right: auto;">
            Integer Training Information Center
        </p>
    </div>
</div>

<div class="container about-layout" style="padding: 4rem 1rem;">
    <div class="about-grid" style="display: grid; grid-template-columns: 280px 1fr; gap: 3rem; align-items: start;">

        <!-- Mobile Menu Toggle (hidden on desktop) -->
        <button class="mobile-filter-toggle" onclick="document.getElementById('aboutSidebar').classList.toggle('open')" style="grid-column: 1 / -1;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            Menu
        </button>

        <!-- Sidebar Navigation -->
        <aside id="aboutSidebar" class="about-sidebar" style="background: white; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 1rem 1.5rem; background: #f8f9fa; border-bottom: 1px solid #eee; font-weight: 600; color: var(--color-primary-navy);">
                Menu
            </div>
            <nav>
                <?php foreach ($sidebarLinks as $key => $label): ?>
                    <a href="/about?section=<?php echo $key; ?>" 
                       style="display: block; padding: 1rem 1.5rem; color: <?php echo $section === $key ? 'white' : '#555'; ?>; background: <?php echo $section === $key ? 'var(--color-primary-navy)' : 'transparent'; ?>; text-decoration: none; border-bottom: 1px solid #eee;">
                        <?php echo $label; ?>
                    </a>
                <?php
endforeach; ?>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <div style="background: white; padding: 2rem; border-radius: 8px; border: 1px solid #eee;">
            
            <?php if ($section === 'history'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Our History</h2>
                <p style="line-height: 1.8; margin-bottom: 2rem; color: #555;">
                    Integer is an independent training and development company founded in Bude, Cornwall in 1989. Over the past 30+ years we have built a reputation as a quality provider of training services in our niche areas.
                </p>
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin-top: 0; color: var(--color-primary-navy); font-size: 1.1rem;">Our Specialist Areas</h3>
                    <ul style="margin-bottom: 0; padding-left: 1.5rem; color: #555;">
                        <li>Stewarding and security</li>
                        <li>Health & social care</li>
                        <li>Employability and personal development</li>
                        <li>Fitness and outdoor programmes</li>
                    </ul>
                </div>
                <p style="line-height: 1.8; color: #555;">
                    We deliver many of these programmes in collaboration with the Education & Skills Funding Agency and/or funding partners to provide the benefit of funding for eligible learners.
                </p>

            <?php
elseif ($section === 'beliefs'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Our Beliefs</h2>
                
                <div style="margin-bottom: 2.5rem;">
                    <h3 style="color: var(--color-accent-teal);">Our Vision</h3>
                    <p style="font-size: 1.25rem; font-weight: 500; font-family: var(--font-heading); color: var(--color-primary-navy);">
                        To be a leading Institution for training and development.
                    </p>
                </div>

                <div style="margin-bottom: 2.5rem;">
                    <h3 style="color: var(--color-accent-teal);">Our Mission</h3>
                    <div style="background: #e0f2f1; padding: 1.5rem; border-left: 4px solid var(--color-accent-teal); font-style: italic; font-size: 1.1rem; color: #00695c;">
                        “The highest quality training and development for all”
                    </div>
                </div>

                <div style="margin-bottom: 2.5rem;">
                    <h3 style="color: var(--color-accent-teal);">Our Motto</h3>
                    <p style="color: #555; line-height: 1.7;">
                        To work in partnership with like-minded organisations and individuals who share our values, operating as a ‘virtual’ academy or agency via an administrative hub and spoke structure, for networking and outreach provision.
                    </p>
                    <p style="color: #555; line-height: 1.7;">
                        This approach develops teams of professionals delivering and supporting a range of vocationally orientated courses and business development solutions which are internationally recognised for their standards of excellence and become first choice for our clients.
                    </p>
                </div>

                <div>
                    <h3 style="color: var(--color-accent-teal);">Our Values</h3>
                    <blockquote style="color: #666; margin-bottom: 1.5rem; font-style: italic;">
                        “A balance between awareness, respect, and love, for one’s self, others, and the environment.” – ref: Colin Mortlock & Beyond Adventure.
                    </blockquote>
                    <ul style="color: #555; line-height: 1.7; padding-left: 1.5rem;">
                        <li style="margin-bottom: 0.5rem;">We believe in a team approach with a commitment to improvement.</li>
                        <li style="margin-bottom: 0.5rem;">We aim to be the first choice for our employees, clients and business partners.</li>
                        <li style="margin-bottom: 0.5rem;">We aim to grow profitability and sustain improved value all year round.</li>
                        <li style="margin-bottom: 0.5rem;">We share responsibility for pursuing the company’s vision.</li>
                        <li style="margin-bottom: 0.5rem;">Work together as a team and in teams.</li>
                        <li style="margin-bottom: 0.5rem;">Communicate openly and honestly – sharing knowledge, listening as well as telling, explaining who as well as what.</li>
                        <li style="margin-bottom: 0.5rem;">Value each other’s contributions, are quick to praise achievement and slow to blame.</li>
                        <li style="margin-bottom: 0.5rem;">Give and ask for help without hesitating.</li>
                        <li style="margin-bottom: 0.5rem;">Take great pride in not letting others down.</li>
                        <li style="margin-bottom: 0.5rem;">Treat each other fairly, with respect and consideration, recognizing the importance of an individual’s well being in all respects of our working and non-working lives.</li>
                        <li style="margin-bottom: 0.5rem;">Seek to delegate authority to those who do the job and accept accountability for those things for which we are responsible.</li>
                    </ul>
                </div>

            <?php
elseif ($section === 'accreditations'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Our Accreditations</h2>
                
                <h3 style="color: var(--color-primary-navy); font-size: 1.2rem;">Integer – Bespoke and Accredited courses</h3>
                <p style="line-height: 1.7; color: #555; margin-bottom: 1.5rem;">
                    Integer has been writing and developing training courses in response to clients’ specific requirements for more than 25 years. Sometimes, these ‘customised’ courses are submitted to QCA (Qualifications Curriculum Authority) for approval in conjunction with a nationally recognised awarding body (such as for example, the NCFE Certificate in Event Marshalling) but in the main, candidates that successfully complete these ‘customised’ courses will receive an Integer Certificate of Achievement.
                </p>

                <h3 style="color: var(--color-primary-navy); font-size: 1.2rem; margin-top: 2rem;">National Awarding Organisations</h3>
                <p style="line-height: 1.7; color: #555; margin-bottom: 2rem;">
                    Integer Training is also fully approved and accredited by the awarding bodies below:
                </p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; align-items: center; text-align: center;">
                    <div style="padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
                        <span style="font-weight: 800; font-size: 1.5rem; color: #66cc33;">aat</span>
                        <div style="font-size: 0.8rem; color: #333; font-weight: bold;">Approved</div>
                    </div>
                    <div style="padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
                        <span style="font-weight: 800; font-size: 1.2rem; color: #0099cc;">Highfield</span>
                        <div style="font-size: 0.7rem; color: #666; font-style: italic;">Qualifications</div>
                    </div>
                    <div style="padding: 1rem; border: 1px solid #eee; border-radius: 8px; background: #333; color: white;">
                        <span style="font-weight: 800; font-size: 1.5rem;">NCFE</span>
                    </div>
                    <div style="padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
                        <span style="font-weight: 800; font-size: 1.5rem; background: linear-gradient(to right, #0099cc, #cc3399); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">athe</span>
                        <div style="font-size: 0.6rem; color: #666; text-transform: uppercase;">Awards for Training<br>and Higher Education</div>
                    </div>
                </div>

            <?php
elseif ($section === 'policies'): ?>
                <style>
                    .policy-card {
                        background: white;
                        border: 1px solid #eee;
                        border-radius: 8px;
                        padding: 1.25rem 1.5rem;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                        text-decoration: none;
                        color: inherit;
                    }
                    .policy-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(0,0,0,0.08);
                        border-color: var(--color-accent-teal);
                    }
                    .policy-card:hover .policy-icon {
                        background: var(--color-accent-teal);
                    }
                    .policy-card:hover .policy-icon svg {
                        stroke: white;
                    }
                    .policy-card:hover .policy-arrow {
                        transform: translateX(3px);
                        color: var(--color-accent-teal);
                    }
                    .policy-icon {
                        width: 44px;
                        height: 44px;
                        border-radius: 10px;
                        background: #f0f4f8;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        transition: background 0.2s ease;
                    }
                    .policy-icon svg {
                        width: 22px;
                        height: 22px;
                        stroke: var(--color-primary-navy);
                        transition: stroke 0.2s ease;
                    }
                    .policy-info {
                        flex: 1;
                        min-width: 0;
                    }
                    .policy-info h4 {
                        margin: 0;
                        color: var(--color-primary-navy);
                        font-size: 0.92rem;
                        font-weight: 600;
                        line-height: 1.3;
                    }
                    .policy-info span {
                        font-size: 0.78rem;
                        color: #999;
                        text-transform: uppercase;
                        letter-spacing: 0.03em;
                    }
                    .policy-arrow {
                        color: #ccc;
                        flex-shrink: 0;
                        transition: transform 0.2s ease, color 0.2s ease;
                    }
                    .policy-section-label {
                        font-size: 0.75rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                        color: #999;
                        margin-bottom: 0.75rem;
                        padding-bottom: 0.5rem;
                        border-bottom: 1px solid #eee;
                    }
                </style>

                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Policies & Certificates</h2>
                <p style="line-height: 1.7; color: #555; margin-bottom: 2.5rem;">
                    Integer Training is committed to maintaining the highest standards across all areas of our operation. Our policies and certificates are available below for your reference.
                </p>

                <!-- Governance & Compliance -->
                <div class="policy-section-label">Governance & Compliance</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <a href="/assets/policies/equality-diversity-inclusion.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Equality, Diversity & Inclusion Policy</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/complaints-appeals.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Complaints & Appeals Policy</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/grievance-disciplinary.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Grievance & Disciplinary Procedure</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/whistle-blowing.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Whistle Blowing Policy</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                </div>

                <!-- Safety & Protection -->
                <div class="policy-section-label">Safety & Protection</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <a href="/assets/policies/health-safety.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Health & Safety Policy</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/safeguarding.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Safeguarding of Children & Vulnerable Adults</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/business-continuity.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Business Continuity Policy</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/carbon-reduction-plan.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Carbon Reduction Plan</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                </div>

                <!-- Data & Privacy -->
                <div class="policy-section-label">Data & Privacy</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <a href="/assets/policies/data-protection.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Data Protection & Procedure Policy</h4>
                            <span>PDF Document</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                </div>

                <!-- Certificates & Accreditations -->
                <div class="policy-section-label">Certificates & Accreditations</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <a href="/assets/policies/pi-el-pl-certificate.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon" style="background: #e0f2f1;">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" style="stroke: var(--color-accent-teal);"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>PI, EL & PL Certificate</h4>
                            <span>Certificate</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                    <a href="/assets/policies/matrix-certificate-2024.pdf" target="_blank" class="policy-card">
                        <div class="policy-icon" style="background: #e0f2f1;">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" style="stroke: var(--color-accent-teal);"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>
                        </div>
                        <div class="policy-info">
                            <h4>Integer Training 2024 Matrix Certificate</h4>
                            <span>Certificate</span>
                        </div>
                        <div class="policy-arrow"><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></div>
                    </a>
                </div>

            <?php
elseif ($section === 'iag'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Information Advice and Guidance (IAG)</h2>
                
                <div style="background: #e0e7ff; padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h3 style="color: var(--color-primary-navy); margin-top: 0;">Guidance Team</h3>
                    <p style="color: #555; line-height: 1.7;">
                        The Guidance Team offers information, advice and guidance on all matters relating to your training and on practical and emotional issues affecting you as a learner.
                    </p>
                    <p style="color: #555; line-height: 1.7;">
                        We offer a confidential service prior to your training, during your training and after you have completed your training to assist you with your planning, learning process, and post course outcomes and destination. 
                    </p>
                    <p style="color: #555; line-height: 1.7; font-weight: 500;">
                        We can be contacted Monday to Thursday, between 9am and 5pm, and on Friday 9am – 12.30pm on <a href="tel:01288356263">01288 356263</a>, or by email to <a href="mailto:jacky@integer.co.uk">jacky@integer.co.uk</a> or <a href="mailto:sarah@integer.co.uk">sarah@integer.co.uk</a>.
                    </p>
                </div>

                <h3 style="color: var(--color-primary-navy);">Accredited by Matrix</h3>
                <p style="color: #555; line-height: 1.7; margin-bottom: 1.5rem;">
                    Our Information, Advice and Guidance Team has been accredited by the quality standard ‘Matrix’ to ensure that our learners and associates are provided with high quality information, advice and guidance from the start to end of their journey with us.
                </p>
                <p style="color: #555; line-height: 1.7; margin-bottom: 2rem;">
                    We are assessed against the Matrix standard each year and we must continually achieve the standard in order to retain our Matrix accreditation.
                </p>

                <h3 style="color: var(--color-primary-navy);">The IAG that you can expect, relating to…</h3>
                <ul style="color: #555; line-height: 1.7; padding-left: 1.5rem;">
                    <li style="margin-bottom: 0.5rem;">The range of qualifications and courses offered by Integer and their relevance and compatibility to specific job roles</li>
                    <li style="margin-bottom: 0.5rem;">Fees and funding information and opportunities</li>
                    <li style="margin-bottom: 0.5rem;">Training needs analysis guidance for employers</li>
                    <li style="margin-bottom: 0.5rem;">What your course involves in terms of commitment, duration, attendance</li>
                    <li style="margin-bottom: 0.5rem;">Assessment regarding your suitability to the chosen programme</li>
                    <li style="margin-bottom: 0.5rem;">Learning resources, and training plans</li>
                    <li style="margin-bottom: 0.5rem;">Help and resource that can be provided for those with support needs</li>
                    <li style="margin-bottom: 0.5rem;">Health & safety, safeguarding, equality & diversity, Prevent, British values</li>
                    <li style="margin-bottom: 0.5rem;">Progression opportunities with career planning, job applications/development</li>
                    <li style="margin-bottom: 0.5rem;">Signposting to alternative/specialist organisations that can offer relevant services, such as further and/or higher education, or careers guidance</li>
                </ul>

            <?php
elseif ($section === 'learner-support'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Learner Support</h2>
                <p style="font-size: 1.1rem; color: #555; line-height: 1.7; margin-bottom: 2rem;">
                    We recognise that taking a training course is a big commitment, so we’re here to help.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div style="background: white; border: 1px solid #eee; padding: 1.5rem; border-radius: 8px;">
                        <h3 style="margin-top: 0; color: var(--color-accent-teal);">Resources</h3>
                        <p style="color: #555; line-height: 1.6;">
                            We have an Information, Advice and Guidance service for our learners, and we have a variety of resources available to support you in your course. If you’ve been asked to complete our Learner Funding Eligibility Questionnaire, you can access it in the Resource Centre.
                        </p>
                    </div>
                    <div style="background: white; border: 1px solid #eee; padding: 1.5rem; border-radius: 8px;">
                        <h3 style="margin-top: 0; color: var(--color-accent-teal);">Online Tools</h3>
                        <p style="color: #555; line-height: 1.6;">
                            If you’re using our e-portfolio (Smart Assessor), or if you’ve been asked to use our online learning service, you can log in to these using the links provided.
                        </p>
                    </div>
                </div>

                <blockquote style="background: #f8f9fa; border-left: 4px solid var(--color-integer-yellow); padding: 1.5rem; color: #555; font-style: italic; margin-bottom: 2rem;">
                    Remember that your tutor, your assessor and any other staff that you have contact with want you to succeed, and that they’re always keen to help.
                </blockquote>

                <p style="color: #555; line-height: 1.7;">
                    If you feel confused by any part of your course or by anything that your tutor/assessor expects of you, please do get in touch as soon as possible so that it can be sorted out before it becomes a problem.
                </p>
                <p style="color: #555; line-height: 1.7;">
                    Your tutor/assessor will have provided you with their contact details, but if you’re having trouble getting in touch with them please contact us so that we can help get your issues resolved.
                </p>

            <?php
elseif ($section === 'privacy'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Privacy Policy</h2>
                <p style="color: #555; line-height: 1.7; margin-bottom: 1.5rem;">
                    Integer Training recognises that your personal privacy is a serious and important issue and we support the principle of protecting privacy on the Internet within the context of current UK legislation.
                </p>
                
                <div style="background: #f0f4f8; padding: 1.5rem; border-radius: 8px; font-size: 0.9rem; color: #666; margin-bottom: 2rem;">
                    This policy is effective from 25 May 2023. By using the Integer Training website, you consent to the collection and use of your personal information in accordance with this policy.
                </div>

                <h3 style="color: var(--color-primary-navy);">The personal information that we collect</h3>
                <ul style="color: #555; line-height: 1.7; margin-bottom: 1.5rem;">
                    <li>Name, Address, DOB</li>
                    <li>Contact information including email address and telephone number</li>
                </ul>

                <h3 style="color: var(--color-primary-navy);">What we do with the information we gather</h3>
                <p style="color: #555; line-height: 1.7;">
                    We require this information to understand your needs and provide you with a better service, including:
                </p>
                <ul style="color: #555; line-height: 1.7; margin-bottom: 1.5rem;">
                    <li>Internal record keeping.</li>
                    <li>Improving our products and services.</li>
                    <li>Sending promotional emails about new products (if you have opted in).</li>
                    <li>Market research contacts.</li>
                </ul>

                <div style="margin-bottom: 2rem; border-top: 1px solid #eee; padding-top: 2rem;">
                    <h3 style="color: var(--color-primary-navy);">Your Rights (GDPR)</h3>
                    <p style="color: #555; line-height: 1.7;">Since 25 May 2018 you have the following rights:</p>
                    <ul style="color: #555; line-height: 1.7;">
                        <li><strong>Right to correct:</strong> rectify inaccurate info.</li>
                        <li><strong>Right to erase:</strong> request deletion of info.</li>
                        <li><strong>Right to restrict:</strong> block usage of info.</li>
                        <li><strong>Right to data portability:</strong> request transfer of info.</li>
                        <li><strong>Right to object:</strong> object to use for legitimate interests or market research.</li>
                    </ul>
                </div>

                <p style="color: #555; font-size: 0.9rem;">
                    To make enquiries, exercise any of your rights set out in this Privacy Policy and/or make a complaint please contact <a href="mailto:Jacky@integer.co.uk">Jacky@integer.co.uk</a>.
                </p>

            <?php
elseif ($section === 'quality'): ?>
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Quality Assurance</h2>
                <p style="font-size: 1.2rem; font-weight: 500; color: var(--color-primary-navy); margin-bottom: 1.5rem;">
                    Our reputation depends on delivering Quality Training.
                </p>
                
                <p style="color: #555; line-height: 1.7;">
                    Our trainers, assessors and verifiers are carefully selected for:
                </p>
                <ul style="color: #555; line-height: 1.7; margin-bottom: 2rem;">
                    <li>The technical knowledge they have of their subjects</li>
                    <li>The experience they have in their field</li>
                    <li>The quality and professionalism of their delivery/care</li>
                    <li>Their empathy to the ‘tutor group’</li>
                </ul>

                <h3 style="color: var(--color-primary-navy);">Implementation Stages</h3>
                <div style="background: white; border: 1px solid #eee; border-radius: 8px; overflow: hidden; margin-bottom: 2rem;">
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="padding: 1rem; border-bottom: 1px solid #eee;">✅ Effective recruitment of learners</li>
                        <li style="padding: 1rem; border-bottom: 1px solid #eee;">✅ Effective assessment of learner needs</li>
                        <li style="padding: 1rem; border-bottom: 1px solid #eee;">✅ Meeting and exceeding employer needs</li>
                        <li style="padding: 1rem; border-bottom: 1px solid #eee;">✅ Ensuring quality assurance of teaching and assessment practices</li>
                        <li style="padding: 1rem; border-bottom: 1px solid #eee;">✅ Monitoring progress</li>
                        <li style="padding: 1rem;">✅ Positively promoting health & safety, equality & diversity (Safeguarding)</li>
                    </ul>
                </div>

                <p style="color: #555; line-height: 1.7;">
                    We do this by working in accordance with standards, guidelines and recommendations from governing bodies, including:
                </p>
                <ul style="color: #555; line-height: 1.7;">
                    <li>Education & Skills Funding Agency</li>
                    <li>Funding Partners & Colleges of Further Education</li>
                    <li>Ofsted</li>
                    <li>Awarding Bodies</li>
                    <li>Working Partners and Agencies (National Careers Service, Job Centre Plus)</li>
                    <li>National Industry Standards & Sector Skills Councils</li>
                </ul>

            <?php
else: ?>
                <!-- Placeholder for future content -->
                <h2 style="color: var(--color-primary-navy); margin-top: 0;"><?php echo $sidebarLinks[$section]; ?></h2>
                <p style="color: #666; font-style: italic;">Content for this section will be coming soon...</p>
            <?php
endif; ?>
            
        </div>
    </div>
</div>
