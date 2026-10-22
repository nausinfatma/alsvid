# Alsvid Infocom Pvt Ltd - Website Project

Modern, responsive corporate website built with **React 18 + TypeScript + Vite**. You have full control over all code, assets, routing, styling, and deployment.

## 🚀 Live Preview Locally
The dev server is currently running:
- **Local URL**: [http://localhost:5173/](http://localhost:5173/)

To run or rebuild in the future:
```powershell
npm run dev        # Starts the Vite frontend and Express API
npm run typecheck  # TypeScript validation
npm run build      # Builds production bundle to dist/
npm run preview    # Preview the production build locally
npm test           # Runs backend API tests
```

## Contact API
The contact form posts to `/api/contact`. The Express API validates submissions, rate-limits requests, ignores honeypot submissions, and sends accepted messages using SMTP. For local email delivery, copy `.env.example` to `.env` and set `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` (plus any provider-specific port/security settings). `SMTP_FROM` should be an address allowed by your SMTP provider; replies go to the visitor's address. `CONTACT_TO` defaults to the company email address.

Run only the API with `npm run dev:api`, or use `npm run start` in production. Deploy the API alongside the frontend or configure `VITE_CONTACT_ENDPOINT` to its public URL. Keep `.env` and SMTP credentials on the server; browser `VITE_` variables are public. The included in-memory rate limit is per server process, so use a shared store if deploying multiple API instances.

## 📦 What Was Built & Rebranded
- **Full Brand Identity**:
  - Official Alsvid Infocom logo in header & footer (`public/images/logo.png`)
  - Modern electric cyan (`#02cbff`) & deep navy (`#0b132b`) theme with smooth micro-animations
  - Official partner showcases: **Government of West Bengal** & **Utkarsh Bangla**
- **Complete Page Suite**:
  - **Home (`/`)**: Hero with helpline, partner showcase, Core IT services, Why Choose Us, BPO solutions, Gallery highlights, and Reach Out block.
  - **IT Support (`/it-support`)**: Helpdesk, system diagnostics, networking, server support, and inquiry CTA.
  - **IT Training (`/it-training`)**: Foundational & advanced courses, hands-on lab sessions, and certifications.
  - **Skill Development (`/skill-development`)**: State-backed curriculum (Utkarsh Bangla partner), practical career readiness.
  - **BPO Domain (`/bpo`)**: Nearshore outsourcing for Healthcare, Insurance, and Education.
    - `/bpo/healthcare`
    - `/bpo/insurance`
    - `/bpo/education`
  - **About Us (`/about`)**: Company background, Vision, Mission, Values, and partner accreditations.
  - **Gallery (`/gallery`)**: Real workspace, classroom, and IT training laboratory photos with interactive lightbox modal.
  - **Contact Us (`/contact`)**: Interactive contact form with honeypot anti-spam, direct phone link (`+91 9830032339`), email link (`info@alsvidinfo.com`), Kolkata office address, and social media links.
- **SEO & Production Readiness**:
  - Updated `index.html` with Open Graph tags and meta description.
  - Updated `public/sitemap.xml` and `public/robots.txt` configured for `https://alsvidinfocom.com/`.

## 🌐 Deploying to Your Domain & Hosting
When you are ready to publish to your purchased domain:
1. Run `npm run build` to generate the production files in [`dist/`](file:///c:/Users/nausi/OneDrive/Desktop/website-project/dist).
2. Upload the contents of the `dist/` directory to your web hosting (e.g. cPanel `public_html`, Vercel, Netlify, Cloudflare Pages, or Hostinger).
3. If using Apache (cPanel), make sure you have an `.htaccess` file for SPA URL rewriting so sub-routes like `/about` or `/contact` work on page refresh.
