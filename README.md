# 13 Gold Diamonds - Member Portal

A modern, mobile-first wellness member portal built with React, Vite, and Firebase.

## Features

### Phase 1 (MVP) - Implemented
- ✅ Google Sign-In Authentication
- ✅ Member-only area protection
- ✅ Welcome/Home page with quick links
- ✅ Social Channels page (WhatsApp, Telegram, Social Media)
- ✅ Products page (product info, dosage, benefits)
- ✅ Testimonials page with filtering
- ✅ Mobile-first responsive design
- ✅ Firebase Authentication integration
- ✅ Google Sheets as content source
- ✅ CDN-cached serverless API

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (mobile-first)
- **Routing**: React Router v6
- **Authentication**: Firebase Auth (Google provider)
- **Content Source**: Google Sheets
- **Caching**: CDN headers (s-maxage + stale-while-revalidate)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Firebase project with Google Auth enabled
- Google Cloud project with Sheets API enabled
- Vercel account (for deployment)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd sh-octo-guide
npm install
```

### 2. Environment Variables

Create `.env.local` from the provided template:

```bash
cp .env.example .env.local
```

Fill in your Firebase and Google Sheets credentials. See `ENV_TEMPLATE.md` for detailed setup instructions.

**Required Environment Variables:**
- `VITE_FIREBASE_*` - Firebase client configuration
- `FIREBASE_ADMIN_*` - Firebase Admin SDK (server-side)
- `GOOGLE_SHEETS_*` - Google Sheets API credentials
- `SHEETS_CDN_TTL_SECONDS` - Cache duration (default: 604800 = 7 days)
- `SHEETS_CDN_STALE_WHILE_REVALIDATE_SECONDS` - Stale cache window (default: 86400 = 1 day)

### 3. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Google Authentication
3. Get your web app config and add to `.env.local`
4. Generate a service account key for Admin SDK

### 4. Google Sheets Setup

1. Create/use a Google Cloud project
2. Enable Google Sheets API
3. Create a Service Account and download JSON key
4. Share your Google Sheet with the service account email
5. Add credentials to `.env.local`

### 5. Development

#### Option A: Frontend-only (Vite)

This runs **only** the React SPA. Vercel Serverless Functions under `api/` will **not** run in this mode.

```bash
npm run dev
```

Visit `http://localhost:5173`

#### Option B: Full-stack local dev (Vercel Functions + Vite) — recommended for Admin + Sheets

Use this when you need `/api/*` endpoints locally (e.g. `/api/admin/users`, `/api/sheets`).

1) Install the Vercel CLI (pick one):

```bash
npm install -g vercel
```

or:

```bash
npx vercel@latest --version
```

2) Make sure your env vars are available to Vercel locally

Important: `vercel dev` reliably loads **`.env`** (not always `.env.local`).

- If your `.env.local` already contains **both** client (`VITE_*`) and server (`FIREBASE_ADMIN_*`, `GOOGLE_SHEETS_*`) variables, you can do:

```bash
cp .env.local .env
```

- Otherwise, create/update `.env` and copy the needed values from `ENV_TEMPLATE.md`.

3) Run Vercel dev:

```bash
vercel dev
```

Then open the URL printed by Vercel (commonly `http://localhost:3000`).

Notes:
- `npm run dev` (Vite) will show **mock Admin data** if the backend isn’t running.
- `vercel dev` is required for real Admin actions (approve users, block/enable/delete, promote/demote) and for server-side Google Sheets fetching.

### 6. Build

```bash
npm run build
npm run preview
```

## Deployment to Vercel

### Option 1: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: Via GitHub Integration

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy

### Environment Variables in Vercel

Add all environment variables from `.env.local` to:
**Vercel Project → Settings → Environment Variables**

Set appropriate scopes:
- **Production**: for main branch
- **Preview**: for feature branches (optional)

## Project Structure

```
sh-octo-guide/
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts (Auth)
│   ├── pages/            # Page components
│   ├── lib/              # Firebase config, utilities
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── api/                  # Vercel serverless functions
│   └── sheets.ts         # Google Sheets API endpoint
├── public/               # Static assets
├── .env.example          # Environment template
├── ENV_TEMPLATE.md       # Detailed env setup guide
├── vercel.json           # Vercel configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### GET /api/sheets

Fetches content from Google Sheets with CDN caching.

**Response:**
```json
{
  "success": true,
  "data": {
    "testimonials": [...],
    "contentLibrary": [...],
    "access": [...],
    "lastUpdated": "2025-12-31T12:00:00.000Z"
  }
}
```

**Cache Headers:**
- `Cache-Control: public, s-maxage=604800, stale-while-revalidate=86400`

## Access Control

- **Sign-in**: Any Google account can sign in
- **Approval Required**: Users cannot access member-only areas until an admin approves them
- **Super Admin Bypass**: Emails listed in `VITE_ADMIN_EMAILS` are auto-approved and treated as admins
- **Blocking**: Admins can block users (Firebase Auth `disabled` + optional custom claims)
- **Roles**: `member` and `admin` stored in Firebase custom claims

## Theme & Design

- **Primary Color**: Soft Emerald Green (#3BB497)
- **Secondary Color**: Warm Gold (#F2C94C)
- **Neutral Base**: Off-White (#F7F7F5)
- **Typography**: Poppins/Nunito (headings), Inter/Open Sans (body)
- **Design**: Rounded corners, soft shadows, wellness-inspired

## Future Phases

See `docs/13-GOLD-DIAMONDS-PRD.md` for:
- Phase 2: Business Training, Financial Goals, Mindset Training, Admin Dashboard
- Phase 3: Advanced Search, Law of Attraction Tools, Analytics

## Troubleshooting

### Firebase Auth Issues
- Verify Google provider is enabled in Firebase Console
- Check that `authDomain` matches your Firebase project

### Google Sheets API Errors
- Ensure service account has access to the spreadsheet
- Verify `GOOGLE_SHEETS_SPREADSHEET_ID` is correct
- Check that private key is properly formatted (with `\n`)

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npm run build`

## Support

For questions or issues, refer to:
- PRD: `docs/13-GOLD-DIAMONDS-PRD.md`
- Environment Setup: `ENV_TEMPLATE.md`
- Project Rules: `.cursorrules`

## License

ISC
