# TUHI Car Rental - Deployment Guide

## 📋 Overview

This document explains how to deploy TUHI Car Rental to production.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Git
- Cloudflare account (for deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

**Why Cloudflare?**
- Free tier with generous limits
- Global CDN
- Built-in Workers for server-side logic
- D1 database for persistent data

**Steps:**

1. **Create Cloudflare Account**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign up / Log in

2. **Get API Token**
   - Go to My Profile → API Tokens
   - Create Custom Token with:
     - `Account:Workers Scripts:Edit`
     - `Account:Cloudflare Pages:Edit`

3. **Get Account ID**
   - From Cloudflare Dashboard
   - Workers & Pages → Overview
   - Copy Account ID

4. **Add GitHub Secrets**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add:
     - `CLOUDFLARE_API_TOKEN` - Your API token
     - `CLOUDFLARE_ACCOUNT_ID` - Your account ID
     - `VITE_ADMIN_USERNAME` - Admin username
     - `VITE_ADMIN_PASSWORD` - Admin password
     - `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` - Maps API key
     - `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID` - GA tracking ID

5. **Deploy**
   - Push to main branch
   - GitHub Actions will auto-deploy

---

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Add Environment Variables in Vercel Dashboard:**
- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`
- `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`
- `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID`

---

### Option 3: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site from Git → Connect repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables
6. Deploy

---

## 📁 Project Structure

```
drive-smooth-india-main/
├── public/              # Static files
│   └── robots.txt
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities & server functions
│   │   ├── admin.server.ts    # Admin CRUD operations
│   │   ├── data.server.ts     # Data layer (fs operations)
│   │   └── cars.ts            # Static car data
│   ├── routes/         # Pages & API routes
│   │   ├── admin/     # Admin panel pages
│   │   └── api-server/ # Server functions
│   ├── styles.css      # Global styles
│   └── router.tsx      # Route configuration
├── data/               # JSON data files (⚠️ not persistent in cloud)
│   ├── cars.json       # Fleet data
│   ├── bookings.json  # Booking records
│   └── customers.json  # Customer data
├── .env                # Environment variables (NOT committed)
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
└── wrangler.jsonc     # Cloudflare config
```

---

## ⚠️ Important Notes

### Data Persistence

The `data/` folder contains JSON files that store your data. In most cloud platforms:

| Platform | Data Persistent? | Solution |
|----------|-----------------|----------|
| Cloudflare Pages | ❌ No | Use Cloudflare D1 |
| Vercel | ❌ No | Use Vercel Postgres |
| Netlify | ❌ No | Use Netlify Blobs |
| Local Dev | ✅ Yes | Uses filesystem |

**For production, migrate to a database:**

```bash
# Example: Cloudflare D1
wrangler d1 create tuhi-carrental
wrangler d1 execute tuhi-carrental --file=./schema.sql
```

### Environment Variables

**Never commit `.env` to Git!**

The `.env` file contains:
- Admin credentials
- Google Maps API keys
- Analytics tracking IDs

Use GitHub Secrets or platform environment variables instead.

---

## 🔧 GitHub Setup

### Create Repository

```bash
# Navigate to project
cd "c:\Users\yurek\Downloads\drive-smooth-india-main\drive-smooth-india-main"

# Initialize git
git init

# Configure (replace with your info)
git config user.email "your@email.com"
git config user.name "Your Name"

# Add all files
git add .

# Commit
git commit -m "TUHI Car Rental - Initial setup"

# Create repo on GitHub first, then:
git remote add origin https://github.com/USERNAME/repo-name.git

# Push
git branch -M main
git push -u origin main
```

### Required GitHub Secrets

| Secret Name | Description | Where to Get |
|-------------|--------------|--------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | dash.cloudflare.com → Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | Workers & Pages → Overview |
| `VITE_ADMIN_USERNAME` | Admin login username | Your choice |
| `VITE_ADMIN_PASSWORD` | Admin login password | Your choice |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` | Google Maps key | Google Cloud Console |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID` | GA tracking ID | Google Analytics |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Run type check
npm run typecheck

# Build check
npm run build
```

---

## 📞 Support

For deployment issues, check:
- GitHub Actions logs
- Cloudflare Pages dashboard
- Vercel/Netlify deployment logs

---

## ✅ Checklist Before Going Live

- [ ] Set all environment variables
- [ ] Test admin panel functionality
- [ ] Test booking flow
- [ ] Verify Google Maps integration
- [ ] Check mobile responsiveness
- [ ] Test WhatsApp integration
- [ ] Verify SEO meta tags
- [ ] Test CSV export
- [ ] Check all pages load correctly
- [ ] Test 404 error page
- [ ] Setup analytics
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS