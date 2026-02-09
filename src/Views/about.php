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
                <h2 style="color: var(--color-primary-navy); margin-top: 0;">Policies</h2>
                <p style="line-height: 1.7; color: #555; margin-bottom: 2rem;">
                    Integer Training is committed to maintaining the highest standards across all areas of our operation. Our policies are available below for your reference.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Equality, Diversity & Inclusion Policy</h4>
                        </div>
                        <a href="/assets/policies/equality-diversity-inclusion.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Complaints & Appeals Policy</h4>
                        </div>
                        <a href="/assets/policies/complaints-appeals.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">PI, EL & PL Certificate</h4>
                        </div>
                        <a href="/assets/policies/pi-el-pl-certificate.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Certificate</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Business Continuity Policy</h4>
                        </div>
                        <a href="/assets/policies/business-continuity.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Data Protection & Procedure Policy</h4>
                        </div>
                        <a href="/assets/policies/data-protection.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Carbon Reduction Plan</h4>
                        </div>
                        <a href="/assets/policies/carbon-reduction-plan.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Grievance & Disciplinary Procedure</h4>
                        </div>
                        <a href="/assets/policies/grievance-disciplinary.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Health & Safety Policy</h4>
                        </div>
                        <a href="/assets/policies/health-safety.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Whistle Blowing Policy</h4>
                        </div>
                        <a href="/assets/policies/whistle-blowing.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Safeguarding of Children & Vulnerable Adults Protection Policy</h4>
                        </div>
                        <a href="/assets/policies/safeguarding.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-primary-navy); font-size: 0.95rem;">Integer Training 2024 Matrix Certificate</h4>
                        </div>
                        <a href="/assets/policies/matrix-certificate-2024.pdf" target="_blank" style="background: var(--color-accent-teal); color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">View Policy</a>
                    </div>

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
