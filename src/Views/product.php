<?php
// Product Page View - Dynamic based on ID
require_once __DIR__ . '/../Data/CourseData.php';

// Get Course ID from URL or default to first one
$courseId = $_GET['id'] ?? 'aat-level-2-accounting';
$course = getCourse($courseId);

// Fallback if ID invalid
if (!$course) {
    $course = getCourse('aat-level-2-accounting');
}

?>

<div style="background-color: #fff; border-bottom: 1px solid #eee; padding: 1rem 0;">
    <div class="container">
        <!-- Breadcrumbs -->
        <div style="font-size: 0.875rem; color: #666; margin-bottom: 1rem;">
            <a href="/">Home</a> > <a href="/courses">Courses</a> > <span class="text-navy"><?php echo $course['category']; ?></span>
        </div>
        
        <!-- Header Info -->
        <span style="background-color: <?php echo $course['badge_color']; ?>; color: white; font-size: 0.75rem; font-weight: bold; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 0.5rem; text-transform: uppercase;">
            <?php echo $course['badge']; ?>
        </span>
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1.2;"><?php echo $course['title']; ?></h1>
        <div style="display: flex; gap: 1rem; font-size: 0.9rem; color: #666;">
            <span>👥 <?php echo number_format($course['students']); ?> Students Enrolled</span>
            <span>💻 Online Course</span>
            <span>🚀 Start Immediately</span>
        </div>
    </div>
</div>

<div class="container" style="padding-top: 2rem; display: grid; grid-template-columns: 1fr 350px; gap: 3rem; position: relative;">
    
    <!-- Main Content (Left) -->
    <div>
        <!-- Tabs Navigation -->
        <div style="display: flex; border-bottom: 2px solid #eee; margin-bottom: 2rem; overflow-x: auto;">
            <button onclick="openTab(event, 'tab-overview')" class="tab-btn active" style="padding: 1rem 1.5rem; background: none; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; font-size: 1rem; cursor: pointer;">Overview</button>
            <button onclick="openTab(event, 'tab-curriculum')" class="tab-btn" style="padding: 1rem 1.5rem; background: none; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; font-size: 1rem; cursor: pointer;">Curriculum</button>
        </div>

        <style>
            .tab-content { display: none; }
            .tab-content.active { display: block; }
            .tab-btn.active { color: var(--color-primary-navy) !important; border-bottom-color: var(--color-primary-navy) !important; }
        </style>

        <!-- Tab: Overview -->
        <div id="tab-overview" class="tab-content active">
            <h3 style="color: var(--color-primary-navy); margin-bottom: 1rem;">Course Overview</h3>
            <p style="font-size: 1.1rem; color: #555; line-height: 1.7; margin-bottom: 2rem;">
                <?php echo $course['overview']; ?>
            </p>
            
            <h4 style="margin-top: 2rem; color: var(--color-primary-navy);">Why study this course?</h4>
            <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">✓</span> Accredited qualification
                </li>
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">✓</span> 100% Online learning
                </li>
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">✓</span> Tutor support included
                </li>
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">✓</span> Study at your own pace
                </li>
            </ul>

            <!-- Benefits Section -->
            <h3 style="color: var(--color-primary-navy); margin-top: 2.5rem; margin-bottom: 1rem;">Benefits Of Choosing Integer Training</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8; color: #555;">
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">•</span> Expert tutors with real-world bookkeeping experience.
                </li>
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">•</span> Flexible study options to fit your schedule.
                </li>
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">•</span> Comprehensive study materials, mock exams, and ongoing support.
                </li>
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">•</span> Career advice and guidance to help you succeed.
                </li>
            </ul>

            <!-- FAQ Section -->
            <h3 style="color: var(--color-primary-navy); margin-top: 2.5rem; margin-bottom: 1rem;">FAQ's</h3>
            
            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>Do I need any prior qualifications to start this course?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    No, the AAT Level 2 Certificate in Bookkeeping is suitable for beginners.
                </div>
            </details>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>How much time will I need to dedicate to studying?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    Around 6–8 hours per week for a typical 4-5-month completion.
                </div>
            </details>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>Is the course recognized by employers?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    Yes, AAT qualifications are highly respected and recognized globally.
                </div>
            </details>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>Can this qualification help me become a self-employed bookkeeper?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    Yes, this course provides the foundational skills needed to manage bookkeeping for businesses or clients.
                </div>
            </details>

            <!-- CTA Section -->
            <div style="text-align: center; margin: 3rem 0;">
                <a href="#" class="btn btn-highlight" style="font-size: 1.1rem; padding: 1rem 2rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    Your Career Awaits – Let's Get Started →
                </a>
                <p style="color: #3182CE; font-weight: 600; margin-top: 1rem; font-size: 0.9rem;">
                    Limited Spots Available! Enroll Now And Secure Your Path To A Career
                </p>
            </div>

            <!-- Single Featured Review Card (Carousel) -->
            <div style="background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 3rem 2rem; border: 1px solid #eee; margin-top: 3rem; text-align: center; overflow: hidden; position: relative;">
                
                <div style="font-size: 4rem; color: #FFC107; line-height: 1; margin-bottom: 1.5rem; font-family: serif;">“</div>
                
                <div style="overflow: hidden;">
                     <?php
// Using specific mock data to match the requested design perfectly for now
$course_reviews = [
    ['author' => 'Isabella N.', 'rating' => 5, 'title' => 'Flexible payment options made it easier!', 'text' => 'I was initially hesitant about enrolling because of the payment, but the team explained their flexible options clearly and patiently. They made the whole process so simple, and I’m glad I didn’t let my fear stop me.'],
    ['author' => 'Amelia S.', 'rating' => 5, 'title' => 'Helped me overcome my doubts!', 'text' => 'I was nervous about starting the Access to HE Diploma (Midwifery) because I hadn\'t studied in years. The staff reassured me, explained everything step by step, and made me feel confident about taking this leap.'],
];

if (!function_exists('renderStarsSmall')) {
    function renderStarsSmall($rating)
    {
        $html = '<div style="display: inline-flex; gap: 6px;">';
        for ($i = 0; $i < 5; $i++) {
            $color = ($i < $rating) ? '#FFC107' : '#e2e8f0';
            $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="' . $color . '"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        }
        $html .= '</div>';
        return $html;
    }
}
?>
                    
                    <div style="display: flex; width: 100%;"> 
                        <style>
                            @keyframes simple-swap {
                                0%, 45% { transform: translateX(0); opacity: 1; }
                                50%, 95% { transform: translateX(-100%); opacity: 1; }
                                100% { transform: translateX(0); }
                            }
                        </style>
                        <div style="display: flex; width: 100%; align-items: flex-start; animation: simple-swap 14s infinite;">
                            <?php foreach ($course_reviews as $review): ?>
                            <div style="flex: 0 0 100%; width: 100%;">
                                 <h4 style="color: #4a5568; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;"><?php echo $review['title']; ?></h4>
                                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 2rem; font-size: 1.05rem; padding: 0 1rem;">
                                    <?php echo $review['text']; ?>
                                </p>
                                <div style="margin-bottom: 1rem;"><?php echo renderStarsSmall($review['rating']); ?></div>
                                <div style="font-weight: 700; color: #1E3A8A; font-size: 1.1rem;"><?php echo $review['author']; ?></div>
                            </div>
                            <?php
endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab: Curriculum -->
        <div id="tab-curriculum" class="tab-content">
            <!-- Removed redundant Header -->
            
            <?php foreach ($course['curriculum'] as $index => $module): ?>
            <details style="margin-bottom: 1rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: #f8f9fa; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: var(--color-primary-navy);">
                    <span>Unit <?php echo $index + 1; ?>: <?php echo $module; ?></span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    In this unit, you will learn the fundamental concepts of <?php echo strtolower($module); ?>. 
                    (This is placeholder text for the module content description).
                </div>
            </details>
            <?php
endforeach; ?>
            
            <details style="margin-bottom: 1rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: #f8f9fa; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: var(--color-primary-navy);">
                    <span>Exam & Assessment</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    This course is assessed through a series of online multiple-choice exams. You can book your exams whenever you feel ready.
                </div>
            </details>
        </div>

        <script>
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
                tabcontent[i].classList.remove("active");
            }
            tablinks = document.getElementsByClassName("tab-btn");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
                tablinks[i].style.color = "#666";
                tablinks[i].style.borderBottomColor = "transparent";
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
        </script>

    </div>
    
    <!-- Sidebar (Right) - Sticky -->
    <div style="position: sticky; top: 100px; height: fit-content; align-self: start;">
        <div style="background: white; border: 1px solid #eee; box-shadow: var(--shadow-lg); border-radius: var(--radius-md); overflow: hidden;">
            
            <!-- Video/Image Placeholder -->
            <div style="height: 180px; background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #eee;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;"><?php echo $course['icon']; ?></div>
                    <div style="font-size: 0.8rem; color: #666;">Course Preview</div>
                </div>
            </div>

            <div style="padding: 1.5rem;">
                <h3 style="margin-top: 0; color: var(--color-primary-navy); font-size: 1.25rem;">Course Fees</h3>
                
                <!-- Payment Toggle -->
                <div style="display: flex; background: #f0f4f8; border-radius: 4px; padding: 4px; margin-bottom: 1.5rem;">
                    <button onclick="document.getElementById('price-full').style.display='block'; document.getElementById('price-monthly').style.display='none'; this.style.background='white'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.1)'; this.nextElementSibling.style.background='transparent'; this.nextElementSibling.style.boxShadow='none';" style="flex: 1; border: none; padding: 8px; border-radius: 4px; font-weight: 600; cursor: pointer; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.1); color: var(--color-primary-navy);">Pay in Full</button>
                    <button onclick="document.getElementById('price-full').style.display='none'; document.getElementById('price-monthly').style.display='block'; this.style.background='white'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.1)'; this.previousElementSibling.style.background='transparent'; this.previousElementSibling.style.boxShadow='none';" style="flex: 1; border: none; padding: 8px; border-radius: 4px; font-weight: 600; cursor: pointer; background: transparent; color: var(--color-primary-navy);">Monthly</button>
                </div>
                
                <!-- Price Display: Full -->
                <div id="price-full" style="margin-bottom: 1.5rem; text-align: center;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <span style="text-decoration: line-through; color: #999; font-size: 1.1rem;">£<?php echo $course['old_price']; ?></span>
                        <span style="font-size: 2.25rem; font-weight: 700; color: var(--color-primary-navy);">£<?php echo $course['price']; ?></span>
                    </div>
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 1rem;">Inc. VAT • One-time payment</div>
                    <div style="background: #fff3cd; color: #856404; padding: 0.5rem; font-size: 0.85rem; border-radius: 4px;">
                        ⚡ Save £<?php echo $course['old_price'] - $course['price']; ?> (Limited Offer)
                    </div>
                </div>

                <!-- Price Display: Monthly (Hidden by default) -->
                <div id="price-monthly" style="margin-bottom: 1.5rem; text-align: center; display: none;">
                     <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 2.25rem; font-weight: 700; color: var(--color-primary-navy);">£<?php echo $course['monthly_price']; ?></span>
                        <span style="font-size: 1rem; color: #666; align-self: end; padding-bottom: 8px;">/ month</span>
                    </div>
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 1rem;">10 monthly interest-free payments</div>
                    <div style="background: #e6fffa; color: #2c7a7b; padding: 0.5rem; font-size: 0.85rem; border-radius: 4px;">
                        0% Finance available
                    </div>
                </div>
                
                <!-- Actions -->
                <?php
$in_cart = isset($_SESSION['cart'][$course['id']]);
if ($in_cart):
?>
                    <a href="/cart" class="btn btn-secondary" style="display: block; width: 100%; margin-bottom: 1rem; font-size: 1.1rem; padding: 1rem; text-align: center; border: 2px solid var(--color-primary-navy); color: var(--color-primary-navy); background: white;">
                        ✓ In Basket (View Cart)
                    </a>
                <?php
else: ?>
                    <form action="/cart-add" method="POST">
                        <input type="hidden" name="course_id" value="<?php echo $course['id']; ?>">
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem; font-size: 1.1rem; padding: 1rem;">Add to Basket</button>
                    </form>
                <?php
endif; ?>
                <div style="text-align: center;">
                    <a href="#" style="font-size: 0.9rem; color: #666; text-decoration: underline;">Speak to a Course Advisor</a>
                </div>
            </div>
            
            <!-- Trust Elements -->
            <div style="background: #f8f9fa; padding: 1rem 1.5rem; border-top: 1px solid #eee;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; color: #555;">
                    <div style="display: flex; gap: 0.25rem;"><span>🔒</span> Secure Checkout</div>
                    <div style="display: flex; gap: 0.25rem;"><span>⭐</span> 4.8/5 Reviews</div>
                    <div style="display: flex; gap: 0.25rem;"><span>🔄</span> 14-Day Returns</div>
                    <div style="display: flex; gap: 0.25rem;"><span>🎓</span> Cert. Included</div>
                </div>
            </div>
        </div>
    </div>
</div>
