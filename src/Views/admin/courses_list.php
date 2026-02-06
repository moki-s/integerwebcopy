<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
    <h1>Courses</h1>
    <a href="/admin.php?action=course_create" class="btn btn-primary">Add New Course</a>
</div>

<div class="card">
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="text-align: left; color: #666; font-size: 0.875rem;">
                <th style="padding: 0.75rem 0;">ID</th>
                <th style="padding: 0.75rem 0;">Title</th>
                <th style="padding: 0.75rem 0;">Price</th>
                <th style="padding: 0.75rem 0;">Status</th>
                <th style="padding: 0.75rem 0;">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($courses)): ?>
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: #999;">No courses found.</td>
                </tr>
            <?php
else: ?>
                <?php foreach ($courses as $course): ?>
                <tr style="border-top: 1px solid #eee;">
                    <td style="padding: 0.75rem 0;"><?php echo $course['id']; ?></td>
                    <td style="font-weight: 500;"><?php echo htmlspecialchars($course['title']); ?></td>
                    <td>£<?php echo number_format($course['price'], 2); ?></td>
                    <td>
                        <?php
        $statusColor = $course['status'] == 'published' ? '#c6f6d5' : '#e2e8f0';
        $statusText = $course['status'] == 'published' ? '#22543d' : '#4a5568';
?>
                        <span style="background: <?php echo $statusColor; ?>; color: <?php echo $statusText; ?>; padding: 2px 8px; border-radius: 99px; font-size: 0.75rem;">
                            <?php echo ucfirst($course['status']); ?>
                        </span>
                    </td>
                    <td>
                        <a href="/admin.php?action=course_edit&id=<?php echo $course['id']; ?>" style="color: var(--color-primary-navy); margin-right: 0.5rem;">Edit</a>
                    </td>
                </tr>
                <?php
    endforeach; ?>
            <?php
endif; ?>
        </tbody>
    </table>
</div>
