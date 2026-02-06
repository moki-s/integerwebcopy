<?php
// Course Listing View
require_once __DIR__ . '/../Data/CourseData.php';
$all_courses = getAllCourses();

// 2. Extract Categories for Sidebar & Calculate Counts
$categories = [];
foreach ($all_courses as $course) {
    $cat = $course['category'];
    if (!isset($categories[$cat])) {
        $categories[$cat] = 0;
    }
    $categories[$cat]++;
}
ksort($categories);

// 3. Handle Filtering
$selected_categories = $_GET['category'] ?? [];
// If it's not an array (e.g. single query param), make it one
if (!is_array($selected_categories) && $selected_categories) {
    $selected_categories = [$selected_categories];
}

$filtered_courses = [];
if (empty($selected_categories)) {
    $filtered_courses = $all_courses;
}
else {
    foreach ($all_courses as $course) {
        if (in_array($course['category'], $selected_categories)) {
            $filtered_courses[] = $course;
        }
    }
}

// 4. Handle Search Query
$search_query = trim($_GET['search'] ?? '');
if ($search_query) {
    $temp_filtered = [];
    foreach ($filtered_courses as $course) {
        // Search in Title and Category (case-insensitive)
        if (stripos($course['title'], $search_query) !== false || stripos($course['category'], $search_query) !== false) {
            $temp_filtered[] = $course;
        }
    }
    $filtered_courses = $temp_filtered;
}
?>

<div style="background-color: var(--color-primary-navy); color: white; padding: 3rem 0;">
    <div class="container">
        <h1 style="margin: 0;">All Courses</h1>
        <p style="opacity: 0.9; margin-top: 0.5rem;">Browse our accredited qualifications</p>
    </div>
</div>

<div class="container" style="padding: 3rem 1rem; display: grid; grid-template-columns: 250px 1fr; gap: 3rem;">
    
    <!-- Sidebar Filters -->
    <aside>
        <div style="background: white; padding: 1.5rem; border: 1px solid #eee; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <h4 style="margin-top: 0; margin-bottom: 1rem;">Categories</h4>
                <ul style="margin-bottom: 2rem;">
                    <?php foreach ($categories as $cat => $count): ?>
                        <li style="margin-bottom: 0.5rem;">
                            <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; color: #555;">
                                <input type="checkbox" name="category[]" value="<?php echo htmlspecialchars($cat); ?>" 
                                    <?php echo in_array($cat, $selected_categories) ? 'checked' : ''; ?>
                                    onchange="this.form.submit()"> 
                                <?php echo htmlspecialchars($cat); ?> 
                                <span style="color: #999; font-size: 0.85rem;">(<?php echo $count; ?>)</span>
                            </label>
                        </li>
                    <?php
endforeach; ?>
                </ul>
            
            <h4 style="margin-top: 0; margin-bottom: 1rem;">Level</h4>
            <ul>
                <li style="margin-bottom: 0.5rem;"><label style="cursor: pointer;"><input type="checkbox"> Level 2 (Beginner)</label></li>
                <li style="margin-bottom: 0.5rem;"><label style="cursor: pointer;"><input type="checkbox"> Level 3 (Advanced)</label></li>
                <li style="margin-bottom: 0.5rem;"><label style="cursor: pointer;"><input type="checkbox"> Level 5 (Professional)</label></li>
            </ul>
        </div>
    </aside>
    
    <!-- Course Grid -->
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>Showing <strong><?php echo count($filtered_courses); ?></strong> courses</div>
            <select style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
            </select>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
            

            
            <?php foreach ($filtered_courses as $c): ?>
            <!-- Course Card -->
            <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <div style="height: 160px; background-color: #f8fafc; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                    <?php echo $c['icon']; ?>
                </div>
                <div style="padding: 1.5rem;">
                    <span style="font-size: 0.75rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px;"><?php echo $c['category']; ?></span>
                    <h3 style="margin: 0.5rem 0; font-size: 1.1rem; min-height: 44px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        <a href="/product?id=<?php echo $c['id']; ?>"><?php echo $c['title']; ?></a>
                    </h3>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                         <span style="font-size: 0.75rem; background: <?php echo $c['badge_color']; ?>20; color: <?php echo $c['badge_color']; ?>; padding: 2px 6px; border-radius: 4px; font-weight: 600;"><?php echo $c['badge']; ?></span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 1rem; margin-top: 1rem;">
                        <div style="display: flex; flex-direction: column;">
                            <span style="text-decoration: line-through; color: #999; font-size: 0.85rem;">£<?php echo $c['old_price']; ?></span>
                            <span style="font-weight: 700; color: var(--color-primary-navy); font-size: 1.25rem;">£<?php echo $c['price']; ?></span>
                        </div>
                        <a href="/product?id=<?php echo $c['id']; ?>" class="text-teal font-bold" style="font-size: 0.9rem;">View &rarr;</a>
                    </div>
                </div>
            </div>
            <?php
endforeach; ?>
            
        </div>
        
        <!-- Pagination -->
        <div style="margin-top: 3rem; display: flex; justify-content: center; gap: 0.5rem;">
            <a href="#" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; color: #666;">&laquo;</a>
            <a href="#" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--color-primary-navy); color: white; border-radius: 4px;">1</a>
            <a href="#" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; color: #666;">2</a>
            <a href="#" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; color: #666;">3</a>
            <a href="#" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; color: #666;">&raquo;</a>
        </div>
    </div>
</div>
