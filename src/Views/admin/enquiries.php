<h1 style="margin-bottom: 1.5rem;">Enquiries</h1>

<?php if (isset($error)): ?>
    <div style="background: #fee; color: #c00; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem;">
        <?php echo htmlspecialchars($error); ?>
    </div>
<?php endif; ?>

<div class="card" style="overflow-x: auto;">
    <?php if (empty($enquiries)): ?>
        <p style="color: #666; text-align: center; padding: 2rem 0;">No enquiries found.</p>
    <?php else: ?>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
                <tr style="text-align: left; color: #666; border-bottom: 2px solid #eee;">
                    <th style="padding: 0.75rem 0.5rem;">Date</th>
                    <th style="padding: 0.75rem 0.5rem;">Name</th>
                    <th style="padding: 0.75rem 0.5rem;">Email</th>
                    <th style="padding: 0.75rem 0.5rem;">Phone</th>
                    <th style="padding: 0.75rem 0.5rem;">Course Interest</th>
                    <th style="padding: 0.75rem 0.5rem;">Message</th>
                    <th style="padding: 0.75rem 0.5rem;">Page</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($enquiries as $row): ?>
                    <tr style="border-top: 1px solid #eee;">
                        <td style="padding: 0.75rem 0.5rem; white-space: nowrap;">
                            <?php echo htmlspecialchars(date('d M Y H:i', strtotime($row['created_at'] ?? ''))); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php echo htmlspecialchars($row['name'] ?? ''); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php if (!empty($row['email'])): ?>
                                <a href="mailto:<?php echo htmlspecialchars($row['email']); ?>" style="color: #3182CE;">
                                    <?php echo htmlspecialchars($row['email']); ?>
                                </a>
                            <?php endif; ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem; white-space: nowrap;">
                            <?php if (!empty($row['phone'])): ?>
                                <a href="tel:<?php echo htmlspecialchars($row['phone']); ?>" style="color: #3182CE;">
                                    <?php echo htmlspecialchars($row['phone']); ?>
                                </a>
                            <?php endif; ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php echo htmlspecialchars($row['course_interest'] ?? ''); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="<?php echo htmlspecialchars($row['message'] ?? ''); ?>">
                            <?php echo htmlspecialchars($row['message'] ?? ''); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php echo htmlspecialchars($row['page'] ?? ''); ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
