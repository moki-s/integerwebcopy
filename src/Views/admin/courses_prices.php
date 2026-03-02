<h1 style="margin-bottom: 1.5rem;">Course Prices</h1>

<?php if (!empty($success)): ?>
    <div style="background: #c6f6d5; color: #22543d; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem;">
        <?php echo htmlspecialchars($success); ?>
    </div>
<?php endif; ?>

<?php if (!empty($error)): ?>
    <div style="background: #fee; color: #c00; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem;">
        <?php echo htmlspecialchars($error); ?>
    </div>
<?php endif; ?>

<div class="card" style="margin-bottom: 1.5rem;">
    <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Manage Prices via CSV</h3>
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
        <div>
            <p style="color: #666; font-size: 0.875rem; margin-bottom: 0.75rem;">Download all course prices as CSV, edit in Excel, then upload.</p>
            <a href="/admin.php?action=csv_download" style="display: inline-block; background: var(--color-primary-navy); color: white; padding: 0.6rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.875rem;">Download Prices CSV</a>
        </div>
        <div style="border-left: 1px solid #eee; padding-left: 2rem;">
            <form action="/admin.php?action=csv_upload" method="POST" enctype="multipart/form-data">
                <p style="color: #666; font-size: 0.875rem; margin-bottom: 0.75rem;">Upload edited CSV to update prices:</p>
                <input type="file" name="csv_file" accept=".csv" required style="margin-bottom: 0.5rem; font-size: 0.875rem;">
                <br>
                <button type="submit" style="background: var(--color-success-green, #38a169); color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem;">Upload &amp; Update Prices</button>
            </form>
        </div>
    </div>
</div>

<div class="card" style="overflow-x: auto;">
    <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Current Prices (<?php echo count($courses); ?> courses)</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
        <thead>
            <tr style="text-align: left; color: #666; border-bottom: 2px solid #eee;">
                <th style="padding: 0.75rem 0.5rem;">ID</th>
                <th style="padding: 0.75rem 0.5rem;">Title</th>
                <th style="padding: 0.75rem 0.5rem;">Category</th>
                <th style="padding: 0.75rem 0.5rem; text-align: right;">Price</th>
                <th style="padding: 0.75rem 0.5rem; text-align: right;">Old Price</th>
                <th style="padding: 0.75rem 0.5rem; text-align: right;">Monthly</th>
                <th style="padding: 0.75rem 0.5rem; text-align: right;">Old Monthly</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($courses as $course): ?>
                <tr style="border-top: 1px solid #eee;">
                    <td style="padding: 0.75rem 0.5rem; font-family: monospace; font-size: 0.8rem;">
                        <?php echo htmlspecialchars($course['id']); ?>
                    </td>
                    <td style="padding: 0.75rem 0.5rem;">
                        <?php echo htmlspecialchars($course['title']); ?>
                    </td>
                    <td style="padding: 0.75rem 0.5rem;">
                        <?php echo htmlspecialchars($course['category']); ?>
                    </td>
                    <td style="padding: 0.75rem 0.5rem; text-align: right;">
                        &pound;<?php echo number_format($course['price'], 2); ?>
                    </td>
                    <td style="padding: 0.75rem 0.5rem; text-align: right; color: #999;">
                        &pound;<?php echo number_format($course['old_price'], 2); ?>
                    </td>
                    <td style="padding: 0.75rem 0.5rem; text-align: right;">
                        &pound;<?php echo number_format($course['monthly_price'], 2); ?>
                    </td>
                    <td style="padding: 0.75rem 0.5rem; text-align: right; color: #999;">
                        &pound;<?php echo number_format($course['old_monthly_price'] ?? 0, 2); ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
