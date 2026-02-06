<h1 style="margin-bottom: 1.5rem;">Dashboard</h1>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
    <!-- Stat Card 1 -->
    <div class="card">
        <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">Total Orders</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary-navy);">£12,450</div>
        <div style="color: var(--color-success-green); font-size: 0.875rem;">+12% from last month</div>
    </div>
    
    <!-- Stat Card 2 -->
    <div class="card">
        <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">Active Students</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary-navy);">1,205</div>
        <div style="color: var(--color-success-green); font-size: 0.875rem;">+5 new today</div>
    </div>
    
    <!-- Stat Card 3 -->
    <div class="card">
        <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">Pending Enquiries</div>
        <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary-navy);">8</div>
        <div style="color: #e53e3e; font-size: 0.875rem;">Requires attention</div>
    </div>
</div>

<div class="card">
    <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Recent Orders</h3>
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="text-align: left; color: #666; font-size: 0.875rem;">
                <th style="padding: 0.75rem 0;">Order ID</th>
                <th style="padding: 0.75rem 0;">Customer</th>
                <th style="padding: 0.75rem 0;">Course</th>
                <th style="padding: 0.75rem 0;">Amount</th>
                <th style="padding: 0.75rem 0;">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr style="border-top: 1px solid #eee;">
                <td style="padding: 0.75rem 0;">#ORD-7322</td>
                <td>John Smith</td>
                <td>AAT Level 3 Diploma</td>
                <td>£345.00</td>
                <td><span style="background: #c6f6d5; color: #22543d; padding: 2px 8px; border-radius: 99px; font-size: 0.75rem;">Paid</span></td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
                <td style="padding: 0.75rem 0;">#ORD-7321</td>
                <td>Sarah Jones</td>
                <td>Project Management L5</td>
                <td>£895.00</td>
                <td><span style="background: #feebc8; color: #744210; padding: 2px 8px; border-radius: 99px; font-size: 0.75rem;">Pending</span></td>
            </tr>
        </tbody>
    </table>
</div>
