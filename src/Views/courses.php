<?php
// Course Listing View
require_once __DIR__ . '/../Data/CourseData.php';
$all_courses = getAllCourses();

// Helper: extract level number from course title
function extractLevel($title) {
    if (preg_match('/Level\s+(\d+)/i', $title, $m)) {
        return (int)$m[1];
    }
    return 0; // entry-level / no level specified
}

// Extract Categories & Levels for Sidebar
$categories = [];
$levels = [];
foreach ($all_courses as $course) {
    $cat = $course['category'];
    $categories[$cat] = ($categories[$cat] ?? 0) + 1;

    $lvl = extractLevel($course['title']);
    if ($lvl > 0) {
        $levels[$lvl] = ($levels[$lvl] ?? 0) + 1;
    }
}
ksort($categories);
ksort($levels);

$level_labels = [
    1 => 'Level 1 (Entry)',
    2 => 'Level 2 (Beginner)',
    3 => 'Level 3 (Advanced)',
    4 => 'Level 4 (Higher)',
    5 => 'Level 5 (Professional)',
];

// Handle Category Filter
$selected_categories = $_GET['category'] ?? [];
if (!is_array($selected_categories) && $selected_categories) {
    $selected_categories = [$selected_categories];
}

// Handle Level Filter
$selected_levels = $_GET['level'] ?? [];
if (!is_array($selected_levels) && $selected_levels) {
    $selected_levels = [$selected_levels];
}
$selected_levels = array_map('intval', $selected_levels);

// Apply category filter
$filtered_courses = $all_courses;
if (!empty($selected_categories)) {
    $filtered_courses = array_filter($filtered_courses, function($c) use ($selected_categories) {
        return in_array($c['category'], $selected_categories);
    });
}

// Apply level filter
if (!empty($selected_levels)) {
    $filtered_courses = array_filter($filtered_courses, function($c) use ($selected_levels) {
        return in_array(extractLevel($c['title']), $selected_levels);
    });
}

// Handle Search Query
$search_query = trim($_GET['search'] ?? '');
if ($search_query) {
    $filtered_courses = array_filter($filtered_courses, function($c) use ($search_query) {
        return stripos($c['title'], $search_query) !== false || stripos($c['category'], $search_query) !== false;
    });
}

// Handle Sorting
$sort = $_GET['sort'] ?? 'popular';
$filtered_courses = array_values($filtered_courses);
usort($filtered_courses, function($a, $b) use ($sort) {
    switch ($sort) {
        case 'price_asc':  return $a['price'] - $b['price'];
        case 'price_desc': return $b['price'] - $a['price'];
        default:           return ($b['students'] ?? 0) - ($a['students'] ?? 0); // popularity
    }
});
?>

<div class="courses-hero" style="background-color: var(--color-primary-navy); color: white; padding: 3rem 0;">
    <div class="container">
        <h1 style="margin: 0;">All Courses</h1>
        <p style="opacity: 0.9; margin-top: 0.5rem;">Browse our accredited qualifications</p>
    </div>
</div>

<div class="container courses-layout" style="padding: 3rem 1rem; display: grid; grid-template-columns: 250px 1fr; gap: 3rem;">

    <!-- Mobile Filter Toggle (hidden on desktop) -->
    <button class="mobile-filter-toggle" onclick="document.getElementById('courseFilters').classList.toggle('open')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter Courses
    </button>

    <!-- Sidebar Filters -->
    <aside id="courseFilters" class="courses-sidebar">
        <form method="GET" action="/courses">
        <?php if ($search_query): ?><input type="hidden" name="search" value="<?php echo htmlspecialchars($search_query); ?>"><?php endif; ?>
        <?php if ($sort !== 'popular'): ?><input type="hidden" name="sort" value="<?php echo htmlspecialchars($sort); ?>"><?php endif; ?>
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
                <?php foreach ($levels as $lvl => $count): ?>
                    <li style="margin-bottom: 0.5rem;">
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; color: #555;">
                            <input type="checkbox" name="level[]" value="<?php echo $lvl; ?>"
                                <?php echo in_array($lvl, $selected_levels) ? 'checked' : ''; ?>
                                onchange="this.form.submit()">
                            <?php echo $level_labels[$lvl] ?? "Level $lvl"; ?>
                            <span style="color: #999; font-size: 0.85rem;">(<?php echo $count; ?>)</span>
                        </label>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
        </form>
    </aside>

    <!-- Course Grid -->
    <div class="courses-main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>Showing <strong><?php echo count($filtered_courses); ?></strong> courses</div>
            <select style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" onchange="
                var url = new URL(window.location);
                url.searchParams.set('sort', this.value);
                window.location = url;
            ">
                <option value="popular" <?php echo $sort === 'popular' ? 'selected' : ''; ?>>Sort by: Popularity</option>
                <option value="price_asc" <?php echo $sort === 'price_asc' ? 'selected' : ''; ?>>Price: Low to High</option>
                <option value="price_desc" <?php echo $sort === 'price_desc' ? 'selected' : ''; ?>>Price: High to Low</option>
            </select>
        </div>
        
        <div class="courses-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
            

            
            <?php foreach ($filtered_courses as $c): ?>
            <!-- Course Card -->
            <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <div style="height: 160px; background-color: #f8fafc; display: flex; align-items: center; justify-content: center; font-size: 3rem; overflow: hidden;">
                    <?php if (!empty($c['image'])): ?>
                        <img src="<?php echo $c['image']; ?>" alt="<?php echo htmlspecialchars($c['title']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                    <?php else: ?>
                        <?php echo $c['icon']; ?>
                    <?php endif; ?>
                </div>
                <div style="padding: 1.5rem;">
                    <span style="font-size: 0.75rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px;"><?php echo htmlspecialchars($c['category']); ?></span>
                    <h3 style="margin: 0.5rem 0; font-size: 1.05rem; min-height: 0;">
                        <a href="/product?id=<?php echo htmlspecialchars($c['id']); ?>"><?php echo htmlspecialchars($c['title']); ?></a>
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
    </div>
</div>
