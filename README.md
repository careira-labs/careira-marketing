# Careira Marketing Site

Lightweight Next.js marketing site for Careira (www.careira.com).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
marketing/
├── pages/
│   ├── index.tsx          # Homepage
│   ├── jobseekers.tsx     # Jobseeker landing page
│   └── recruiters.tsx     # Recruiter landing page
├── components/
│   ├── PublicNav.tsx      # Navigation
│   ├── Footer.tsx         # Footer
│   ├── EmailSignupForm.tsx
│   ├── HeroSection.tsx
│   ├── FeatureSteps.tsx
│   └── ...
├── lib/
│   └── api.ts             # API client (waitlist)
├── styles/
│   └── globals.css        # Design tokens
└── public/
    ├── assets/            # Logos
    └── screenshots/       # Product screenshots (ADD THESE)
```

## 📸 Product Screenshots Required

**IMPORTANT:** You need to add product screenshots before the landing pages will display correctly.

See [`public/screenshots/README.md`](public/screenshots/README.md) for the complete list of required screenshots.

**Quick summary:**
- **Jobseekers:** 5 screenshots (hero + 4 steps)
- **Recruiters:** 5 screenshots (hero + 4 steps)

## 🎨 Design System

Design tokens are defined in `styles/globals.css` and match the product app (`frontend/styles/careira.css`).

**Key colors:**
- Navy: `#33374A`
- Coral: `#FF7A6F`
- Canvas: `#F2F4F6`
- Surface: `#FFFFFF`

## 🌐 Pages

- **/** - Homepage (waitlist teaser)
- **/jobseekers** - Landing page for job seekers
- **/recruiters** - Landing page for recruiters

## ✅ Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Email waitlist signup with source tagging
- ✅ Mobile sticky CTA
- ✅ Next.js Image optimization
- ✅ Lazy loading for below-fold images
- ✅ TypeScript
- ✅ Accessible (WCAG AA compliant)

## 🔧 API Integration

Waitlist signups are sent to `https://api.careira.com/waitlist/join`.

**Source tagging:**
- Jobseekers page → `user_type: 'candidate'`
- Recruiters page → `user_type: 'recruiter'`

## 🚢 Deployment

Deploys to Vercel (www.careira.com).

Vercel auto-detects Next.js and uses these settings:
- Build command: `npm run build`
- Output directory: `.next`

## 📝 Notes

- Marketing site is **independent** from the product app (app.careira.com)
- Do NOT import components from `frontend/`
- Maintain design token parity with product app
- Currently in **stealth mode** (no links from homepage)

## 🧪 Testing Checklist

Before deploying:
- [ ] All screenshots added to `public/screenshots/`
- [ ] Homepage works (`/`)
- [ ] Jobseekers page works (`/jobseekers`)
- [ ] Recruiters page works (`/recruiters`)
- [ ] Navigation links work
- [ ] Email forms submit successfully
- [ ] Mobile responsive design tested
- [ ] Mobile sticky CTA appears on scroll
- [ ] No console errors
