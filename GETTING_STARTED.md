# Getting Started - 13 Gold Diamonds Member Portal

## ✅ What's Been Built

Your **Phase 1 (MVP)** member portal is now complete! Here's what you have:

### 🔐 Authentication & Access Control
- ✅ Google Sign-In (Firebase Auth)
- ✅ Protected member-only routes
- ✅ Automatic sign-in/sign-out flow
- ✅ Blocked user page (for blacklisted accounts)

### 📄 Pages (Mobile-First Design)
- ✅ **Login Page** - Clean Google sign-in interface
- ✅ **Home Page** - Welcome message + quick links + mindset intro
- ✅ **Social Channels** - WhatsApp, Telegram, and social media links
- ✅ **Products** - Product info, dosage, benefits, how to use
- ✅ **Testimonials** - Success stories with filtering options

### 🎨 Design & UI
- ✅ Mobile-first responsive design (works on all screen sizes)
- ✅ Wellness-themed colors (Emerald Green + Warm Gold)
- ✅ Clean, modern UI with rounded corners and soft shadows
- ✅ Sticky navigation header
- ✅ Mobile hamburger menu

### ⚙️ Backend & Integration
- ✅ Google Sheets API integration (serverless function)
- ✅ CDN caching (7-day cache with stale-while-revalidate)
- ✅ Vercel-ready configuration
- ✅ Environment variable management

## 🚀 Next Steps

### 1. Set Up Your Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your actual values. See `ENV_TEMPLATE.md` for detailed setup instructions for:
- Firebase (client + admin)
- Google Sheets API
- Cache TTL settings

### 2. Test Locally

```bash
# Install dependencies (if not done already)
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` and try signing in with Google.

### 3. Prepare Your Google Sheet

Create a Google Sheet with these tabs:
- **Testimonials** (for user success stories)
- **ContentLibrary** (for podcasts, blogs, videos)
- **Access** (for blacklist/roles management)

**Important:** Share the sheet with your Google service account email (from step 1).

### 4. Deploy to Vercel

```bash
# Option A: Using Vercel CLI
npm install -g vercel
vercel login
vercel

# Option B: GitHub Integration
# 1. Push code to GitHub
# 2. Import project in Vercel dashboard
# 3. Add environment variables
# 4. Deploy
```

**Remember:** Add all your environment variables to Vercel project settings!

## 📱 Testing Checklist

Before going live, test these flows:

- [ ] Google sign-in works
- [ ] Protected pages redirect to login when not signed in
- [ ] Navigation menu works on mobile and desktop
- [ ] All pages are responsive (test on phone/tablet)
- [ ] External links (WhatsApp, Telegram, social media) work
- [ ] Product information displays correctly
- [ ] Testimonials filtering works
- [ ] Sign out works and returns to login page

## 📝 Customization Needed

Before launch, update these placeholder values:

### Social Channels Page (`src/pages/SocialChannels.tsx`)
- Replace `#` with actual WhatsApp group links
- Replace `#` with actual Telegram group links
- Replace `#` with actual social media URLs

### Products Page (`src/pages/Products.tsx`)
- Replace sample products with your actual products
- Update product names, descriptions, benefits, and dosage

### Google Sheets
- Set up your actual sheet structure
- Add real testimonials (with `status` column for approval flow)

## 🔧 Common Issues & Solutions

### "Firebase Auth not configured"
- Check that Google provider is enabled in Firebase Console
- Verify all `VITE_FIREBASE_*` vars are set in `.env.local`

### "Failed to fetch content"
- Verify Google Sheets service account has access to the sheet
- Check that `GOOGLE_SHEETS_SPREADSHEET_ID` is correct
- Ensure private key is properly formatted with `\n` characters

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📚 Key Files to Know

- **`src/App.tsx`** - Main app with routing
- **`src/contexts/AuthContext.tsx`** - Authentication logic
- **`src/components/Layout.tsx`** - Navigation and layout
- **`src/pages/`** - All page components
- **`api/sheets.ts`** - Google Sheets serverless function
- **`vercel.json`** - Vercel deployment configuration
- **`.cursorrules`** - Project coding standards

## 🎯 Next Phases (Future)

Ready to continue? See `docs/13-GOLD-DIAMONDS-PRD.md` for:

### Phase 2 - Essential Features
- Business Training pages
- Financial Goals section
- Mindset Training content
- Admin Dashboard (user management)
- Content management tools

### Phase 3 - Enhancements
- Advanced search
- Law of Attraction tools
- Analytics dashboards

## 💡 Pro Tips

1. **Use Vercel Preview Deployments** - Test changes on a preview URL before merging to main
2. **Set Up Different Environments** - Use environment variables to separate dev/staging/production
3. **Monitor Google Sheets API Usage** - Stay within rate limits by using the CDN cache
4. **Regular Backups** - Periodically clone your Google Sheet as a backup

## 🆘 Need Help?

- Check `README.md` for full documentation
- Review `ENV_TEMPLATE.md` for environment setup
- See `docs/13-GOLD-DIAMONDS-PRD.md` for the complete product vision

---

**Ready to launch your wellness community?** 🌿✨

Start with `npm run dev` and customize the content to match your brand!

