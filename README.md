# Zain Weds Hanna — Wedding Invitation Website

A production-ready, zero-dependency wedding invitation website (Groom's side) built with vanilla HTML5, CSS3, and JavaScript. Designed for instant static deployment on Netlify, Vercel, or GitHub Pages with a live Supabase guestbook.

---

## Highlights & Features

- **Two-Page Ivory Folio Cover Gate**: Ivory leaves with an 8-point-star (khatam) lattice at 8% opacity, double gold inset border, corner botanical branches, twinkling gold stars, embossed gold CSS/SVG seal button (`Z&H`), and centered cream typography. Scroll is locked until tapped, then opens over 2.4s with GPU-accelerated CSS transforms.
- **Dual Theme Presets (`ivorySage` & `pearlBlue`)**: Configured cleanly in `config/site.config.js` with matching olive/eucalyptus (`ivorySage`) or wheat/lavender (`pearlBlue`) inline SVG sprigs.
- **Responsive Mobile-First Editorial Layout**: Crafted on an 8px spacing grid for `360px–430px` mobile, `768px` tablet, and `1280px–1920px` desktop with zero overlapping text, clean scroll-triggered staggers, and `prefers-reduced-motion` support.
- **Venue Card & Live Countdown**: Clean double-gold-bordered venue card with Maps, Calendar, and one-click address copy, plus four pointed-arch (mihrab) countdown tiles with a 60-second stroke progress outline.
- **Floating Wish Ticker & Supabase Guestbook**: Light frosted glass ticker cycling one wish at a time, adaptive reading durations, 44px controls, honeypot anti-spam, 60s `localStorage` cooldown, and XSS-safe `textContent` rendering.

---

## Project Structure

```text
├── index.html                               # Semantic HTML5, inline SVG sprite & accessible fallback
├── css/
│   └── style.css                            # Vanilla CSS (theme presets, 8px grid, doors, mihrab tiles)
├── js/
│   └── main.js                              # Theme switching, hydration, 2.4s doors, countdown, Supabase
├── config/
│   └── site.config.js                       # All content, theme presets, venue, dates & Supabase keys
├── assets/
│   ├── fonts/                               # Self-hosted variable/latin/arabic woff2 fonts
│   │   ├── alex-brush-latin.woff2
│   │   ├── aref-ruqaa-arabic-700.woff2
│   │   ├── aref-ruqaa-arabic.woff2
│   │   ├── cormorant-garamond-latin.woff2
│   │   └── jost-latin.woff2
│   └── images/                              # Favicon & social share card
│       ├── favicon.png
│       ├── favicon.svg
│       └── share.jpg
├── supabase/
│   └── schema.sql                           # Wishes table schema, index & RLS policies
├── netlify.toml                             # Netlify security headers & asset cache rules
├── vercel.json                              # Vercel static caching & security headers
├── .gitattributes                           # Cross-platform line-ending & binary asset rules
├── .gitignore
└── README.md
```

---

## Setup & Deployment

### 1. Supabase Guestbook Database
Run `supabase/schema.sql` inside your Supabase Dashboard **SQL Editor** to create the `public.zain_hanna_wishes` table, index, and Row Level Security (`anon` select/insert) policies.

Update `guestbook.supabaseUrl`, `guestbook.publishableKey`, and `guestbook.isSample` in `config/site.config.js`.

### 2. Local Preview
Serve the repository root with any static HTTP server:
```bash
npx serve .
# or
python -m http.server 8080
```

### 3. Deploy to GitHub / Netlify / Vercel
- Keep the exact folder hierarchy (`css/`, `js/`, `config/`, `assets/`, `supabase/`) intact at the repository root — do **not** flatten files into `/`.
- **Netlify**: Connect the GitHub repository or drag the extracted folder onto **Netlify Drop** (`publish = "."` is preconfigured in `netlify.toml`).
- **Vercel / GitHub Pages**: Connect the repository with Framework Preset = **Other** and Output/Publish Directory = `.` (root). No build command is needed.
