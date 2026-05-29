# Razorpay Payment Gateway Setup Guide

## Overview

This project uses Razorpay for payment processing. The configuration automatically detects whether you're running locally or on Render and uses the appropriate API key.

---

## 🚀 Quick Start

### For Local Development (Test Mode)

1. **Get Test Keys from Razorpay:**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
   - Switch to **Test Mode** (toggle at the top)
   - Copy your **Key ID** (starts with `rzp_test_`)

2. **Update `.env` file:**
   ```env
   # Comment out the live key
   # VITE_RAZORPAY_KEY_ID=rzp_live_SumAEof8gTU5To
   
   # Uncomment and add your test key
   VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_HERE
   ```

3. **Run the app:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Test payments:**
   - Use Razorpay's test card numbers:
     - **Success:** 4111 1111 1111 1111
     - **Failure:** 4111 1111 1111 1234
   - Any future expiry date and any CVV works

---

### For Production (Render Deployment)

1. **Get Live Keys from Razorpay:**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
   - Switch to **Live Mode** (toggle at the top)
   - Copy your **Key ID** (starts with `rzp_live_`)

2. **Register Your Domain:**
   - In Razorpay Dashboard, go to **Settings** → **Website & App Settings**
   - Add your domain: `tuhi.onrender.com`
   - Complete KYC verification if not done

3. **Update `.env` file:**
   ```env
   # Comment out the test key
   # VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
   
   # Uncomment and add your live key
   VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_HERE
   ```

4. **Deploy to Render:**
   ```bash
   git push origin main
   ```
   Render will automatically use the live key.

---

## 🔧 How Auto-Detection Works

The app automatically detects the environment and uses the appropriate key:

```typescript
// Auto-detect environment
const isProduction =
  window.location.hostname === "tuhi.onrender.com" ||
  (window.location.hostname === "localhost") === false;

const razorpayKey = isProduction
  ? import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SumAEof8gTU5To"
  : import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXXXX";
```

**Detection Logic:**
- `localhost` → Uses **Test Mode**
- `tuhi.onrender.com` → Uses **Live Mode**
- Any other hostname → Uses **Live Mode**

---

## 📋 Environment Variables

| Variable | Description | Local | Production |
|----------|-------------|-------|------------|
| `VITE_RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_test_...` | `rzp_live_...` |

---

## 🧪 Testing Checklist

### Local Testing (Test Mode)
- [ ] Test card payment succeeds
- [ ] Test card payment fails
- [ ] Payment modal opens correctly
- [ ] Payment confirmation appears
- [ ] WhatsApp booking opens after payment
- [ ] Console shows "Razorpay Mode: TEST"

### Production Testing (Live Mode)
- [ ] Domain is registered in Razorpay
- [ ] KYC is completed
- [ ] Live key is configured
- [ ] Real payment processes successfully
- [ ] Console shows "Razorpay Mode: LIVE"

---

## ⚠️ Important Notes

1. **Domain Registration Required for Live Mode:**
   - Razorpay requires you to register your production domain
   - Without registration, payments will fail with "Invalid domain" error

2. **KYC Verification:**
   - Complete KYC in Razorpay Dashboard to receive live payments
   - Until KYC is complete, you can only use test mode

3. **Security:**
   - Never commit `.env` file to Git (it's in `.gitignore`)
   - Keep your live keys secret
   - Use environment variables in Render dashboard for production

4. **Vite Prefix:**
   - The `VITE_` prefix is required for client-side access
   - Without it, the variable won't be available in the browser

---

## 🐛 Troubleshooting

### "Invalid domain" error
**Solution:** Register `tuhi.onrender.com` in Razorpay Dashboard → Settings → Website & App Settings

### Payments not working locally
**Solution:** 
1. Make sure you're using a test key (`rzp_test_...`)
2. Check browser console for "Razorpay Mode: TEST"
3. Use test card numbers, not real cards

### "Key not found" error
**Solution:** 
1. Verify `.env` file exists in project root
2. Check `VITE_RAZORPAY_KEY_ID` is set correctly
3. Restart dev server after changing `.env`

### Razorpay modal doesn't open
**Solution:**
1. Check browser console for errors
2. Verify internet connection (Razorpay script loads from CDN)
3. Check if ad blockers are blocking Razorpay

---

## 📚 Resources

- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/)
- [Razorpay Standard Checkout Documentation](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)
- [Render Deployment Docs](https://render.com/docs)

---

## 🔄 Switching Between Test and Live Mode

### To Test Locally:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
```

### To Deploy to Production:
```env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY
```

The app will automatically use the correct mode based on the hostname!

---

**Last Updated:** 2026-05-29
