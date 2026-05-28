# 🌾 Mujanti — Website Repository

> FPO Services, Carbon Credits & Sustainability Consulting India

**Live site:** https://mujanti.github.io (or your custom domain once configured)

---

## 📁 Repository Structure

```
mujanti/
├── index.html          ← Main website (do not rename)
├── privacy.html        ← Privacy Policy page
├── terms.html          ← Terms & Conditions page
├── 404.html            ← Custom error page
├── content/            ← ⭐ TEAM EDITS GO HERE
│   ├── site.json       ← Brand name, contact details, social links
│   ├── services.json   ← Service cards (add/edit/remove services)
│   ├── projects.json   ← Case studies / project portfolio
│   ├── testimonials.json ← Farmer testimonials
│   └── faq.json        ← FAQ questions and answers
├── assets/             ← Images, logos (add your own here)
│   └── og-image.jpg    ← Social preview image (1200×630px)
└── README.md           ← This file
```

---

## ✏️ How to Edit Content (No Coding Needed)

All content that changes frequently lives in the `content/` folder as simple JSON files.

### Edit on GitHub directly:
1. Go to the `content/` folder in this repo
2. Click the file you want to edit (e.g. `testimonials.json`)
3. Click the **pencil icon** (Edit this file) in the top right
4. Make your changes
5. Click **"Commit changes"** at the bottom
6. The site updates automatically in ~2 minutes ✅

### What each file controls:

| File | What you can edit |
|------|------------------|
| `site.json` | Brand name, phone, email, WhatsApp, Calendly link, social media links |
| `services.json` | Add, edit, or remove service cards on the homepage |
| `projects.json` | Add case studies with project name, location, description, metrics |
| `testimonials.json` | Add farmer/client quotes with name, role, and rating |
| `faq.json` | Add, edit, or remove FAQ questions and answers |

### Example — Adding a new testimonial:
Open `content/testimonials.json` and add a new entry:
```json
{
  "initial": "A",
  "name": "Arjun Kumar",
  "role": "Chairman, Bihar Wheat Farmers FPC",
  "quote": "Write the testimonial text here...",
  "stars": 5
}
```

---

## 🚀 Deploying Changes

This site uses **GitHub Pages** — every commit to the `main` branch auto-deploys.
- Changes go live in **1–3 minutes** after committing
- No build step, no deployment commands needed
- Check live status: **Settings → Pages**

---

## 🌐 Connecting a Custom Domain

1. Buy your domain (e.g. `mujanti.in`) from Hostinger or BigRock (~₹700/yr)
2. In GitHub: **Settings → Pages → Custom Domain** → enter `mujanti.in`
3. At your domain registrar, add these DNS records:
   ```
   Type: A     Name: @      Value: 185.199.108.153
   Type: A     Name: @      Value: 185.199.109.153
   Type: A     Name: @      Value: 185.199.110.153
   Type: A     Name: @      Value: 185.199.111.153
   Type: CNAME Name: www    Value: mujanti.github.io
   ```
4. Wait 10–30 minutes for DNS to propagate
5. Check **"Enforce HTTPS"** in GitHub Pages settings ✅

---

## 📞 Updating Contact Information

Edit `content/site.json` — change the `contact` section:
```json
"contact": {
  "whatsapp": "+919XXXXXXXXX",
  "email": "hello@mujanti.in",
  "phone": "+919XXXXXXXXX",
  "calendly_url": "https://calendly.com/yourname/consultation"
}
```

---

## 🔒 Privacy & Legal Pages

- **Privacy Policy:** `privacy.html` — Update company address and contact details
- **Terms & Conditions:** `terms.html` — Review with your legal advisor before launch
- Both pages link back to the homepage automatically

---

## 🧑‍💻 For Developers

- Single-file static site — all CSS and JS inline in `index.html`
- No build tools, no npm, no dependencies
- Google Fonts loaded via CDN
- Background images via Unsplash CDN (replace with your own in `assets/`)
- Form submission via Formspree (configure endpoint in `index.html` contact section)

---

## 📋 Pre-Launch Checklist

- [ ] Update `content/site.json` with real phone, email, WhatsApp
- [ ] Add Formspree endpoint to contact form in `index.html`
- [ ] Add Calendly link in `content/site.json`
- [ ] Add Google Analytics ID in `content/site.json`
- [ ] Add real case study images to `assets/` folder
- [ ] Update `assets/og-image.jpg` (1200×630px for social sharing)
- [ ] Register domain and connect to GitHub Pages
- [ ] Get Privacy Policy reviewed by a legal advisor
- [ ] Create Google Business Profile
- [ ] Test on mobile before announcing launch

---

*Built with ❤️ for India's farming communities.*
