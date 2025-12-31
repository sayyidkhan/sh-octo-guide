# 13 Gold Diamonds Member Portal - Sitemap

**Version:** 1.0  
**Last Updated:** December 31, 2025  
**Status:** Draft for Review

---

## Overview

This sitemap defines the complete information architecture for the 13 Gold Diamonds Member Portal, organized by implementation phases. Features are marked as **✅ Implemented**, **🔄 Planned**, or **💡 Future**.

---

## 1. Public Pages (No Authentication Required)

### 1.1 Landing Page `/`
- **Status:** ✅ Implemented
- **Access:** Public
- **Purpose:** First point of contact, marketing message
- **Content:**
  - Value proposition headline
  - Key benefits overview
  - Call-to-action to sign in/register
  - Featured testimonials preview
  - Visual branding (13 Gold Diamonds)

### 1.2 Login Page `/login`
- **Status:** ✅ Implemented
- **Access:** Public
- **Purpose:** Authentication entry point
- **Features:**
  - Google Sign-In button (OAuth)
  - Welcome message
  - Terms & privacy links (if applicable)
  - Redirect to dashboard after successful login

### 1.3 Blocked Page `/blocked`
- **Status:** ✅ Implemented
- **Access:** Public (shown to blocked users)
- **Purpose:** Inform users their access has been restricted
- **Content:**
  - Clear message about account status
  - Contact information for support
  - Reason for block (if appropriate)

### 1.4 Pending Approval Page `/pending`
- **Status:** ✅ Implemented
- **Access:** Authenticated users awaiting approval
- **Purpose:** Hold page for new users pending admin approval
- **Content:**
  - Welcome message
  - Expected timeline for approval
  - What to expect next
  - Contact information

---

## 2. Member Area (Authentication Required)

All pages below require user to be authenticated and have `member` or `admin` role.

### 2.1 Home / Welcome Dashboard `/dashboard` or `/home`
- **Status:** ✅ Implemented
- **Access:** All authenticated members
- **Purpose:** Member portal homepage, navigation hub
- **Content:**
  - Personalized welcome message (with user's name)
  - Quick access cards to main sections:
    - 👥 Social Channels
    - 🌿 Products
    - ⭐ Testimonials
    - 💼 Business Training (Phase 2)
    - 💰 Financial Goals (Phase 2)
    - 🧠 Mindset Training (Phase 2)
    - 📚 Content Library (Phase 2)
  - "The 13 Gold Diamond Mindset" section
    - ✓ This is a business and should be run like one
    - ✓ This is not a hobby - it's your path to success
    - ✓ Drinking the coffee = becoming a CEO
  - Call-to-action: "Your 3-year journey to success starts today"

### 2.2 Social Channels `/social`
- **Status:** ✅ Implemented
- **Access:** All authenticated members
- **Purpose:** Connect members to community channels
- **Sections:**
  - **WhatsApp Groups**
    - Main community group
    - Regional/language-specific groups
    - Direct join links
  - **Telegram Groups**
    - Announcements channel
    - Discussion groups
    - Training & resources channel
  - **Social Media Pages**
    - Instagram (follow link)
    - Facebook page/group
    - YouTube channel
    - TikTok (if applicable)
    - LinkedIn (if applicable)
- **Features:**
  - One-click join/follow buttons
  - QR codes for easy mobile access
  - Description of each channel's purpose

### 2.3 Products `/products`
- **Status:** ✅ Implemented
- **Access:** All authenticated members
- **Purpose:** Comprehensive product information
- **Content:**
  - Product catalog with images
  - **For each product:**
    - What it is
    - How to take it
    - Recommended dosage
    - Health benefits
    - Usage instructions
    - Safety information
    - FAQs
  - **Phase 2 Enhancements (🔄 Planned):**
    - Detailed image galleries
    - Video demonstrations
    - Customer reviews/ratings
  - **Phase 3 Enhancements (💡 Future):**
    - Price list
    - Where to purchase links
    - Comparison charts

### 2.4 Testimonials `/testimonials`
- **Status:** ✅ Implemented (Basic)
- **Access:** All authenticated members
- **Purpose:** Showcase member success stories
- **Current Features:**
  - Display approved testimonials
  - Basic filtering
  - User avatars and names
- **Phase 2 Enhancements (🔄 Planned):**
  - **Organized by Product Taken**
    - Filter testimonials by specific product
  - **Organized by Health Issue Resolved**
    - Categories: Weight loss, Energy, Sleep, Digestion, Mental clarity, etc.
  - **Filter by Tags**
    - Multiple tag selection
    - Tags: Quick results, Long-term benefits, Life-changing, etc.
  - **Testimonial Submission Form** (members can submit)
  - **Admin Approval Workflow** (tied to Google Sheets)

### 2.5 Business Training `/training` or `/business`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** All authenticated members
- **Purpose:** Train members on business methods
- **Sections:**

#### 2.5.1 Overview
- Introduction to the business model
- Success mindset primer
- Getting started checklist

#### 2.5.2 The 3×7 Method
- Explanation of the method
- Step-by-step guide
- Examples and case studies
- Action plan template

#### 2.5.3 The 111 Coffee Method
- What it is and why it works
- How to implement
- Scripts and talking points
- Tracking progress

#### 2.5.4 The 1 Simple Method
- Core principles
- Implementation guide
- Best practices
- Common mistakes to avoid

#### 2.5.5 Group Lunch Treat Method
- Event planning guide
- Invitation templates
- Presentation materials
- Follow-up strategies

#### 2.5.6 Resources
- Downloadable templates
- Checklists
- Scripts for conversations
- Video tutorials

### 2.6 Financial Goals `/financial-goals`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** All authenticated members
- **Purpose:** Help members achieve income targets
- **Content:**

#### 2.6.1 Income Target Calculator
- Set your monthly goal (e.g., $60k/month)
- Breakdown of required activities
- Timeline projection

#### 2.6.2 System Breakdown
- How income is generated
- Leverage and multiplication
- Passive vs. active income streams

#### 2.6.3 Step-by-Step Path to $60k/Month
- Month 1-3: Foundation building
- Month 4-6: Growth phase
- Month 7-12: Scaling up
- Year 2-3: Multiplication and leverage

#### 2.6.4 Tracking Dashboard (optional enhancement)
- Personal progress tracker
- Milestones and achievements
- Leaderboard (gamification)

### 2.7 Mindset Training `/mindset`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** All authenticated members
- **Purpose:** Develop success mindset
- **Content:**

#### 2.7.1 Core Principles
- This is a business and should be run like one
- This is not a hobby - it's your path to success
- Drinking the coffee = becoming a CEO
- Commitment over 3 years

#### 2.7.2 The 3-Year Graph
- Visual representation of growth journey
- Expected challenges and breakthroughs
- Real member examples
- Where you'll be in 1, 2, and 3 years

#### 2.7.3 Daily Practices
- Morning routines
- Affirmations
- Visualization exercises
- Accountability methods

#### 2.7.4 Overcoming Obstacles
- Common challenges
- Success stories from those who persevered
- Community support resources

### 2.8 Content Library `/library`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** All authenticated members
- **Purpose:** Centralized learning resources
- **Sections:**

#### 2.8.1 Podcasts
- Embedded or linked episodes
- Organized by topic
- Transcripts (optional)

#### 2.8.2 Blogs & Articles
- Educational content
- Success stories
- Industry news
- Health & wellness tips

#### 2.8.3 Training Videos
- Embedded YouTube videos
- Organized by category:
  - Product education
  - Business training
  - Testimonial recordings
  - Mindset training
- Playlists for different learning paths

#### 2.8.4 Step-by-Step Guides
- PDF downloads
- Illustrated guides
- Checklists and worksheets
- Templates

#### 2.8.5 SH Website Navigation Guide
- How to use the main company website
- Ordering process
- Account management
- Troubleshooting

### 2.9 Law of Attraction Tools `/loa`
- **Status:** 💡 Future (Phase 3)
- **Access:** All authenticated members
- **Purpose:** Provide manifestation tools
- **Potential Content:**
  - Vision board creator
  - Guided meditations
  - Manifestation journal
  - Success affirmations
  - Goal-setting worksheets
  - Community accountability groups

### 2.10 Advanced Search `/search`
- **Status:** 💡 Future (Phase 3)
- **Access:** All authenticated members
- **Purpose:** Universal search across all content
- **Features:**
  - Search products, testimonials, guides, training
  - Filter by content type
  - Recent searches
  - Popular searches

---

## 3. Admin Area (Admin Role Required)

All pages below require `admin` role.

### 3.1 Admin Dashboard `/admin`
- **Status:** ✅ Implemented (Basic)
- **Access:** Admin only
- **Purpose:** Central admin control panel
- **Content:**
  - Overview statistics
  - Quick actions menu
  - Recent activity log
  - Links to all admin functions

### 3.2 User Management `/admin/users`
- **Status:** ✅ Implemented
- **Access:** Admin only
- **Purpose:** Manage member access and roles
- **Features:**
  - **View Users**
    - List all members
    - Display: Email, Display Name, Role, Status, Created Date, Last Sign-In
    - Search and filter users
  - **Access Control**
    - Default: Allow all Google sign-ins
    - Soft block (blacklist via Google Sheets)
    - Hard block (disable Firebase Auth user)
  - **Role Management**
    - Assign roles: `member`, `admin`
    - Bulk role updates
  - **User Actions**
    - View user details
    - Block/unblock user
    - Delete user (if necessary)
    - Resend approval notification
  - **Audit Trail** (recommended)
    - Log of admin actions
    - Who changed what and when

### 3.3 Content Management `/admin/content`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** Admin only
- **Purpose:** Create and edit site content
- **Sections:**

#### 3.3.1 Product Management
- Add/edit/delete products
- Upload product images
- Manage product descriptions, dosage, benefits
- Set product visibility

#### 3.3.2 Content Library Management
- Upload/link podcasts
- Add blog articles
- Embed/link videos
- Upload guides and PDFs
- Organize by category

#### 3.3.3 Training Content
- Edit business training pages
- Update financial goal calculators
- Manage mindset training content

#### 3.3.4 Social Channels
- Update group links
- Manage social media URLs
- Edit descriptions

### 3.4 Testimonials Management `/admin/testimonials`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** Admin only
- **Purpose:** Moderate and approve testimonials
- **Features:**
  - **Pending Approvals Queue**
    - List of submitted testimonials awaiting review
    - Preview testimonial content
    - Member information
  - **Approval Actions**
    - Approve
    - Reject (with reason)
    - Request edits
  - **Edit Testimonials**
    - Edit text for clarity/grammar
    - Add/edit tags
    - Assign to product categories
    - Assign to health issue categories
  - **Published Testimonials**
    - View all approved testimonials
    - Unpublish if needed
    - Edit or delete
  - **Testimonial Settings**
    - Auto-approve trusted members (optional)
    - Notification settings
    - Display settings (order, featured, etc.)

### 3.5 Google Sheets Sync `/admin/sync`
- **Status:** 🔄 Planned (Phase 2)
- **Access:** Admin only
- **Purpose:** Manual data sync from Google Sheets
- **Features:**
  - "Sync Now" button to refresh cache
  - Last sync timestamp
  - Sync status and logs
  - Automatic weekly sync schedule info

### 3.6 Analytics Dashboard `/admin/analytics`
- **Status:** 💡 Future (Phase 3)
- **Access:** Admin only
- **Purpose:** Track platform usage and engagement
- **Metrics:**
  - Total members
  - Active users (daily/weekly/monthly)
  - Page views by section
  - Most viewed content
  - Testimonial submissions
  - Social channel click-throughs
  - User growth over time
  - Geographic distribution (if available)

### 3.7 Settings `/admin/settings`
- **Status:** 💡 Future (Phase 3)
- **Access:** Admin only
- **Purpose:** Platform configuration
- **Features:**
  - Site-wide announcements
  - Maintenance mode toggle
  - Cache management
  - Email notification templates
  - Theme customization (if needed)
  - Translation management (if multilingual)

---

## 4. Navigation Structure

### Primary Navigation (Member View)
```
┌─────────────────────────────────────────┐
│  13 Gold Diamonds Logo                  │
├─────────────────────────────────────────┤
│  Home  │  Social Channels  │  Products  │
│  Testimonials  │  Training  │  Library   │
│  User Menu (Name + Sign Out)            │
└─────────────────────────────────────────┘
```

### Primary Navigation (Admin View)
```
┌─────────────────────────────────────────┐
│  13 Gold Diamonds Logo                  │
├─────────────────────────────────────────┤
│  Home  │  Social Channels  │  Products  │
│  Testimonials  │  Training  │  Library   │
│  **Admin**  │  User Menu (Name + Sign Out) │
└─────────────────────────────────────────┘
```

### Mobile Navigation
- Hamburger menu (☰)
- Collapsible vertical menu
- All navigation items stacked
- User info at bottom
- Sign Out button prominent

### Footer (All Pages)
```
┌─────────────────────────────────────────┐
│  © 2025 13 Gold Diamonds                │
│  All rights reserved                     │
└─────────────────────────────────────────┘
```

---

## 5. User Flows

### 5.1 New User Onboarding
1. User visits landing page `/`
2. Clicks "Sign In with Google"
3. Redirected to `/login`
4. Authenticates with Google
5. Account created automatically (default allow)
6. Redirected to `/dashboard` (welcome page)
7. Explores Social Channels, Products, Testimonials

**Alternative Flow (If Manual Approval Required):**
- After authentication → `/pending` (pending approval page)
- Admin approves via `/admin/users`
- User receives notification (email or in-app)
- User can access `/dashboard`

### 5.2 Member Journey
1. **Week 1:** Explore Social Channels, join WhatsApp/Telegram
2. **Week 1-2:** Learn about Products, understand benefits
3. **Week 2-3:** Read Testimonials for motivation
4. **Month 1:** Start Business Training (Phase 2)
5. **Month 1-3:** Set Financial Goals, track progress (Phase 2)
6. **Ongoing:** Consume Content Library, participate in community
7. **Ongoing:** Apply Mindset Training principles

### 5.3 Admin Content Management Flow
1. Admin logs in
2. Navigates to `/admin`
3. Selects content area (Products, Testimonials, Library)
4. Creates/edits content
5. Saves changes
6. Content syncs to Google Sheets (or updates locally)
7. Changes reflect on member-facing pages
8. (Optional) Admin triggers manual cache refresh

---

## 6. Access Control Matrix

| Page/Section | Public | Member | Admin |
|--------------|--------|--------|-------|
| Landing (`/`) | ✅ | ✅ | ✅ |
| Login (`/login`) | ✅ | ✅ | ✅ |
| Blocked (`/blocked`) | ✅ | ✅ | ✅ |
| Pending (`/pending`) | ❌ | ✅ (if pending) | ✅ |
| Home/Dashboard | ❌ | ✅ | ✅ |
| Social Channels | ❌ | ✅ | ✅ |
| Products | ❌ | ✅ | ✅ |
| Testimonials | ❌ | ✅ | ✅ |
| Business Training | ❌ | ✅ | ✅ |
| Financial Goals | ❌ | ✅ | ✅ |
| Mindset Training | ❌ | ✅ | ✅ |
| Content Library | ❌ | ✅ | ✅ |
| Law of Attraction | ❌ | ✅ | ✅ |
| Search | ❌ | ✅ | ✅ |
| Admin Dashboard | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ✅ |
| Content Management | ❌ | ❌ | ✅ |
| Testimonials Mgmt | ❌ | ❌ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| Settings | ❌ | ❌ | ✅ |

---

## 7. Implementation Phases Summary

### ✅ Phase 1: MVP (Completed)
- Authentication (Google Sign-In)
- Basic member area protection
- Home/Dashboard
- Social Channels page
- Products page
- Testimonials page (basic)
- Mobile-responsive layout
- CDN-cached Google Sheets API
- Admin user management (basic)

### 🔄 Phase 2: Essential Features (Planned)
- Testimonial filtering & organization
- Testimonial submission & approval workflow
- Business Training section (all methods)
- Financial Goals section
- Mindset Training section
- Content Library (podcasts, blogs, videos, guides)
- Enhanced admin dashboard
- Content management interfaces
- Testimonials management interface

### 💡 Phase 3: Enhancements (Future)
- Advanced search across all content
- Law of Attraction tools
- Product price lists & galleries
- Analytics dashboard
- Platform settings & customization
- Translation support (if needed)
- Community features (forums, direct messaging)

---

## 8. Technical Notes

### Data Sources
- **Static Content:** React components, config files
- **Dynamic Content:** Google Sheets (testimonials, content library, user access)
- **Cache Strategy:** CDN-cached serverless API (7-day TTL + stale-while-revalidate)
- **Authentication:** Firebase Auth (Google provider)
- **User Management:** Firebase Admin SDK via Vercel Serverless Functions

### Key Routes Structure
```
/                          → Landing (public)
/login                     → Login (public)
/blocked                   → Blocked notice (public)
/pending                   → Pending approval (auth required)

/dashboard or /home        → Member homepage (auth required)
/social                    → Social Channels (auth required)
/products                  → Products (auth required)
/testimonials              → Testimonials (auth required)
/training or /business     → Business Training (auth required, Phase 2)
/financial-goals           → Financial Goals (auth required, Phase 2)
/mindset                   → Mindset Training (auth required, Phase 2)
/library                   → Content Library (auth required, Phase 2)
/loa                       → Law of Attraction (auth required, Phase 3)
/search                    → Universal Search (auth required, Phase 3)

/admin                     → Admin Dashboard (admin only)
/admin/users               → User Management (admin only)
/admin/content             → Content Management (admin only, Phase 2)
/admin/testimonials        → Testimonials Mgmt (admin only, Phase 2)
/admin/sync                → Google Sheets Sync (admin only, Phase 2)
/admin/analytics           → Analytics (admin only, Phase 3)
/admin/settings            → Settings (admin only, Phase 3)
```

---

## 9. Discussion Points & Questions

Please review and provide feedback on:

1. **Navigation Structure:** Does the primary navigation make sense? Too many items?
2. **Content Organization:** Are the sections logically grouped?
3. **Phase Priorities:** Do Phase 2 priorities align with business needs?
4. **Admin Features:** Are the admin tools sufficient for content management?
5. **User Flows:** Does the onboarding flow work for your membership model?
6. **Missing Features:** What's missing that should be included?
7. **Naming Conventions:** Are page names clear and intuitive?
8. **Access Control:** Is the member/admin split appropriate?
9. **Mobile Experience:** Any special mobile considerations?
10. **Phase 3 Ideas:** Which "nice to have" features are most valuable?

---

## 10. Next Steps

1. **Review this sitemap** with stakeholders
2. **Gather feedback** and requested changes
3. **Prioritize Phase 2 features** based on business value
4. **Create wireframes/mockups** for key pages
5. **Define content requirements** for each section
6. **Plan Google Sheets structure** for dynamic content
7. **Begin Phase 2 development**

---

## Appendix: Page Details Template

For each page to be built, we'll define:

- **URL:** `/page-url`
- **Title:** Page Title
- **Access Level:** Public / Member / Admin
- **Purpose:** What problem does this page solve?
- **Content Sections:** List of content blocks
- **User Actions:** What can users do on this page?
- **Data Sources:** Where does content come from?
- **Success Metrics:** How do we measure success?
- **Mobile Considerations:** Any special mobile UI needs?

---

**Document End**

*For questions or feedback, please contact the project team.*

