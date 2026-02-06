# CLAUDE.md — INTEGERweb Project

## Project Overview

**Integer Training** — A PHP website for a UK-based career training company offering accredited qualifications across 6 categories. No framework, no build system — vanilla PHP with a simple router.

- **Live Dev**: `php -S localhost:8000 -t public` (XAMPP PHP at `/c/xampp/php/php.exe`)
- **Repo**: `https://github.com/Integer-Training/web-main-hub.git`
- **Stack**: PHP 8.2, HTML/CSS (no JS framework), Supabase (form storage), Stripe (payment — pending)

---

## Project Structure

```
INTEGERweb/
├── public/                          # Web root (document root for server)
│   ├── index.php                    # Main router + HTML shell
│   └── assets/
│       ├── css/
│       │   ├── variables.css        # CSS custom properties
│       │   └── style.css            # All styles (~750 lines, mobile styles in @media)
│       └── images/
│           ├── logo.webp            # Site logo
│           └── courses/             # Course images (30 courses + thumbnails)
│               ├── accounting/      # 7 course images + acc-thumb.png
│               ├── health-social/   # 5 course images + hs-thumb.png
│               ├── occupational/    # 9 course images + occ-thumb.png
│               ├── functional-skills/# 4 course images + func-thumb.png
│               ├── security/        # 5 course images + sec-thumb.png
│               └── business/        # 1 course image
├── src/
│   ├── Config/
│   │   └── Supabase.php            # Supabase URL, anon key, supabaseInsert() helper
│   ├── Data/
│   │   └── CourseData.php           # 30 courses as PHP constant array, getCourse()/getAllCourses()
│   ├── Database.php                 # PDO database singleton (MySQL — not actively used)
│   ├── Templates/
│   │   ├── Header.php               # Site header (desktop nav + mobile hamburger menu)
│   │   └── Footer.php               # Site footer
│   └── Views/
│       ├── home.php                 # Homepage (hero, mobile lead form, stats, courses, reviews, CTA)
│       ├── courses.php              # Course listing (filters, sort, search, grid)
│       ├── product.php              # Product detail (tabs, sidebar, reviews, FAQ)
│       ├── cart.php                 # Shopping cart (session-based)
│       ├── checkout.php             # Checkout (dynamic, reads cart, Stripe placeholder)
│       ├── contact.php              # Contact page (form submits to Supabase)
│       ├── about.php                # About page (tabbed sections)
│       ├── branches.php             # Branch locations
│       └── student_login.php        # Student login (placeholder)
├── database/                        # SQL migration files
├── composer.json
└── start_server.bat
```

---

## Routing (public/index.php)

Simple URI-based router. No framework.

| Route | Method | Handler |
|-------|--------|---------|
| `/` | GET | home.php |
| `/courses` | GET | courses.php |
| `/product?id=xxx` | GET | product.php |
| `/cart` | GET | cart.php |
| `/checkout` | GET | checkout.php (redirects to /cart if empty) |
| `/contact` | GET | contact.php |
| `/about` | GET | about.php |
| `/branches` | GET | branches.php |
| `/login` | GET | student_login.php |
| `/cart-add` | POST | Add to session cart, redirect to product |
| `/cart-remove?id=xxx` | GET | Remove from cart, redirect to /cart |
| `/enquiry` | POST | Validate + insert to Supabase, redirect with flash message |

---

## Course Data (src/Data/CourseData.php)

30 courses across 6 categories stored as `COURSES_DATA` constant array.

| Category | Count | IDs prefix |
|----------|-------|------------|
| Accounting | 7 | `aat-level-*` |
| Health & Social Care | 5 | `ncfe-level-*`, `level-5-*` |
| Occupational Studies | 9 | `occ-*`, `personal-dev-*`, `work-related-*`, `health-safety-*` |
| Functional Skills | 4 | `functional-maths-*`, `functional-english-*` |
| Security & Stewarding | 5 | `first-aid-*`, `door-supervisor-*`, `spectator-safety-*`, `event-security-*` |
| Business Studies | 1 | `team-leading-cert` |

Each course has: `id`, `title`, `category`, `price`, `old_price`, `monthly_price`, `students`, `badge`, `badge_color`, `icon`, `image`, `overview`, `curriculum[]`, `reviews[]`

Helper functions: `getCourse($id)`, `getAllCourses()`

---

## Supabase Integration (src/Config/Supabase.php)

- **URL**: `https://diaxecxqisioooacucbg.supabase.co`
- **Table**: `enquiries`
- **Fields**: `name`, `email`, `phone`, `course_interest`, `message`, `page`, `source`
- **Function**: `supabaseInsert(string $table, array $data)` — cURL POST to Supabase REST API
- **Forms wired**: Homepage mobile lead form + Contact page form → both POST to `/enquiry`

---

## CSS Architecture (public/assets/css/style.css)

**Critical rule**: Desktop layout must NEVER change. All mobile styles live inside `@media (max-width: 768px)`.

### Base (desktop) styles:
- Reset, container (max-width: 1280px), typography utilities
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.btn-highlight`
- Header: `.site-header` (sticky, z-index: 1000), `.top-bar`, `.nav-menu`, `.header-actions`, `.header-phone-link`
- Footer: `.footer-grid`, `.footer-col`, `.footer-links`
- Contact: `.contact-form-label` (hidden on desktop, shown on mobile)
- Hidden on desktop: `.home-mobile-form`, `.mobile-hamburger`, `.mobile-header-phone`, `.mobile-menu-overlay`, `.mobile-filter-toggle`

### Mobile (`@media max-width: 768px`) sections:
- **Contact page**: Form-first order, visible labels, 16px inputs
- **Mobile header**: Hide desktop nav, show hamburger + phone number pill, slide-out menu panel
- **Homepage**: Show lead form, compact hero, stack stats, trustpilot wrap, CTA stacking
- **Courses page**: Compact hero, filter toggle, collapsible sidebar, single-column cards
- **About page**: Compact hero, collapsible sidebar, single-column layout
- **Product page**: Single column, sidebar first (pricing visible), benefits stack
- **Cart page**: Table becomes card layout, single column
- **Checkout page**: Order summary first, stacked name fields
- **Footer**: Single column
- **Global**: `overflow-x: hidden` on `html` only (NOT body — breaks sticky header)

### Key CSS classes added for mobile targeting:
- Homepage: `.home-mobile-form`, `.trustpilot-bar`, `.reviews-wrapper`, `.reviews-rating-box`, `.cta-section`, `.cta-inner`, `.cta-advisor-image`
- Courses: `.courses-hero`, `.courses-layout`, `.courses-sidebar`, `.courses-main`, `.courses-grid`
- About: `.about-hero`, `.about-layout`, `.about-grid`, `.about-sidebar`
- Product: `.product-header`, `.product-layout`, `.product-sidebar`, `.product-meta`, `.product-benefits-grid`
- Cart: `.cart-layout`, `.cart-table`, `.cart-summary`
- Checkout: `.checkout-container`, `.checkout-layout`, `.checkout-form-col`, `.checkout-summary`, `.checkout-name-row`

---

## Session Cart

- Stored in `$_SESSION['cart']` as `[courseId => 1]`
- Add: POST `/cart-add` with `course_id`
- Remove: GET `/cart-remove?id=xxx`
- Cart + Checkout pages read session and load course data via `getCourse()`

---

## Pending / Next Steps

1. **Stripe Integration** — Checkout page has `id="stripe-card-element"` placeholder and form with `action="/checkout-process"`. Need to:
   - Add Stripe JS SDK
   - Create payment intent on server
   - Handle `/checkout-process` POST route
   - Save order to Supabase

2. **Course images for remaining categories** — All 30 courses now have images

3. **SEO** — Dynamic `<title>` tags per page, meta descriptions

4. **Admin panel** — `src/Views/admin/` exists but is placeholder

---

## Development Commands

```bash
# Start dev server
/c/xampp/php/php.exe -S localhost:8000 -t public

# Or from project root
php -S localhost:8000 -t public

# Git push to main repo
git push origin main

# Git push to web-main-hub
git push web-main-hub main
```

---

## Git Remotes

| Name | URL |
|------|-----|
| `origin` | `https://github.com/Integer-Training/INTEGERweb.git` |
| `web-main-hub` | `https://github.com/Integer-Training/web-main-hub.git` |

---

## Commit History (recent → oldest)

| Hash | Description |
|------|-------------|
| `f9e8bcc` | chore: trigger Lovable rebuild with latest codebase |
| `e0776f3` | feat: display real course images instead of emojis across all pages |
| `ee17764` | feat: add course images for all 30 courses across 6 categories |
| `a25945d` | feat: add prominent sticky phone number to header on desktop and mobile |
| `f4178fa` | feat: add mobile responsive CSS for product, cart, and checkout pages |
| `8f2a99c` | fix: add CSS classes to cart and product pages for mobile targeting |
| `d0fff25` | feat: rewrite checkout page to be dynamic with real cart data |
| `d0f500e` | feat: wire homepage lead capture form to Supabase backend |
| `a8a59d7` | feat: wire contact page form to Supabase backend |
| `b3133d6` | feat: add POST /enquiry route for form submissions |
| `6bbd8c3` | feat: add Supabase config and REST API helper |
| `725350a` | fix: correct category links in Explore Our Courses section |
| `5fae873` | feat: implement working filters, sorting, and remove fake pagination |
| `ee2a898` | feat: migrate full course data from integer.co.uk |
| `79377ff` | feat: add comprehensive mobile-only CSS for all pages |
| `3604a5e` | feat: add mobile menu toggle and responsive layout to about page |
| `d4fc97a` | feat: add mobile filter toggle and responsive layout to courses page |
| `f607ed3` | feat: add mobile hamburger menu and slide-out navigation |
| `bb9af1d` | feat: add mobile lead capture form and responsive classes to homepage |
| `e8f3b7f` | feat: add mobile-responsive contact page layout |
| `153e1c1` | Frontend polish: Product page, Homepage, and Search updates |
| `843d886` | Initial setup |
