# MediHost™ End-to-End Test Checklist
## April 2, 2026

### Pre-requisites
- [ ] Backend deployed on Railway (git push origin main in smartgumastha-backend)
- [ ] Frontend deployed on Vercel (git push origin main in medihost-website)
- [ ] Verify https://medihost.in loads the landing page
- [ ] Verify Railway backend responds: curl https://smartgumastha-backend-production.up.railway.app/api/presence/pricing

### Test 1: Landing Page (medihost.in)
- [ ] Page loads with all 6 sections
- [ ] Nav is sticky on scroll
- [ ] Dashboard preview animates on scroll
- [ ] USP cards have hover effect
- [ ] Comparison table scrolls horizontally on mobile
- [ ] Pricing section loads plans from API (check network tab)
- [ ] Monthly/Yearly toggle switches prices
- [ ] "Business" plan shows "Most popular" badge
- [ ] All "Start trial" buttons link to /signup.html?plan={tier}
- [ ] Footer links work
- [ ] Mobile hamburger menu works

### Test 2: Behavioral Triggers
- [ ] Move mouse to top of page — exit intent popup appears (if activated in admin)
- [ ] Scroll to pricing section, wait 15s — hesitation banner appears (if activated)
- [ ] Visit pricing, leave, come back — return visitor popup (if activated)
- [ ] Check sessionStorage/localStorage that triggers only fire once

### Test 3: Signup Flow (medihost.in/signup.html)
- [ ] Page loads with plan pre-selected from URL param (?plan=business)
- [ ] Plan selector cards work — clicking changes the selected plan
- [ ] Form validation: email format, password strength meter, required fields
- [ ] Submit with valid data → API call to /api/presence/partner-auth/signup
- [ ] Success: JWT saved to localStorage, success animation shown
- [ ] Redirect to /onboard.html after success
- [ ] Error: "Email already exists" shown if duplicate
- [ ] Test with ?coupon=WELCOME20 — verify coupon badge appears
- [ ] Test with ?ref=instagram — verify source is saved

### Test 4: Onboarding Wizard (medihost.in/onboard.html)
- [ ] Redirects to signup if not logged in
- [ ] Step 1: Clinic info form pre-fills name from signup
- [ ] Step 2: Module cards show correctly, included modules have green badge
- [ ] Step 3: Logo upload zone works, color picker works
- [ ] Step 4: Review shows all entered data
- [ ] "Complete setup" → creates hospital + user + branch in backend
- [ ] Success celebration screen shows
- [ ] "Open dashboard" button links to app.hemato.in

### Test 5: Admin Panel (medihost.in/admin.html)
- [ ] Password gate works (MediHost@2026)
- [ ] Dashboard: metric cards load with real data
- [ ] Dashboard: charts render (may show 0 if no data yet)
- [ ] Partners: list loads (empty or with test signups)
- [ ] Create clinic: modal opens, form submits, invite link generated
- [ ] Pricing control: plan cards load with correct prices, edit and save works
- [ ] Offers: create a test coupon "TEST50" with 50% discount
- [ ] Triggers: toggle a trigger on/off, verify save works

### Test 6: Login Page (medihost.in/login.html)
- [ ] Default loads HMS theme (blue)
- [ ] ?product=lis shows purple theme
- [ ] ?product=physio shows teal theme
- [ ] ?product=medihost shows green theme
- [ ] Login with test credentials works
- [ ] "Forgot password" inline flow works
- [ ] Returning user recognition (after first login, reload page)
- [ ] Redirect to correct product URL after login

### Test 7: Payments
- [ ] From pricing page, click upgrade → signup → onboard → dashboard
- [ ] In admin, create an order via API test
- [ ] Razorpay checkout opens (in test mode)
- [ ] PayU form data generates correctly
- [ ] payment-success.html loads with transaction ID
- [ ] payment-failed.html loads with error message

### Test 8: Email Automation
- [ ] Signup triggers welcome email (check Resend dashboard or console.log)
- [ ] Signup triggers admin notification to sai@smartgumastha.com
- [ ] Admin create clinic with invite → invite email logged in email_log table
- [ ] Check email_log table for all sent emails

### Test 9: Mobile Responsive
- [ ] Landing page: all sections readable on 375px width
- [ ] Signup page: form usable on mobile
- [ ] Login page: left panel hidden, form full width
- [ ] Admin: sidebar collapses to hamburger
- [ ] Onboard wizard: steps work on mobile

### Quick Smoke Test (do this first)
1. Open medihost.in — does the landing page load?
2. Click "Start free trial" on Business plan
3. Fill signup form, submit
4. Complete onboarding wizard (4 steps)
5. Click "Open dashboard" — does HMS load?
6. Go to medihost.in/admin.html — can you see the new partner?

### Test Credentials
- Super Admin: sai@smartgumastha.com / Admin@1234
- MediHost Admin: medihost.in/admin.html / MediHost@2026
- Test signup: use any new email
