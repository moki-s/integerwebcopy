# CLAUDE.md — INTEGERweb Project

## Project Overview

**Integer Training** — A PHP website for a UK-based career training company offering accredited qualifications across 6 categories. No framework, no build system — vanilla PHP with a simple router.

- **Live Dev**: `php -S localhost:8000 -t public` (XAMPP PHP at `/c/xampp/php/php.exe`)
- **Repos**:
  - `origin` → `https://github.com/Integer-Training/INTEGERweb.git`
  - `web-main-hub` → `https://github.com/Integer-Training/web-main-hub.git`
  - `personal` → `https://github.com/moki-s/integerwebcopy.git` (DigitalOcean deployment source)
- **Stack**: PHP 8.2, HTML/CSS (no JS framework), Supabase (form storage), Stripe (payments with 3DS)
- **Deployment**: DigitalOcean App Platform (auto-deploys from `personal` remote)

---

## Project Structure

```
INTEGERweb/
├── public/                          # Web root (document root for server)
│   ├── index.php                    # Main router + HTML shell (CSS has ?v=N cache-busting)
│   └── assets/
│       ├── css/
│       │   ├── variables.css        # CSS custom properties
│       │   └── style.css            # All styles (~870 lines, mobile styles in @media)
│       └── images/
│           ├── logo.webp            # Site logo
│           ├── hero-banner.png      # Hero section background image
│           ├── student-advisor.webp # CTA section advisor image
│           ├── partners/            # 12 partner/accreditation logos
│           │   ├── habc.webp, ncfe.png, aat.webp, mindful-education.webp
│           │   ├── pearson.webp, athe.webp, national-careers.webp, htq.webp
│           │   ├── esfa.png, all.png, matrix.avif, mayor-of-london.png
│           └── courses/             # Course images (30 courses + thumbnails)
│               ├── accounting/      # 7 course images + acc-thumb.png
│               ├── health-social/   # 5 course images + hs-thumb.png
│               ├── occupational/    # 9 course images + occ-thumb.png
│               ├── functional-skills/# 4 course images + func-thumb.png
│               ├── security/        # 5 course images + sec-thumb.png
│               └── business/        # 1 course image
├── src/
│   ├── Config/
│   │   ├── Supabase.php            # Supabase URL, anon key, supabaseInsert() helper
│   │   └── Stripe.php              # Stripe secret key, stripeRequest() helper
│   ├── Data/
│   │   ├── CourseData.php           # 30 courses as PHP constant array, getCourse()/getAllCourses()
│   │   └── ReviewData.php           # 20 real Trustpilot reviews, review stats, 12 partner logos
│   ├── Database.php                 # PDO database singleton (MySQL — not actively used)
│   ├── Templates/
│   │   ├── Header.php               # Site header (WhatsApp + phone + cart, mobile hamburger menu)
│   │   └── Footer.php               # Site footer
│   └── Views/
│       ├── home.php                 # Homepage (hero bg image, stats, partners banner, 6 course categories, real reviews, CTA)
│       ├── courses.php              # Course listing (filters, sort, search, grid)
│       ├── product.php              # Product detail (tabs, sidebar, real reviews with Trustpilot+Google badges)
│       ├── cart.php                 # Shopping cart (session-based)
│       ├── checkout.php             # Checkout (Stripe with 3DS support)
│       ├── contact.php              # Contact page (form submits to Supabase)
│       ├── about.php                # About page (tabbed sections, policies)
│       ├── branches.php             # Branch locations
│       ├── order-success.php        # Order confirmation page
│       └── student_login.php        # Student login (placeholder)
├── database/                        # SQL migration files
├── composer.json
├── apache.conf                      # Apache config for DigitalOcean
├── Procfile                         # DigitalOcean App Platform process file
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
| `/order-success` | GET | order-success.php (redirects to / if no order) |
| `/contact` | GET | contact.php |
| `/about` | GET | about.php |
| `/branches` | GET | branches.php |
| `/login` | GET | student_login.php |
| `/cart-add` | POST | Add to session cart, redirect to product |
| `/cart-remove?id=xxx` | GET | Remove from cart, redirect to /cart |
| `/enquiry` | POST | Validate + insert to Supabase, redirect with flash message |
| `/checkout-process` | POST | Create Stripe PaymentIntent (JSON API) |
| `/checkout-confirm` | POST | Confirm Stripe 3DS payment (JSON API) |

---

## Review Data (src/Data/ReviewData.php)

Centralized data file with three constants:

- **`TRUSTPILOT_REVIEWS`** — 20 real Trustpilot reviews (author, rating, title, body, date, source)
- **`REVIEW_STATS`** — Aggregated ratings: `trustpilot_rating`, `trustpilot_count`, `google_rating`, `google_count`
- **`PARTNER_LOGOS`** — 12 partner logos (src path + alt text), rendered dynamically on homepage

Used by: `home.php` (scrolling carousel + rating box + partner banner), `product.php` (review carousel + badges)

To add/remove partners or reviews, edit the arrays in this file.

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

## Homepage Sections (src/Views/home.php)

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Background image with dark overlay, search bar, Trustpilot stars |
| 2 | Mobile Lead Form | Hidden on desktop, shown on mobile |
| 3 | Stats Bar | Animated counters (25+ years, 50,000+ students, 93% pass rate) |
| 4 | Features | Trustpilot bar + 3 feature icons (Expert tutors, Self-paced, Interest-free) |
| 5 | Partners Banner | 12 logos in infinite scroll, dynamic from `PARTNER_LOGOS` |
| 6 | Explore Courses | All 6 categories with thumbnails, links to filtered /courses page |
| 7 | Reviews Carousel | 20 real Trustpilot reviews + Trustpilot & Google rating badges |
| 8 | CTA | Course advisor contact section with email/call buttons |

---

## Header (src/Templates/Header.php)

### Desktop
- Top bar: "Train toward a career you'll love!" + phone number
- Main: Logo | Nav (Courses, About Us, Branches, Contact) | WhatsApp icon + Phone pill + Cart

### Mobile
- WhatsApp icon + Phone number pill + Hamburger menu
- Slide-out menu: Nav links + WhatsApp Us + Phone + Email + Basket + Close

**WhatsApp**: Links to `https://wa.me/447828924057` (opens new tab)

---

## Supabase Integration (src/Config/Supabase.php)

- **URL**: `https://diaxecxqisioooacucbg.supabase.co`
- **Tables**: `enquiries`, `orders`
- **Function**: `supabaseInsert(string $table, array $data)` — cURL POST to Supabase REST API
- **Forms wired**: Homepage mobile lead form + Contact page form → both POST to `/enquiry`

---

## Stripe Integration (src/Config/Stripe.php)

- **Function**: `stripeRequest(string $endpoint, array $params)` — cURL POST to Stripe API
- **Flow**: Create PaymentIntent → 3DS challenge if needed → Confirm → Save order to Supabase
- **Routes**: `/checkout-process` (create), `/checkout-confirm` (3DS confirm)

---

## CSS Architecture (public/assets/css/style.css)

**Critical rule**: Desktop layout must NEVER change. All mobile styles live inside `@media (max-width: 768px)`.

**Cache-busting**: CSS links in `index.php` use `?v=N` query strings. Increment when deploying CSS changes.

### Base (desktop) styles:
- Reset, container (max-width: 1280px), typography utilities
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.btn-highlight`
- Header: `.site-header` (sticky, z-index: 1000), `.top-bar`, `.nav-menu`, `.header-actions`, `.header-phone-link`, `.header-whatsapp-link`
- Footer: `.footer-grid`, `.footer-col`, `.footer-links`
- Partners: `.partner-track` (infinite scroll animation), `.partner-logo` (full colour, hover scale)
- Contact: `.contact-form-label` (hidden on desktop, shown on mobile)
- Hidden on desktop: `.home-mobile-form`, `.mobile-hamburger`, `.mobile-header-phone`, `.mobile-header-whatsapp`, `.mobile-menu-overlay`, `.mobile-filter-toggle`

### Mobile (`@media max-width: 768px`) sections:
- **Mobile header**: Hide desktop nav, show WhatsApp icon + hamburger + phone number pill, slide-out menu
- **Homepage**: Show lead form, compact hero, stack stats, trustpilot wrap, smaller partner logos, CTA stacking
- **Contact page**: Form-first order, visible labels, 16px inputs
- **Courses page**: Compact hero, filter toggle, collapsible sidebar, single-column cards
- **About page**: Compact hero, collapsible sidebar, single-column layout
- **Product page**: Single column, sidebar first (pricing visible), benefits stack
- **Cart page**: Table becomes card layout, single column
- **Checkout page**: Order summary first, stacked name fields
- **Footer**: Single column
- **Global**: `overflow-x: hidden` on `html` only (NOT body — breaks sticky header)

---

## Session Cart

- Stored in `$_SESSION['cart']` as `[courseId => 1]`
- Add: POST `/cart-add` with `course_id`
- Remove: GET `/cart-remove?id=xxx`
- Cart + Checkout pages read session and load course data via `getCourse()`

---

## Deployment

### DigitalOcean App Platform
- **Source repo**: `personal` remote (`moki-s/integerwebcopy`)
- **Auto-deploy**: On push to main
- **Manual deploy**: DigitalOcean dashboard → Actions → Force Rebuild and Deploy
- **Important**: When deploying CSS changes, increment `?v=N` in `index.php` CSS links

### Git Remotes

| Name | URL | Purpose |
|------|-----|---------|
| `origin` | `https://github.com/Integer-Training/INTEGERweb.git` | Primary repo |
| `web-main-hub` | `https://github.com/Integer-Training/web-main-hub.git` | Secondary repo |
| `personal` | `https://github.com/moki-s/integerwebcopy.git` | DigitalOcean deployment |

### Push to all remotes
```bash
git push origin main && git push web-main-hub main && git push personal main
```

---

## Development Commands

```bash
# Start dev server
/c/xampp/php/php.exe -S localhost:8000 -t public

# Or from project root
php -S localhost:8000 -t public
```

---

## Pending / Next Steps

1. **SEO** — Dynamic `<title>` tags per page, meta descriptions
2. **Admin panel** — `src/Views/admin/` exists but is placeholder
