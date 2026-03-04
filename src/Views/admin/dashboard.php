<h1 style="margin-bottom: 1.5rem;">Dashboard</h1>

<?php
$hasError = !empty($orders_error) || !empty($enquiries_error);

// Calculate stats from real data
$paidOrders = array_filter($orders, function ($o) {
    $s = strtolower($o['status'] ?? '');
    return $s === 'paid' || $s === 'succeeded';
});
$totalRevenue = array_sum(array_map(function ($o) {
    return (float)($o['total'] ?? 0);
}, $paidOrders));
$totalOrders = count($paidOrders);
$totalEnquiries = count($enquiries);
?>

<?php if ($hasError): ?>
    <div style="background: #fee; color: #c00; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem;">
        <?php if (!empty($orders_error)): ?>
            <p>Orders error: <?php echo htmlspecialchars($orders_error); ?></p>
        <?php endif; ?>
        <?php if (!empty($enquiries_error)): ?>
            <p>Enquiries error: <?php echo htmlspecialchars($enquiries_error); ?></p>
        <?php endif; ?>
    </div>
<?php endif; ?>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
    <!-- Stat Card 1: Total Revenue -->
    <div class="card">
        <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">Total Revenue</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary-navy);">&pound;<?php echo number_format($totalRevenue, 2); ?></div>
        <div style="color: #666; font-size: 0.875rem;">From paid orders</div>
    </div>

    <!-- Stat Card 2: Total Orders -->
    <div class="card">
        <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">Paid Orders</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary-navy);"><?php echo $totalOrders; ?></div>
        <div style="color: #666; font-size: 0.875rem;"><?php echo count($orders); ?> total</div>
    </div>

    <!-- Stat Card 3: Enquiries -->
    <div class="card">
        <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">Enquiries</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary-navy);"><?php echo $totalEnquiries; ?></div>
        <div style="color: #666; font-size: 0.875rem;">Total received</div>
    </div>
</div>

<div class="card">
    <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Recent Orders</h3>
    <?php
    $recentOrders = array_slice($orders, 0, 5);
    ?>
    <?php if (empty($recentOrders)): ?>
        <p style="color: #666; text-align: center; padding: 2rem 0;">No orders found.</p>
    <?php else: ?>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
                <tr style="text-align: left; color: #666; font-size: 0.875rem;">
                    <th style="padding: 0.75rem 0.5rem;">Date</th>
                    <th style="padding: 0.75rem 0.5rem;">Order #</th>
                    <th style="padding: 0.75rem 0.5rem;">Customer</th>
                    <th style="padding: 0.75rem 0.5rem;">Courses</th>
                    <th style="padding: 0.75rem 0.5rem;">Total</th>
                    <th style="padding: 0.75rem 0.5rem;">Status</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($recentOrders as $row): ?>
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
