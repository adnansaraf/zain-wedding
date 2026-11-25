# Zain Weds Hanna — Wedding Invitation Website

A production-ready, zero-dependency wedding invitation website (Groom's side) built with vanilla HTML5, CSS3, and JavaScript. Designed for instant static deployment on Netlify, Vercel, or GitHub Pages with a live Supabase guestbook.

---

## Highlights & Features

- **Two-Page Cream Folio Cover Gate**: Warm `#F4ECE1` damask-patterned left and right folio leaves with antique gold borders, embossed wax seal (`Z&H`), and centered cream royal card. Scroll is locked until "OPEN INVITATION" is clicked, then both leaves swing open smoothly with GPU-accelerated CSS keyframes.
- **Luminous Ivory Cream & Royal Emerald Gold Palette**: Self-hosted web fonts (`Alex Brush`, `Amiri`, `Cormorant Garamond`, `Bodoni Moda`, `Jost`), architectural Islamic arch hero framing, botanical corner flourishes, and repeating gold damask texture across all sections.
- **Responsive Mobile-First Editorial Layout**: Engineered for mobile (`360px–430px`), tablet, and desktop (`1280px–1920px`) with a floating pill nav on desktop, full-screen glass menu on mobile, 44px+ tap targets, and reduced-motion support.
- **Realistic Google Maps Venue Preview**: Custom vector cartography of Poopalam (SH-39 / Ooty Road) highlighting **Presidency Convention Center**, interactive venue header, animated beacon marker, direct Google Maps link, and pre-filled Google Calendar event link.
- **Floating Wish Ticker & Supabase Guestbook**: Cycles one wish at a time with adaptive reading hold durations, Play/Pause and Prev/Next controls, "View all wishes" modal with focus trap & pagination, honeypot anti-spam, 60s `localStorage` cooldown, and XSS-safe `textContent` rendering.

---

## Project Structure

```text
├── index.html                               # Semantic HTML5 & accessible noscript fallback
├── css/
│   └── style.css                            # Vanilla CSS (custom properties, folio gate, animations)
├── js/
│   └── main.js                              # Config hydration, folio gate, countdown, ticker, Supabase
├── config/
│   └── site.config.js                       # All content, links, dates, theme tokens, Supabase config
├── assets/
│   ├── fonts/                               # Self-hosted variable/latin/arabic woff2 fonts
│   │   ├── alex-brush-latin.woff2
│   │   ├── amiri-arabic.woff2
│   │   ├── aref-ruqaa-arabic-700.woff2
│   │   ├── aref-ruqaa-arabic.woff2
│   │   ├── bodoni-moda-italic.woff2
│   │   ├── bodoni-moda-normal.woff2
│   │   ├── cormorant-garamond-latin.woff2
│   │   └── jost-latin.woff2
│   └── images/                              # Self-hosted SVG/raster graphics
│       ├── corner-branch.svg
│       ├── damask-pattern.svg
│       ├── favicon.png
│       ├── favicon.svg
│       ├── share.jpg
│       └── wax-seal.svg
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
