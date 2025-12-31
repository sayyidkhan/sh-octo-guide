# 13 Gold Diamonds - Product Requirements Document (Draft)

This document is a working PRD (Product Requirements Document) for the 13 Gold Diamonds members' back-office platform. It consolidates and structures all collected user-facing requirements. We will refine and iterate on each section during discussion.

## Phase 1 - Starter (MVP)

These features are required to launch the first working version.

### Phase 1 Tracker

| Phase | Area | Requirement | Status | Notes |
|---|---|---|---|---|
| 1 (Starter) | Member Access & Accounts | Member registration | Not started |  |
| 1 (Starter) | Member Access & Accounts | Login (Google sign-in) | Not started |  |
| 1 (Starter) | Member Access & Accounts | Password reset (not required for Google-only login) | N/A | Google-only |
| 1 (Starter) | Member Access & Accounts | Email verification (not required for Google-only login) | N/A | Google-only |
| 1 (Starter) | Member Access & Accounts | Access to member-only areas | Not started |  |
| 1 (Starter) | New Member Onboarding | Welcome message | Not started |  |
| 1 (Starter) | New Member Onboarding | Social media pages to follow | Not started |  |
| 1 (Starter) | New Member Onboarding | WhatsApp group links | Not started |  |
| 1 (Starter) | New Member Onboarding | Telegram group links | Not started |  |
| 1 (Starter) | Product Information (Basic) | What the product is | Not started |  |
| 1 (Starter) | Product Information (Basic) | How to take | Not started |  |
| 1 (Starter) | Product Information (Basic) | Dosage | Not started |  |
| 1 (Starter) | Product Information (Basic) | Benefits | Not started |  |
| 1 (Starter) | Basic Navigation | Welcome | Not started |  |
| 1 (Starter) | Basic Navigation | Social Channels | Not started |  |
| 1 (Starter) | Basic Navigation | Products | Not started |  |
| 1 (Starter) | Basic Navigation | Testimonials | Not started |  |

## Phase 2 - Essential (Core Value Features)

These features provide the full business value and complete the core offering.

### Phase 2 Tracker

| Phase | Area | Requirement | Status | Notes |
|---|---|---|---|---|
| 2 (Essential) | Testimonials | Organised by product taken | Not started |  |
| 2 (Essential) | Testimonials | Organised by health issue resolved | Not started |  |
| 2 (Essential) | Testimonials | Filter by tag | Not started |  |
| 2 (Essential) | Testimonials | Admin approval flow | Not started | Stored/managed via Google Sheets |
| 2 (Essential) | Business Training | How to do the business | Not started |  |
| 2 (Essential) | Business Training | Group lunch treat method | Not started |  |
| 2 (Essential) | Business Training | Income method: 3×7 | Not started |  |
| 2 (Essential) | Business Training | Income method: 111 coffee method | Not started |  |
| 2 (Essential) | Business Training | Income method: 1 simple method | Not started |  |
| 2 (Essential) | Financial Goal Guidance | How to reach income targets (e.g., \$60k/month) | Not started |  |
| 2 (Essential) | Financial Goal Guidance | Breakdown of systems | Not started |  |
| 2 (Essential) | Financial Goal Guidance | Step-by-step training | Not started |  |
| 2 (Essential) | Mindset Training | This is a business and should be run like one | Not started |  |
| 2 (Essential) | Mindset Training | This is not a hobby | Not started |  |
| 2 (Essential) | Mindset Training | 3-year graph to chart success | Not started |  |
| 2 (Essential) | Mindset Training | Drinking the coffee = becoming a CEO | Not started |  |
| 2 (Essential) | Content Library | Podcasts | Not started | Likely link/embed |
| 2 (Essential) | Content Library | Blogs | Not started | Likely link/embed |
| 2 (Essential) | Content Library | Training videos | Not started | Likely link/embed (YouTube) |
| 2 (Essential) | Content Library | Screenshots & step-by-step guides | Not started |  |
| 2 (Essential) | Content Library | SH website navigation guide | Not started |  |
| 2 (Essential) | Admin Functions (Core) | Upload/edit content | Not started |  |
| 2 (Essential) | Admin Functions (Core) | Upload images/videos | Not started | Prefer links/embeds to reduce bandwidth |
| 2 (Essential) | Admin Functions (Core) | Manage product information | Not started |  |
| 2 (Essential) | Admin Functions (Core) | Approve testimonials | Not started | Stored/managed via Google Sheets |
| 2 (Essential) | Admin Functions (Core) | Manage users | Not started | In-app Admin Dashboard |

#### Admin Dashboard (User Management) — Requirements (Recommended)

To avoid relying on Firebase Console day-to-day, provide an in-app Admin Dashboard focused on **user access control**.

- **View users**: list members (email, display name, created date, last sign-in if available)
- **Access control (default allow)**:
  - By default, any signed-in Google account can access member areas
  - Admins can blacklist/block users when needed
- **Blacklist/Blocking**:
  - Block a user from accessing the app (soft block)
  - Disable a Firebase Auth user (hard block: cannot sign in)
- **Roles**:
  - Assign role (e.g., `member`, `admin`)
  - Admin-only access to approval workflows and content management
- **Audit trail (optional but recommended)**: log admin actions (who changed what, when)

## Phase 3 - Nice to Haves (Enhancements & Upgrades)

These improve user experience but are not required for initial or core operation.

### Phase 3 Tracker

| Phase | Area | Requirement | Status | Notes |
|---|---|---|---|---|
| 3 (Nice to have) | Advanced Search | Search across products, testimonials, guides, mindset materials, LOA, podcasts/blogs | Not started |  |
| 3 (Nice to have) | Law of Attraction Tools | LOA techniques to accelerate results | Not started |  |
| 3 (Nice to have) | Product Enhancements | Price list | Not started |  |
| 3 (Nice to have) | Product Enhancements | Image/video gallery | Not started |  |
| 3 (Nice to have) | Admin Enhancements | Edit translations (if any in future) | Not started |  |
| 3 (Nice to have) | Admin Enhancements | Additional content categories | Not started |  |
| 3 (Nice to have) | Admin Enhancements | Analytics dashboards | Not started |  |

This new structure categorises the entire PRD into Starter → Essential → Nice to Have phases for clearer planning and prioritisation.

## Final Navigation Structure

This is the intended final navigation layout combining all phases into a clean, intuitive structure.

### **Main Navigation (User Side)**

- **Home / Welcome**
- **Social Channels**
  - WhatsApp Groups
  - Telegram Groups
  - Social Media Pages
- **Products**
  - Product Information
  - Dosage & Benefits
  - Gallery (Phase 3)
- **Testimonials**
  - By Product
  - By Health Issue
  - By Tag
- **Business Training**
  - 3×7
  - 111 Coffee Method
  - 1 Simple Method
  - Group Lunch Treat Method
- **Financial Goals**
  - Income Breakdown
  - Step-by-Step Guides
- **Mindset Training**
- **Content Library**
  - Podcasts
  - Blogs
  - Training Videos
  - Step-by-Step Guides
  - SH Website Navigation Guide
- **Law of Attraction Tools (Phase 3)**

### **Admin Navigation**

- **Dashboard**
- **Content Management**
  - Upload/Edit Content
  - Manage Product Info
  - Image/Video Uploads
- **Testimonials Management**
  - Approvals
  - Edits
- **User Management**
- **Advanced Tools (Phase 3)**
  - Translations
  - Additional Categories
  - Analytics Dashboards

## Recommended Theme & Styling for Wellness App

A wellness‑focused brand should feel calming, trustworthy, clean, and uplifting. Suggested theme:

### **Color Scheme**

- **Primary:** Soft Emerald Green #3BB497
- **Secondary:** Warm Gold #F2C94C
- **Neutral Base:** Off-White #F7F7F5
- **Dark Text:** Charcoal #2C2C2C
- **Primary:** Soft Emerald Green (#3BB497) - healing, natural, wellness
- **Secondary:** Warm Gold (#F2C94C) - prosperity, success (fits 13 Gold Diamonds brand)
- **Neutral Base:** Off‑White (#F7F7F5) - clean and modern
- **Dark Text:** Charcoal (#2C2C2C) - softer than black for wellness tone

### **Accent Colors**

- **Calming Blue** #6EC6F0
- **Soft Coral** #FF8F7A
- **Calming Blue (#6EC6F0):** For educational/training sections
- **Soft Coral (#FF8F7A):** For call‑to‑action without feeling aggressive

### **Typography**

- **Headings:** Rounded sans‑serif (e.g., Poppins / Nunito)
- **Body:** Clean sans‑serif (e.g., Inter / Open Sans)
- Easy readability, no sharp or formal fonts.

### **Styling Direction**

- Rounded corners, soft shadow, warm gradients
- Lots of white space
- Wellness‑inspired imagery (plants, nature, soft lighting)
- Avoid harsh reds or pure black

If you want, I can generate a full UI style guide or sample screens next.

## Proposed Tech Stack (Draft)

This section captures a practical, low-ops implementation approach aligned with this PRD.

### Goals / Constraints

- Mobile responsive (mobile-first)
- Prefer Vercel deployment
- Avoid Next.js
- Use Google login (no email/password handling)
- Support future “real database” needs (users, approvals, content, search)

### Recommended Stack (most seamless on Vercel without Next.js)

- **Frontend**: React + Vite (SPA) + React Router
- **Styling/UI**: Tailwind CSS (mobile-first) + **shadcn/ui** (Radix UI primitives)
- **Auth**: Firebase Authentication (Google provider only)
- **Content data source**: Google Sheets (source of truth)
  - Store: testimonials, tags, approvals/status, content library entries, user access controls (blacklist/roles)
- **Caching strategy (CDN-first)**:
  - Fetch Google Sheets via a serverless API endpoint and return data with CDN cache headers (long TTL + `stale-while-revalidate`)
  - Notes:
    - Great for shared, same-for-all content
    - For truly private/member-only content, avoid publicly cacheable endpoints unless access is enforced server-side
- **File/Media**: Firebase Storage (only if hosting images/videos yourself; otherwise embed/link externally)
- **Hosting**: Vercel (static build output + optional Serverless Functions)

### User Control (Blacklisting & Roles)

- **Default allow**: any signed-in Google account is granted access by default.
- **Blacklist**:
  - Soft block: keep a denylist (blocked emails and/or Firebase UID) in Google Sheets, cached in the app, and enforce checks on protected pages/routes.
  - Hard block: disable a user in Firebase Auth (Admin SDK) to prevent sign-in.
- **Roles**: store `role` (e.g., `member`, `admin`) in Google Sheets and/or mirror into Firebase custom claims for fast authorization checks.

### Admin Dashboard Implementation Notes (Firebase + Vercel, without Next.js)

- **Important security rule**: anything that changes users (disable users, set roles, set custom claims) must run on a **trusted server**.
  - Do **not** call Firebase Admin actions from the browser.
- **Recommended approach**:
  - **Frontend (React/Vite)**: Admin pages (e.g., `/admin/users`) call server endpoints.
  - **Backend**: Vercel **Serverless Functions** that use the **Firebase Admin SDK** (service account credentials via environment variables).
  - **Authorization**: only allow calls if the requester is an admin (verified via Firebase ID token + admin claim/role).
- **Data model suggestion**:
  - Google Sheets as source of truth (blacklist/roles/testimonials/content)
  - Cache the parsed Sheets data (weekly + manual refresh) to avoid rate limits and keep the site fast.
  - Mirror critical permissions into Firebase **custom claims** (`role`, `blocked`) for fast checks in API + Security Rules (optional but recommended).

### Content Storage Approach (recommended split)

- **Mostly static content** (products, training pages, mindset copy): Markdown/config files in the repo (simple, fast, cheap).
- **Dynamic/admin-managed content** (testimonials + approvals, tags, content library rows): Google Sheets.
- **Caching strategy**: sync Google Sheets into cache weekly, and also provide an admin “sync now” action for urgent updates.

### Google Sheets Data & Backup Notes

- **Testimonials moderation in Sheets**: include columns for `status` (e.g., `pending/approved/rejected`), and recommended audit columns like `approved_by`, `approved_at`, `last_edited_by`, `last_edited_at`.
- **Backup strategy**: rely on Google Sheets version history and periodic cloning/copying of the spreadsheet as an operational backup.

### Bandwidth Note (to avoid surprises)

- Linking to or embedding YouTube typically streams from YouTube (not your Vercel bandwidth).
- Bandwidth risk usually comes from hosting large images/videos yourself or proxying external media through your app.