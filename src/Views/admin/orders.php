<h1 style="margin-bottom: 1.5rem;">Orders</h1>

<?php if (isset($error)): ?>
    <div style="background: #fee; color: #c00; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem;">
        <?php echo htmlspecialchars($error); ?>
    </div>
<?php endif; ?>

<div class="card" style="overflow-x: auto;">
    <?php if (empty($orders)): ?>
        <p style="color: #666; text-align: center; padding: 2rem 0;">No orders found.</p>
    <?php else: ?>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
                <tr style="text-align: left; color: #666; border-bottom: 2px solid #eee;">
                    <th style="padding: 0.75rem 0.5rem;">Date</th>
                    <th style="padding: 0.75rem 0.5rem;">Order #</th>
                    <th style="padding: 0.75rem 0.5rem;">Customer</th>
                    <th style="padding: 0.75rem 0.5rem;">Email</th>
                    <th style="padding: 0.75rem 0.5rem;">Phone</th>
                    <th style="padding: 0.75rem 0.5rem;">Courses</th>
                    <th style="padding: 0.75rem 0.5rem;">Total</th>
                    <th style="padding: 0.75rem 0.5rem;">Status</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($orders as $row): ?>
                    <tr style="border-top: 1px solid #eee;">
                        <td style="padding: 0.75rem 0.5rem; white-space: nowrap;">
                            <?php echo htmlspecialchars(date('d M Y H:i', strtotime($row['created_at'] ?? ''))); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem; font-weight: 500;">
                            <?php echo htmlspecialchars($row['order_number'] ?? $row['id'] ?? ''); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php echo htmlspecialchars($row['customer_name'] ?? ''); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php if (!empty($row['customer_email'])): ?>
                                <a href="mailto:<?php echo htmlspecialchars($row['customer_email']); ?>" style="color: #3182CE;">
                                    <?php echo htmlspecialchars($row['customer_email']); ?>
                                </a>
                            <?php endif; ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem; white-space: nowrap;">
                            <?php if (!empty($row['customer_phone'])): ?>
                                <a href="tel:<?php echo htmlspecialchars($row['customer_phone']); ?>" style="color: #3182CE;">
                                    <?php echo htmlspecialchars($row['customer_phone']); ?>
                                </a>
                            <?php endif; ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="<?php echo htmlspecialchars($row['courses'] ?? ''); ?>">
                            <?php echo htmlspecialchars($row['courses'] ?? ''); ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem; white-space: nowrap;">
                            <?php if (isset($row['total'])): ?>
                                &pound;<?php echo htmlspecialchars(number_format((float)$row['total'], 2)); ?>
                            <?php endif; ?>
                        </td>
                        <td style="padding: 0.75rem 0.5rem;">
                            <?php
                                $status = strtolower($row['status'] ?? 'pending');
                                if ($status === 'paid' || $status === 'succeeded'):
                            ?>
                                <span style="background: #c6f6d5; color: #22543d; padding: 2px 8px; border-radius: 99px; font-size: 0.75rem;">Paid</span>
                            <?php else: ?>
                                <span style="background: #feebc8; color: #744210; padding: 2px 8px; border-radius: 99px; font-size: 0.75rem;">Pending</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
